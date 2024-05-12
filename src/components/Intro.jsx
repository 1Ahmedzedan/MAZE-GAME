import toast from "react-hot-toast";
import blueChar from "../assets/blueChar.png";
import greenChar from "../assets/greenChar.png";
import redChar from "../assets/redChar.png";

const Intro = ({ selectedChar, setSelectedChar, setStart }) => {
  let character = [blueChar, greenChar, redChar];

  const handleStartGame = () => {
    if (selectedChar === -1) {
      toast.error("Please Select Character First!", {
        duration: 2000,
      });
      return;
    }

    setStart(true);
  };

  return (
    <div className="h-screen bg-gray-800 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-14">
        <p className="text-4xl font-bold border-2  shadow-2xl rounded-xl tracking-widest p-4 text-yellow-500 cursor-pointer">
          MAZE GAME
        </p>
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="text-3xl tracking-widest text-white font-bold">
            Select Character For Play
          </p>
          <div className=" space-x-8">
            {character.map((img, idx) => (
              <button
                onClick={() => setSelectedChar(idx)}
                key={idx}
                className={`${
                  selectedChar === idx ? "bg-gray-400" : "bg-gray-600"
                } px-2 rounded-xl hover:bg-gray-500 transition-all duration-500 hover:shadow-lg  hover:shadow-white`}
              >
                <img src={img} alt="img" className="w-12" />
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleStartGame}
          className="text-white bg-gray-600 px-10 py-2 text-2xl font-bold rounded-xl hover:bg-gray-500 hover:rounded-full transition-all duration-500"
        >
          START
        </button>
      </div>
    </div>
  );
};
export default Intro;
