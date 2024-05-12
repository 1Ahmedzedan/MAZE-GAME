import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Game from "./components/Game";
import Intro from "./components/Intro";

const App = () => {
  const [selectedChar, setSelectedChar] = useState(0);
  const [start, setStart] = useState(false);


  const handleExitGame = ()=>{
    setStart(false) ; 
    setSelectedChar(0) ; 
  }

  return (
    <div>
      {start ? (
        <Game selectedChar={selectedChar} exitGame={handleExitGame}/>
      ) : (
        <Intro
          selectedChar={selectedChar}
          setSelectedChar={setSelectedChar}
          setStart={setStart}
        />
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
export default App;
