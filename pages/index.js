import { useEffect, useState } from "react";
import Board from "../components/Board/Board";
import Header from "../components/Header/Header";
import differenceInDays from "date-fns/differenceInDays";

const API_KEY = process.env.KP_API_KEY;

export default function Home({ movies, movieNumber, timezoneOffset }) {
  const [movie, setMovie] = useState();
  const [cast, setCast] = useState();

  useEffect(() => {
    if (movies?.items?.length) {
      setMovie(movies?.items[movieNumber % 20]);
    }
  }, [movies]);

  useEffect(() => {
    console.log("cast", cast);
  }, [cast]);

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
      {cast && (
        <Board cast={cast} movie={movie} timezoneOffset={timezoneOffset} />
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

  const movieRes = await fetch(
    "https://kinopoiskapiunofficial.tech/api/v2.2/films?" +
      new URLSearchParams({
        countries: [1],
        yearFrom: 1990,
        type: "FILM",
        order: "NUM_VOTE",
        page: Math.floor(movieNumber / 20) + 1,
      }),
    {
      method: "GET",
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
  const movies = await movieRes?.json();

  // Pass data to the page via props
  return { props: { movies, movieNumber, timezoneOffset } };
}

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
