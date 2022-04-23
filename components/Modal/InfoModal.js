import { FilmIcon, HeartIcon, ThumbUpIcon } from "@heroicons/react/outline";
import React from "react";
import AlertModal from "./AlertModal";

const InfoModal = ({ open, setOpen }) => {
  return (
    <AlertModal headerText={"How to play"} open={open} setOpen={setOpen}>
      <div
        className={`flex flex-col gap-4 w-[30rem] border-4 border-double rounded-lg p-8 text-lg`}
      >
        <div className="flex flex-row items-center gap-6">
          <FilmIcon className="h-6" />
          <p>Guess the movie by its main cast</p>
        </div>
        <div className="flex flex-row items-center gap-6">
          <HeartIcon className="h-6 flex-shrink-0" />
          <p>
            You can spend given 5 lives either on opening an addition cast
            member or on a movie guess
          </p>
        </div>
        <div className="flex flex-row items-center gap-6">
          <ThumbUpIcon className="h-6 flex-shrink-0" />
          <p>
            Guess the movie in as few tries as possible and share your score!
          </p>
        </div>
        <div className="self-center mt-8">
          <button
            className="rounded-md px-8 pb-1 bg-orange-500 hover:bg-orange-600 hover:disabled:bg-transparent text-lg py-1"
            onClick={() => setOpen(false)}
          >
            Play
          </button>
        </div>
      </div>
    </AlertModal>
  );
};

export default InfoModal;
