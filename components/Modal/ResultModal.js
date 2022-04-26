import { CheckIcon, ShareIcon } from "@heroicons/react/outline";
import { format, sub } from "date-fns";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AlertModal from "./AlertModal";

const COPIED_DURATION = 10000;

const ResultModal = ({ result, open, setOpen, movie, lives, covered }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), COPIED_DURATION);
  }, [copied]);

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
        <div className="self-center mt-2">
          <button
            className="rounded-md px-8 pb-1 bg-orange-500 hover:bg-orange-600 hover:disabled:bg-transparent text-xl py-1"
            onClick={() => {
              let livesText = "";
              for (let l of lives)
                if (l) livesText = "🤍" + livesText;
                else livesText += "🖤";

              const dateText = format(
                sub(new Date(), { hours: 6 }),
                "dd/MM/yyyy"
              );

              let coveredText = "";
              for (let c of covered)
                if (c) coveredText += "🟦";
                else coveredText += "👤";

              navigator?.clipboard?.writeText(
                "MovieCastle " +
                  dateText +
                  "\r\n\r\n" +
                  livesText +
                  "\r\n" +
                  coveredText +
                  "\r\n\r\nPlay here moviecastle.vercel.app"
              );
              setCopied(true);
            }}
          >
            {copied ? (
              <span className="flex flex-row items-center gap-1">
                <CheckIcon className="h-6" /> Copied
              </span>
            ) : (
              <span className="flex flex-row items-center gap-1">
                <ShareIcon className="h-4" /> Share
              </span>
            )}
          </button>
        </div>
      </div>
    </AlertModal>
  );
};

export default ResultModal;
