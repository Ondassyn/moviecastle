import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";
import HeartOutlineIcon from "@heroicons/react/outline/HeartIcon";
import HeartSolidIcon from "@heroicons/react/solid/HeartIcon";
import AsyncSelect from "react-select/async";
import Snackbar from "../Snackbar/Snackbar";
import ResultModal from "../Modal/ResultModal";

const SNACKBAR_DURATION = 3000;

const Board = ({ cast, movie }) => {
  const [covered, setCovered] = useState([false, true, true, true, true, true]);
  const [lives, setLives] = useState();
  const [result, setResult] = useState();
  const [guess, setGuess] = useState();
  const [snackbarMessage, setSnackbarMessage] = useState();
  const [resultModalOpen, setResultModalOpen] = useState(result ? true : false);

  useEffect(() => {
    const storedMovieId = JSON.parse(localStorage.getItem("movieId"));

    if (!storedMovieId || !localStorage.getItem("played")) {
      localStorage.setItem("played", JSON.stringify(0));
      localStorage.setItem("won", JSON.stringify(0));
      localStorage.setItem("currentStreak", JSON.stringify(0));
      localStorage.setItem("maxStreak", JSON.stringify(0));
      localStorage.setItem("winsPerLive", JSON.stringify([0, 0, 0, 0, 0]));
    }

    if (storedMovieId !== movie?.filmId) {
      if (JSON.parse(localStorage.getItem("winsPerLive")).length !== 6)
        localStorage.setItem("winsPerLive", JSON.stringify([0, 0, 0, 0, 0, 0]));

      setCovered([false, true, true, true, true, true]);
      localStorage.setItem(
        "covered",
        JSON.stringify([false, true, true, true, true, true])
      );
      setLives([true, true, true, true, true, true]);
      localStorage.setItem(
        "lives",
        JSON.stringify([true, true, true, true, true, true])
      );
      setResult(null);
      localStorage.setItem("result", null);
      setSnackbarMessage(null);
      localStorage.setItem("snackbarMessage", null);

      localStorage.setItem("movieId", JSON.stringify(movie?.filmId));
    } else {
      setCovered(JSON.parse(localStorage.getItem("covered")));
      setLives(JSON.parse(localStorage.getItem("lives")));
      setResult(JSON.parse(localStorage.getItem("result")));
      setSnackbarMessage(JSON.parse(localStorage.getItem("snackbarMessage")));
    }
  }, [movie]);

  useEffect(() => {
    if (snackbarMessage === "Movie was not selected")
      setTimeout(() => setSnackbarMessage(null), SNACKBAR_DURATION);
  }, [snackbarMessage]);

  useEffect(() => {
    if (result) setResultModalOpen(true);
  }, [result]);

  const promiseOptions = (inputValue) =>
    new Promise((resolve, reject) => {
      fetch(
        "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?" +
          new URLSearchParams({ keyword: inputValue }),
        {
          method: "GET",
          headers: {
            "X-API-KEY": "0e9acccd-a3f7-4f07-8243-3baab7430e65",
            "Content-Type": "application/json",
          },
        }
      )
        ?.then((res) => res?.json())
        ?.then((json) =>
          resolve(
            json?.films?.map((film) => {
              return {
                value: film?.filmId,
                label: `${film?.nameEn ?? film?.nameRu} (${film?.year})`,
              };
            })
          )
        )
        ?.catch((err) => console.log(err));
    });

  const decrementLives = () => {
    setLives((prev) => {
      let temp = [...prev];
      if (temp?.some((t) => t === true)) {
        let i = temp?.length - 1;
        while (temp[i] === false) {
          i--;
        }
        temp[i] = false;
        if (i === 0) {
          setResult("loss");
          localStorage.setItem("result", JSON.stringify("loss"));

          setSnackbarMessage(movie?.nameEn ?? movie?.nameRu);
          localStorage.setItem(
            "snackbarMessage",
            JSON.stringify(movie?.nameEn ?? movie?.nameRu)
          );

          localStorage.setItem(
            "played",
            JSON.stringify(JSON.parse(localStorage.getItem("played")) + 1)
          );
          localStorage.setItem("currentStreak", JSON.stringify(JSON.parse(0)));
        }
      }
      localStorage.setItem("lives", JSON.stringify(temp));
      return temp;
    });
  };

  return (
    <React.Fragment>
      <ResultModal
        result={result}
        open={resultModalOpen}
        setOpen={setResultModalOpen}
        movie={movie}
      />
      <main className="flex flex-col w-full h-full gap-8 justify-center">
        {snackbarMessage && (
          <Snackbar message={snackbarMessage} result={result} />
        )}
        <div className="flex flex-row px-6 mt-6 gap-2 justify-center">
          {lives?.map((l, index) => {
            if (l) return <HeartSolidIcon key={index} className="h-12" />;
            else
              return (
                <HeartOutlineIcon
                  key={index}
                  className="h-12 animate-ping-once"
                />
              );
          })}
        </div>

        <div className="flex flex-col lg:flex-row px-4 gap-2 lg:gap-8 justify-center">
          <div className="w-full lg:w-1/3">
            <AsyncSelect
              loadOptions={promiseOptions}
              onChange={(e) => setGuess(e?.value)}
              isDisabled={result}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "#f97316",
                  primary75: "#fb923c",
                  primary50: "#fdba74",
                  primary25: "#f97316",
                  neutral0: "#111827",
                  neutral5: "",
                  neutral10: "",
                  neutral20: "",
                  neutral30: "",
                  neutral40: "",
                  neutral50: "",
                  neutral60: "",
                  neutral70: "",
                  neutral80: "",
                  neutral90: "",
                },
              })}
            />
          </div>
          <button
            className="border-2 border-orange-500 rounded-md px-4 hover:bg-orange-500 hover:disabled:bg-transparent text-lg py-1"
            disabled={result}
            onClick={() => {
              if (!guess) {
                setSnackbarMessage("Movie was not selected");
                return;
              }
              if (movie?.filmId === guess) {
                setSnackbarMessage(movie?.nameEn ?? movie?.nameRu);
                localStorage.setItem(
                  "snackbarMessage",
                  JSON.stringify(movie?.nameEn ?? movie?.nameRu)
                );

                setResult("win");
                localStorage.setItem("result", JSON.stringify("win"));
                let winsPerLive = JSON.parse(
                  localStorage.getItem("winsPerLive")
                );
                winsPerLive[lives?.filter((l) => l === true).length - 1]++;
                localStorage.setItem(
                  "winsPerLive",
                  JSON.stringify(winsPerLive)
                );
                localStorage.setItem(
                  "played",
                  JSON.stringify(JSON.parse(localStorage.getItem("played")) + 1)
                );
                localStorage.setItem(
                  "won",
                  JSON.stringify(JSON.parse(localStorage.getItem("won")) + 1)
                );
                localStorage.setItem(
                  "currentStreak",
                  JSON.stringify(
                    JSON.parse(localStorage.getItem("currentStreak")) + 1
                  )
                );
                localStorage.setItem(
                  "maxStreak",
                  JSON.stringify(
                    JSON.parse(localStorage.getItem("currentStreak")) >
                      JSON.parse(localStorage.getItem("maxStreak"))
                      ? JSON.parse(localStorage.getItem("currentStreak"))
                      : JSON.parse(localStorage.getItem("maxStreak"))
                  )
                );
              } else {
                decrementLives();
              }
            }}
          >
            Submit
          </button>
        </div>

        {/* <div className="flex flex-row gap-16 justify-center"> */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 px-4 gap-x-2 gap-y-4 2xl:flex 2xl:flex-row 2xl:justify-center 2xl:gap-8">
          {cast?.map((c, index) => (
            <div key={index} className="relative flex flex-col gap-1 lg:gap-4">
              <div className="w-[180px] h-[260px] 2xl:w-[192px] 2xl:h-[288px] perspective bg-transparent rounded-lg shadow-lg self-center">
                <div
                  className={`relative w-full h-full preserve-3d duration-1000 ${
                    !covered[index] && "flip-horizontally"
                  }`}
                >
                  <div
                    className="absolute backface-hidden w-full h-full rounded-lg bg-gray-800 text-8xl text-gray-600 flex flex-row items-center justify-center cursor-pointer"
                    onClick={() => {
                      if (!result) {
                        setCovered((prev) => {
                          let temp = [...prev];
                          temp[index] = false;
                          localStorage.setItem("covered", JSON.stringify(temp));
                          return temp;
                        });
                        decrementLives();
                      }
                    }}
                  >
                    ?
                  </div>

                  <div className="absolute flip-horizontally backface-hidden w-full h-full">
                    <Image
                      src={c?.posterUrl}
                      alt="image"
                      layout="fill"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <p className="text-xl text-center">
                {!covered[index] ? (c?.nameEn ? c?.nameEn : c?.nameRu) : ""}
              </p>
            </div>
          ))}
        </div>
      </main>
    </React.Fragment>
  );
};

export default Board;
