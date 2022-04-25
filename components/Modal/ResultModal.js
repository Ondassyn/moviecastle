import Image from "next/image";
import React from "react";
import AlertModal from "./AlertModal";

const ResultModal = ({ result, open, setOpen, movie }) => {
  return (
    <AlertModal
      headerText={result === "win" ? "You got it!" : "Oh... almost"}
      open={open}
      setOpen={setOpen}
    >
      <div
        className={`flex flex-col gap-4 w-full lg:w-[30rem] items-center border-4 border-double rounded-lg p-8 ${
          result === "win" ? "border-green-600" : "border-red-600"
        }`}
      >
        <div className="relative w-[192px] h-[288px] lg:w-[288px] lg:h-[432px]">
          <Image
            src={movie?.posterUrl}
            alt="image"
            layout="fill"
            className="rounded-lg"
          />
        </div>
        <p className="text-2xl text-center">{`${
          movie?.nameEn ?? movie?.nameRu
        } (${movie?.year})`}</p>
      </div>
    </AlertModal>
  );
};

export default ResultModal;
