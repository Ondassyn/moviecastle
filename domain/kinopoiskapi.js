export async function fetchMovies({ page }) {
  const response = await fetch(
    "https://kinopoiskapiunofficial.tech/api/v2.2/films?" +
      new URLSearchParams({
        countries: [1],
        yearFrom: 1990,
        type: "FILM",
        order: "NUM_VOTE",
        page,
      }),
    {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.KP_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  const movies = await response.json();

  return movies;
}

export async function fetchStaff({ filmId }) {
  const response = await fetch(
    "https://kinopoiskapiunofficial.tech/api/v1/staff?" +
      new URLSearchParams({ filmId }),
    {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.KP_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  const staff = await response.json();

  return staff;
}
