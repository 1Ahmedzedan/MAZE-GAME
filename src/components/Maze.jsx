import { FaStar } from "react-icons/fa";
import blueChar from "../assets/blueChar.png";
import greenChar from "../assets/greenChar.png";
import redChar from "../assets/redChar.png";
import block from "../assets/block.png";
import { useEffect, useState } from "react";
import winSoundSource from "../assets/winSound.wav";
import { isPathExist } from "../utils/helper";

const Maze = ({
  maze,
  selectedChar,
  handleWinLevel,
  path,
  currPosition,
  setCurrentPosition,
}) => {
  const w = maze[0]?.length * 100;
  let character = [blueChar, greenChar, redChar];
  const [winSound] = useState(new Audio(winSoundSource));

  useEffect(() => {
    if (
      currPosition.x === maze.length - 1 &&
      currPosition.y === maze[0].length - 1
    ) {
      winSound.play();
      const TimeSetOutWinId = setTimeout(() => {
        handleWinLevel();
        setCurrentPosition({ x: 0, y: 0 });
      }, 700);
      return () => clearTimeout(TimeSetOutWinId);
    }
    const handleKeyPress = (event) => {
      switch (event.key) {
        case "ArrowUp":
          if (currPosition?.x === 0) break;
          if (maze[currPosition.x - 1][currPosition.y]) break;
          setCurrentPosition({ ...currPosition, x: currPosition.x - 1 });
          break;
        case "ArrowDown":
          if (currPosition.x === maze?.length - 1) break;
          if (maze[currPosition.x + 1][currPosition.y]) break;
          setCurrentPosition({ ...currPosition, x: currPosition.x + 1 });
          break;
        case "ArrowLeft":
          if (currPosition.y === 0) break;
          if (maze[currPosition.x][currPosition.y - 1]) break;
          setCurrentPosition({ ...currPosition, y: currPosition.y - 1 });
          break;
        case "ArrowRight":
          if (currPosition.y === maze?.[0].length - 1) break;
          if (maze[currPosition.x][currPosition.y + 1]) break;
          setCurrentPosition({ ...currPosition, y: currPosition.y + 1 });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      winSound.pause();
      winSound.currentTime = 0;
    };
  }, [currPosition]);

  return (
    <div
      className={`flex flex-col w-[${w}px] justify-center justify-items-center`}
    >
      {maze?.map((row, x) => (
        <div key={x} className="flex">
          {row?.map((val, y) => (
            <div
              className={`w-[100px] h-[100px] border border-yellow-600 flex justify-center items-center ${
                (x == 0 && y == 0) ||
                (x == maze.length - 1 && y == maze[0].length - 1)
                  ? "bg-gray-600"
                  : isPathExist(path, [x, y])
                  ? "bg-green-600"
                  : " bg-gray-800"
              }`}
              key={y}
            >
              {currPosition.x === x && currPosition.y === y ? (
                <img src={character[selectedChar]} className="w-[70px]" />
              ) : val === 1 ? (
                <img src={block} className="w-[70px]" />
              ) : x == maze.length - 1 && y == maze[0].length - 1 ? (
                <FaStar className=" text-6xl text-yellow-600" />
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default Maze;
