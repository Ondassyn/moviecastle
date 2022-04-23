import { useEffect, useState } from "react";
import Board from "../components/Board/Board";
import Header from "../components/Header/Header";

export default function Home({ movies }) {
  const [movie, setMovie] = useState();
  const [cast, setCast] = useState();

  useEffect(() => {
    if (movies?.films?.length) {
      setMovie(movies?.films[3]);
    }
  }, [movies]);

  useEffect(() => {
    if (movie)
      fetch(
        "https://kinopoiskapiunofficial.tech/api/v1/staff?" +
          new URLSearchParams({ filmId: movie?.filmId }),
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
          setCast(
            shuffle(
              json?.filter((s) => s?.professionKey === "ACTOR")?.slice(0, 5),
              110
            )
          )
        );
  }, [movie]);

  return (
    <div className="">
      <Header />
      {cast && <Board cast={cast} movie={movie} />}
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API

  const movieRes = await fetch(
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?" +
      new URLSearchParams({ page: 1 }),
    {
      method: "GET",
      headers: {
        "X-API-KEY": "0e9acccd-a3f7-4f07-8243-3baab7430e65",
        "Content-Type": "application/json",
      },
    }
  );
  const movies = await movieRes?.json();

  // Pass data to the page via props
  return { props: { movies } };
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

function random(seed) {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}
