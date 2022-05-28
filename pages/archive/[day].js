import { useEffect, useState } from "react";
import differenceInDays from "date-fns/differenceInDays";

import Board from "../../components/Board/Board";
import Header from "../../components/Header/Header";
import { fetchStaff, fetchMovies } from "../../domain/kinopoiskapi";
import { shuffle } from "../../utils/shuffle";
import { random } from "../../utils/random";

export default function Day({
  movies,
  movieNumber,
  movie,
  staff,
  timezoneOffset,
}) {
  const [cast, setCast] = useState();

  useEffect(() => {
    setCast(
      shuffle(
        staff?.filter((s) => s?.professionKey === "ACTOR")?.slice(0, 6),
        movieNumber
      )
    );
  }, [staff]);

  return (
    <div>
      <Header />
      {cast && (
        <Board cast={cast} movie={movie} timezoneOffset={timezoneOffset} />
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  let movies, movie, staff, movieNumber, timezoneOffset;

  const currentDate = new Date(context.params.day);

  if (currentDate instanceof Date && !isNaN(currentDate)) {
    const numberOfDays = differenceInDays(currentDate, new Date(2000, 0, 0));

    movieNumber = Math.round((random(numberOfDays) * 1000) % 400);

    timezoneOffset = currentDate.getTimezoneOffset();

    movies = await fetchMovies({
      page: Math.floor(movieNumber / 20) + 1,
    });
  }

  if (movies?.items?.length) {
    movie = movies?.items[movieNumber % 20];
  }

  if (movie) {
    staff = await fetchStaff({ filmId: movie?.kinopoiskId });
  }

  return { props: { movies, movieNumber, movie, staff, timezoneOffset } };
}
