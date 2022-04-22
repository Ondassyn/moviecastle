import Image from "next/image";
import React from "react";
import AlertModal from "./AlertModal";

const ResultModal = ({ result, open, setOpen, movie }) => {
  return (
    <AlertModal
      headerText={result === "win" ? "You got it!" : "Oh... maybe next time"}
      open={open}
      setOpen={setOpen}
    >
      <div
        className={`flex flex-col gap-4 w-96 items-center border-4 border-double rounded-lg p-8 ${
          result === "win" ? "border-green-600" : "border-red-600"
        }`}
      >
        <Image
          src={movie?.posterUrl}
          width={192}
          height={288}
          alt="image"
          layout="fixed"
          className="rounded-lg"
        />
        <p className="text-2xl text-center">{`${
          movie?.nameEn ?? movie?.nameRu
        } (${movie?.year})`}</p>
      </div>
    </AlertModal>
  );
};

export default ResultModal;
