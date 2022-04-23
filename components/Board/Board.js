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
  const [covered, setCovered] = useState([false, true, true, true, true]);
  const [lives, setLives] = useState([true, true, true, true, true]);
  const [result, setResult] = useState();
  const [guess, setGuess] = useState();
  const [snackbarMessage, setSnackbarMessage] = useState(false);
  const [resultModalOpen, setResultModalOpen] = useState(result ? true : false);

  useEffect(() => {
    if (!result)
      if (snackbarMessage)
        setTimeout(() => setSnackbarMessage(null), SNACKBAR_DURATION);
  }, [snackbarMessage]);

  useEffect(() => {
    if (result) setResultModalOpen(true);
  }, [result]);

  useEffect(() => {
    console.log(movie);
  }, []);

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
                label: film?.nameEn ?? film?.nameRu,
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
          setSnackbarMessage(movie?.nameEn ?? movie?.nameRu);
          setResult("loss");
        }
      }
      return temp;
    });
  };

  return (
    <main className="flex flex-col w-full h-full gap-12 justify-center">
      {snackbarMessage && (
        <Snackbar message={snackbarMessage} result={result} />
      )}
      <div className="flex flex-row gap-8 justify-center">
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

      <div className="flex flex-row gap-8 justify-center">
        <div className="w-1/3">
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
              setResult("win");
            } else {
              decrementLives();
            }
          }}
        >
          Submit
        </button>
      </div>

      <div className="flex flex-row gap-16 justify-center">
        {cast?.map((c, index) => (
          <div key={index} className="relative flex flex-col w-48 gap-8">
            <div className="h-[288px] w-[192px] perspective bg-transparent rounded-lg shadow-lg">
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
                    width={192}
                    height={288}
                    alt="image"
                    layout="fixed"
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
        <ResultModal
          result={result}
          open={resultModalOpen}
          setOpen={setResultModalOpen}
          movie={movie}
        />
      </div>
    </main>
  );
};

export default Board;
