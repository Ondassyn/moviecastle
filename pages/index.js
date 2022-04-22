import { useEffect, useState } from "react";
import Board from "../components/Board/Board";
import Header from "../components/Header/Header";

export default function Home({ movies }) {
  const [movie, setMovie] = useState();
  const [cast, setCast] = useState();

  useEffect(() => {
    if (movies?.films?.length) {
      setMovie(movies?.films[getRandomInt(0, movies?.films?.length)]);
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
            json?.filter((s) => s?.professionKey === "ACTOR")?.slice(0, 5)
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
      new URLSearchParams({ page: getRandomInt(1, 13) }),
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

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};
