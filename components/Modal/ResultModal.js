import { CheckIcon, ShareIcon } from "@heroicons/react/outline";
import { format, add } from "date-fns";
// import Image from "next/image";
import React, { useEffect, useState } from "react";
import AlertModal from "./AlertModal";
import Countdown from "./Countdown";

const COPIED_DURATION = 10000;

const ResultModal = ({
  result,
  open,
  setOpen,
  movie,
  lives,
  covered,
  timezoneOffset,
}) => {
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
          <img
            // onLoad={({ target: img }) => {
            //   const { offsetHeight, offsetWidth } = img;
            //   console.log(offsetHeight, offsetWidth);
            // }}
            src={movie?.posterUrl}
            alt="image"
            width="auto"
            height="auto"
            className="rounded-lg"
          />
        </div>
        <p className="text-2xl text-center">{`${
          movie?.nameOriginal ?? movie?.nameRu
        } (${movie?.year})`}</p>
        <div className="flex border-t lg:flex-row flex-col gap-4 pt-4 w-full items-center justify-evenly">
          <div className="flex flex-col items-center text-center">
            <p>Next movie will be in</p>
            <Countdown timezoneOffset={timezoneOffset} />
          </div>
          <button
            className="rounded-md px-8 pb-1 h-10 bg-orange-500 hover:bg-orange-600 hover:disabled:bg-transparent text-xl py-1"
            onClick={() => {
              let livesText = "";
              for (let l of lives)
                if (l) livesText = "🤍" + livesText;
                else livesText += "🖤";

              const dateText = format(
                add(new Date(), { minutes: timezoneOffset }),
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
