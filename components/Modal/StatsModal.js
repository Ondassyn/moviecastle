import { FilmIcon, HeartIcon, ThumbUpIcon } from "@heroicons/react/outline";
import React from "react";
import AlertModal from "./AlertModal";

const StatsModal = ({ open, setOpen }) => {
  return (
    <AlertModal headerText={"Stats"} open={open} setOpen={setOpen}>
      <div
        className={`flex flex-col gap-4 w-[30rem] border-4 border-double rounded-lg p-8 text-lg`}
      >
        <p className="text-center">Wins per Live</p>
        <div className="flex w-full flex-row justify-between gap-6 mb-8">
          {JSON.parse(localStorage.getItem("winsPerLive"))?.map((w, index) => (
            <div
              key={index}
              className="h-48 flex flex-col items-center justify-end"
            >
              <div
                className={`w-8 flex flex-row justify-start border-b-2 border-gray-600 ${
                  w && "bg-gray-600"
                }`}
                style={{
                  height: Math.round(
                    (w /
                      Math.max(
                        ...JSON.parse(localStorage.getItem("winsPerLive"))
                      )) *
                      100
                  ),
                }}
              >
                {Math.round(
                  (w /
                    Math.max(
                      ...JSON.parse(localStorage.getItem("winsPerLive"))
                    )) *
                    100
                ) > 15 ? (
                  <p className="mx-auto">{w}</p>
                ) : (
                  ""
                )}
              </div>
              <div>{index + 1}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-around items-center gap-6">
          <div className="flex flex-col items-center">
            <p>{JSON.parse(localStorage.getItem("played")) ?? "-"}</p>
            <p>Played</p>
          </div>
          <div className="flex flex-col items-center">
            <p>{JSON.parse(localStorage.getItem("won")) ?? "-"}</p>
            <p>Won</p>
          </div>
          <div className="flex flex-col items-center">
            <p>
              {Math.round(
                (JSON.parse(localStorage.getItem("won")) /
                  JSON.parse(localStorage.getItem("played"))) *
                  100
              ) || "-"}
            </p>
            <p>Win Rate</p>
          </div>
        </div>
        <div className="flex flex-row justify-around items-center gap-6">
          <div className="flex flex-col items-center">
            <p>{JSON.parse(localStorage.getItem("currentStreak")) ?? "-"}</p>
            <p>Current Streak</p>
          </div>
          <div className="flex flex-col items-center">
            <p>{JSON.parse(localStorage.getItem("maxStreak")) ?? "-"}</p>
            <p>Max Streak</p>
          </div>
        </div>
      </div>
    </AlertModal>
  );
};

export default StatsModal;
