import { useEffect } from "react";
import Board from "../components/Board/Board";
import Header from "../components/Header/Header";

export default function Home({ staff }) {
  useEffect(() => {
    console.log(staff);
  }, []);

  return (
    <div className="w-full h-full">
      <Header />
      <Board staff={staff} movieId={301} />
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    "https://kinopoiskapiunofficial.tech/api/v1/staff?" +
      new URLSearchParams({ filmId: 301 }),
    {
      method: "GET",
      headers: {
        "X-API-KEY": "0e9acccd-a3f7-4f07-8243-3baab7430e65",
        "Content-Type": "application/json",
      },
    }
  );
  const staff = await res.json();

  // Pass data to the page via props
  return { props: { staff } };
}
