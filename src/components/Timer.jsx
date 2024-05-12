import { useEffect } from "react";

function Timer({ totalSeconds, setTotalSeconds }) {
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTotalSeconds(
        (prevTotalSeconds) => prevTotalSeconds - (prevTotalSeconds !== 0)
      );
    }, 1000);

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs only once after the initial render

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className=" bg-slate-600 font-bold w-fit px-6 py-2 rounded-full cursor-pointer">
      <p
        className={`${
          totalSeconds === 0 ? "text-red-700" : "text-white"
        } text-xl transition-all duration-500`}
      >
        {" "}
        {minutes < 10 ? "0" : ""}
        {minutes} : {seconds < 10 ? "0" : ""}
        {seconds}
      </p>
    </div>
  );
}

export default Timer;
