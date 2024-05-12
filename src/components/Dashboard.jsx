import Timer from "./Timer";

const Dashboard = ({
  level,
  exitGame,
  totalSeconds,
  setTotalSeconds,
  getPath,
  numberOfTimeGetPath,
}) => {
  return (
    <div className="h-fit w-[30%] bg-gray-800 flex flex-col gap-10 p-10 rounded-xl shadow-2xl border-4 border-yellow-600">
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold border-2 rounded-full py-2 px-4 text-yellow-500 tracking-widest cursor-pointer">
          LEVEL <span className="text-white">{level + 1}</span>
        </p>
        <Timer totalSeconds={totalSeconds} setTotalSeconds={setTotalSeconds} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={getPath}
          className="text-white bg-gray-600 w-48 py-2 text-lg font-bold rounded-full hover:bg-gray-500 transition-all duration-500"
        >
          Find Path {numberOfTimeGetPath} of 3
        </button>
        <button
          onClick={exitGame}
          className="text-white bg-red-700 w-48 py-2 text-lg font-bold rounded-full hover:bg-red-600 transition-all duration-500"
        >
          EXIT GAME
        </button>
      </div>
    </div>
  );
};
export default Dashboard;
