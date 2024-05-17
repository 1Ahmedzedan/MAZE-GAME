import { useEffect, useState } from "react";
import { findShortestPath, generateMaze } from "../utils/helper";
import Maze from "./Maze";
import toast from "react-hot-toast";
import Dashboard from "./Dashboard";
import Modal from "./Modal";

const Game = ({ selectedChar, exitGame }) => {
  const [currPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [level, setLevel] = useState(0);
  const [maze, setMaze] = useState(generateMaze(level));
  const [totalSeconds, setTotalSeconds] = useState(30);
  const [path, setPath] = useState([]);
  const [numberOfTimeGetPath, setNumberOfTimeGetPath] = useState(0);
  const [gameStatus, setGameStatus] = useState("");

  const handleWinLevel = () => {
    if (level === 9) {
      handleWinGame();
      return;
    }
    setLevel((lvl) => lvl + 1);
    setTotalSeconds(30);
    setMaze(generateMaze(level + 1));
    setPath([]);
  };

  const handleWinGame = () => {
    setGameStatus("win");
  };

  const handleLossGame = () => {
    setGameStatus("loss");
  };

  const handleResetGame = () => {
    setGameStatus("");
    setLevel(0);
    setPath([]);
    setNumberOfTimeGetPath(0);
    setTotalSeconds(30);
    setCurrentPosition({ x: 0, y: 0 });
  };

  const handleGetPath = () => {
    if (path.length) {
      toast.error("You already got the path!");
      return;
    }
    if (numberOfTimeGetPath === 3) {
      toast.error("You only have three times to find the path!");
      return;
    }
    const generateShortestPath = findShortestPath(
      maze,
      currPosition.x,
      currPosition.y
    );
    setPath(generateShortestPath);
    setNumberOfTimeGetPath((num) => num + 1);
  };

  useEffect(() => {
    if (totalSeconds !== 0 || gameStatus === "win") {
      return;
    }

    handleLossGame();
  }, [totalSeconds]);

  return (
    <div className="min-h-screen flex justify-between px-6 items-center bg-gray-300">
      <Maze
        maze={maze}
        selectedChar={selectedChar}
        handleWinLevel={handleWinLevel}
        path={path}
        currPosition={currPosition}
        setCurrentPosition={setCurrentPosition}
      />
      <Dashboard
        exitGame={exitGame}
        getPath={handleGetPath}
        totalSeconds={totalSeconds}
        setTotalSeconds={setTotalSeconds}
        level={level}
        numberOfTimeGetPath={numberOfTimeGetPath}
        gameStatus={gameStatus}
      />
      {(gameStatus === "win" || gameStatus === "loss") && (
        <Modal>
          <div className="flex flex-col items-center justify-center gap-10">
            {gameStatus == "win" ? (
              <p className="text-green-500 text-5xl font-bold">WON GAME</p>
            ) : (
              <p className="text-red-600 text-5xl font-bold">LOSS GAME</p>
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={exitGame}
                className="text-white bg-red-700 w-48 py-2 text-lg font-bold rounded-full hover:bg-red-600 transition-all duration-500"
              >
                EXIT GAME
              </button>
              <button
                onClick={handleResetGame}
                className="text-white bg-gray-600 w-48 py-2 text-lg font-bold rounded-full hover:bg-gray-500 transition-all duration-500"
              >
                {gameStatus == "win" ? "PLAY AGAIN" : "TRY AGAIN"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default Game;
