import { sub, getHours, getMinutes, getSeconds } from "date-fns";
import React, { useEffect, useState } from "react";

const Countdown = ({ timezoneOffset }) => {
  const [countdown, setCountdown] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(
        sub(new Date().setHours(24, 0, 0, 0), { hours: timezoneOffset }) -
          new Date()
      );
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div>
      {countdown && (
        <div className="flex flex-row gap-2 font-medium">
          <div className="flex flex-col items-center">
            <p className="text-2xl">
              {String(getHours(countdown))?.padStart(2, "0")}
            </p>
            <p>hrs</p>
          </div>
          :
          <div className="flex flex-col items-center">
            <p className="text-2xl">
              {String(getMinutes(countdown))?.padStart(2, "0")}
            </p>
            <p>min</p>
          </div>
          :
          <div className="flex flex-col items-center">
            <p className="text-2xl">
              {String(getSeconds(countdown))?.padStart(2, "0")}
            </p>
            <p>sec</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Countdown;
