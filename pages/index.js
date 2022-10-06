import { useEffect, useState } from "react";
import Board from "../components/Board/Board";
import Header from "../components/Header/Header";
import differenceInDays from "date-fns/differenceInDays";
import { RefreshIcon } from "@heroicons/react/outline";

const API_KEY = process.env.KP_API_KEY;

export default function Home({ movies, movieNumber, timezoneOffset }) {
  const [movie, setMovie] = useState();
  const [cast, setCast] = useState();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (movies?.items?.length) {
      setMovie(movies?.items[movieNumber % 20]);
    } else {
      setInitialLoading(false);
    }
  }, [movies]);

  useEffect(() => {
    if (movie)
      fetch(
        "https://kinopoiskapiunofficial.tech/api/v1/staff?" +
          new URLSearchParams({ filmId: movie?.kinopoiskId }),
        {
          method: "GET",
          headers: {
            "X-API-KEY": API_KEY,
            "Content-Type": "application/json",
          },
        }
      )
        ?.then((res) => res?.json())
        ?.then((json) =>
          setCast(
            shuffle(
              json?.filter((s) => s?.professionKey === "ACTOR")?.slice(0, 6),
              movieNumber
            )
          )
        );
  }, [movie]);

  return (
    <div className="">
      <Header />
      {initialLoading ? (
        <div className="h-full w-full flex flex-col gap-2 justify-center items-center text-xl">
          <p className="whitespace-pre-line text-center">{"Loading..."}</p>
        </div>
      ) : cast ? (
        <Board cast={cast} movie={movie} timezoneOffset={timezoneOffset} />
      ) : (
        <div className="h-full w-full flex flex-col gap-2 justify-center items-center text-xl">
          <RefreshIcon className="h-8" />
          <p className="whitespace-pre-line text-center">
            {"Oops, something went wrong.\nTry refreshing the page"}
          </p>
        </div>
      )}
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API

  const currentDate = new Date();

  const numberOfDays = differenceInDays(currentDate, new Date(2000, 0, 0));
  const movieNumber = Math.round((random(numberOfDays) * 1000) % 400);

  const timezoneOffset = currentDate.getTimezoneOffset();

  let movies = {};
  try {
    const movieRes = await getDataWithTimeout({
      endpoint:
        "https://kinopoiskapiunofficial.tech/api/v2.2/films?" +
        new URLSearchParams({
          countries: [1],
          yearFrom: 1990,
          type: "FILM",
          order: "NUM_VOTE",
          page: Math.floor(movieNumber / 20) + 1,
        }),
      movieNumber,
    });
    movies = await movieRes?.json();
  } catch (error) {
    console.log(error);
  }

  // Pass data to the page via props
  return { props: { movies, movieNumber, timezoneOffset } };
}

const getDataWithTimeout = async ({ endpoint }) => {
  const controller = new AbortController();

  const id = setTimeout(() => {
    controller.abort();
  }, 4999);

  const reponse = await fetch(endpoint, {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
    signal: controller.signal,
  });
  clearTimeout(id);

  return reponse;
};

const shuffle = (array, seed) => {
  // <-- ADDED ARGUMENT
  let m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(random(seed) * m--); // <-- MODIFIED LINE

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
    ++seed; // <-- ADDED LINE
  }

  return array;
};

const random = (seed) => {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};
