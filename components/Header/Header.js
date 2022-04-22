import { InformationCircleIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import InfoModal from "../Modal/InfoModal";

const Header = () => {
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  return (
    <div>
      <div className="mb-12 py-4 px-16 flex flex-row justify-between border-b items-center">
        <div>
          <InformationCircleIcon
            className="h-8 cursor-pointer"
            onClick={() => setInfoModalOpen(true)}
          />
        </div>
        <div>
          <p className="text-4xl">MovieCastle</p>
        </div>
        <div></div>
      </div>
      <InfoModal open={infoModalOpen} setOpen={setInfoModalOpen} />
    </div>
  );
};

export default Header;
