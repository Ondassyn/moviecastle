const Snackbar = ({ message, result }) => {
  return (
    <div
      className={`fixed top-28 w-full flex flex-row justify-center z-50 animate-fade-in-bottom `}
    >
      <div
        className={`flex items-center max-w-xs p-2 rounded-lg shadow-xl dark:text-gray-400 dark:bg-gray-800 ${
          result
            ? result === "win"
              ? "bg-green-600"
              : "bg-red-600"
            : "bg-orange-600"
        }`}
      >
        <div className="mx-8 text-xl text-center font-normal">{message}</div>
      </div>
    </div>
  );
};

export default Snackbar;
