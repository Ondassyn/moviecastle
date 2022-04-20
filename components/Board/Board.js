import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";
import HeartOutlineIcon from "@heroicons/react/outline/HeartIcon";
import HeartSolidIcon from "@heroicons/react/solid/HeartIcon";
import AsyncSelect from "react-select/async";

const Board = ({ staff, movieId }) => {
  const [cast, setCast] = useState([]);
  const [covered, setCovered] = useState([false, true, true, true, true]);
  const [lives, setLives] = useState([true, true, true, true, true]);
  const [result, setResult] = useState();
  const [guess, setGuess] = useState();

  useEffect(() => {
    setCast(staff?.filter((s) => s?.professionKey === "ACTOR")?.slice(0, 5));
  }, [staff]);

  useEffect(() => {
    if (result) console.log(result);
  }, [result]);

  useEffect(() => {
    console.log(guess);
  }, [guess]);

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
              return { value: film?.filmId, label: film?.nameEn };
            })
          )
        );
    });

  return (
    <main className="flex flex-col w-full h-full gap-16 justify-center">
      <div>
        <AsyncSelect
          loadOptions={promiseOptions}
          onChange={(e) => setGuess(e?.value)}
        />
      </div>
      <div className="flex flex-row gap-8 justify-center">
        {lives?.map((l, index) => {
          if (l) return <HeartSolidIcon key={index} className="h-12" />;
          else return <HeartOutlineIcon key={index} className="h-12" />;
        })}
      </div>
      <div className="flex flex-row gap-16 justify-center">
        {cast?.map((c, index) => (
          <div key={index} className="relative flex flex-col w-48 gap-8">
            <div className="h-72 rounded-lg shadow-lg">
              {covered[index] ? (
                <div
                  className="w-full h-full rounded-lg bg-gray-800 text-8xl text-gray-600 flex flex-row items-center justify-center cursor-pointer"
                  onClick={() => {
                    setCovered((prev) => {
                      let temp = [...prev];
                      temp[index] = false;
                      return temp;
                    });
                    setLives((prev) => {
                      let temp = [...prev];
                      if (temp?.some((t) => t === true)) {
                        let i = temp?.length - 1;
                        while (temp[i] === false) {
                          i--;
                        }
                        temp[i] = false;
                      } else {
                        setResult("loss");
                      }
                      return temp;
                    });
                  }}
                >
                  ?
                </div>
              ) : (
                <Image
                  src={c?.posterUrl}
                  width={192}
                  height={288}
                  alt="image"
                  layout="fixed"
                  className="rounded-lg"
                />
              )}
            </div>
            <p className="text-xl text-center">
              {!covered[index] && c?.nameEn}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          if (!guess) {
            return;
          }
          if (movieId === guess) {
            setResult("win");
          } else {
            setLives((prev) => {
              let temp = [...prev];
              if (temp?.some((t) => t === true)) {
                let i = temp?.length - 1;
                while (temp[i] === false) {
                  i--;
                }
                temp[i] = false;
              } else {
                setResult("loss");
              }
              return temp;
            });
          }
        }}
      >
        Submit
      </button>
    </main>
  );
};

export default Board;
