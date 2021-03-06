import { XIcon } from "@heroicons/react/outline";

const AlertModal = ({ children, open, setOpen, headerText, HeaderIcon }) => {
  return (
    <div>
      <div
        className={`${
          open ? "" : "invisible"
        } overflow-y-auto overflow-x-hidden fixed flex right-0 left-0 z-50 justify-center items-center sm:inset-0 h-full bg-black bg-opacity-50`}
      >
        <div className="relative px-4 max-w-4xl mt-4 h-full md:h-auto">
          <div className="flex flex-col bg-gray-800 rounded-lg p-6 gap-4 drop-shadow-lg">
            <div className="flex flex-wrap justify-between">
              <div className="flex flex-row gap-2">
                {HeaderIcon && <HeaderIcon className="h-6 text-primary" />}
                <h6 className="text-2xl font-medium self-end">{headerText}</h6>
              </div>
              <XIcon
                className="h-6 text-secondary cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="flex justify-between items-center">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
