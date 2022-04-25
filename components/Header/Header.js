import { ChartBarIcon, InformationCircleIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import InfoModal from "../Modal/InfoModal";
import StatsModal from "../Modal/StatsModal";

const Header = () => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
    if (!JSON.parse(localStorage.getItem("played"))) setInfoModalOpen(true);
  }, []);

  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);

  return (
    <div>
      <div className="py-4 px-4 flex flex-row justify-between border-b items-center">
        <div>
          <InformationCircleIcon
            className="h-8 cursor-pointer hover:text-orange-500"
            onClick={() => setInfoModalOpen(true)}
          />
        </div>
        <div className="flex flex-row items-center gap-4">
          <p className="text-4xl font-serif">MovieCastle</p>
        </div>
        <div>
          <ChartBarIcon
            className="h-8 cursor-pointer hover:text-orange-500"
            onClick={() => setStatsModalOpen(true)}
          />
        </div>
      </div>
      <InfoModal open={infoModalOpen} setOpen={setInfoModalOpen} />

      {!isSSR && (
        <StatsModal open={statsModalOpen} setOpen={setStatsModalOpen} />
      )}
    </div>
  );
};

export default Header;
