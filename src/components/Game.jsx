import { useEffect, useState } from "react";
import { findShortestPath, generateMaze } from "../utils/helper";
import Maze from "./Maze";
import toast from "react-hot-toast";
import Dashboard from "./Dashboard";

const Game = ({ selectedChar, exitGame }) => {
  const [currPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [level, setLevel] = useState(0);
  const [maze, setMaze] = useState(generateMaze(level));
  const [totalSeconds, setTotalSeconds] = useState(30);
  const [path, setPath] = useState([]);
  const [numberOfTimeGetPath, setNumberOfTimeGetPath] = useState(0);

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
    toast.success("GAME FINISHED");
    exitGame();
  };

  const handleLossGame = () => {
    toast.error("GAME OVER!");
    exitGame();
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
    if (totalSeconds !== 0) {
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
      />
    </div>
  );
};
export default Game;
