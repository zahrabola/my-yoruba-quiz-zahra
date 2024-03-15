//import logo from './logo.svg';
import "./App.css";
import { useState, useEffect } from "react";
import { dataLanguage } from "./Data/index";
///import { FaMicrophone } from "react-icons/fa";
import ReactAudioPlayer from "react-audio-player";

function App() {
  const [inputstate, setInputState] = useState("");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [error, setError] = useState(false);

  const setRandomYoruba = () => {
    const randomIndex = Math.floor(Math.random() * dataLanguage.length);
    setCurrent(randomIndex);
  };

  const handleChange = (event) => {
    setInputState(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputstate.toLowerCase() === dataLanguage[current].english) {
      setScore(score + 1);
      setMaxScore(score + 1 > maxScore ? score + 1 : maxScore);
      setError(false);

      localStorage.setItem("score", score + 1);
      localStorage.setItem(
        "maxScore",
        score + 1 > maxScore ? score + 1 : maxScore
      );
    } else {
      const y = dataLanguage[current].yoruba;
      const e = dataLanguage[current].english;
      setError(
        `That is the wrong answer. The correct answer for ${y} is " ${e} " `
      );
      setScore(0);
      localStorage.setItem("score", 0);
    }
    setInputState("");
    setRandomYoruba();
  };

  useEffect(() => {
    setRandomYoruba();
    setScore(parseInt(localStorage.getItem("score")) || 0);
    setMaxScore(parseInt(localStorage.getItem("maxScore")) || 0);
  }, []);

  console.log(dataLanguage[current].audioUrl);
  return (
    <div className="App-Container">
      <header className="header-app">
        <h1 className="heading">Yoruba Quiz</h1>
        <div className="score">
          <p>
            {score} / {maxScore}
          </p>
        </div>
        <div className="title">
          <p>{dataLanguage[current].title}</p>
        </div>
      </header>
      <main className="main-app">
        <div className="word">
          <h1>{dataLanguage[current].yoruba}</h1>
        </div>
        <div className="audio-section">
          <ReactAudioPlayer
            src={dataLanguage[current].audioUrl}
            controls
            autoPlay
            className="audio"
            /*loop
             autoPlay*/
          />
        </div>
        <div className="section-form">
          <form onSubmit={handleSubmit}>
            <input type="text" value={inputstate} onChange={handleChange} className="input-section"/>
          </form>
        </div>
        <div className="message">
        {!error ? (
          <div className="clue">Guess the meaning of {dataLanguage[current].yoruba}, quick clue it is a word relating to: {dataLanguage[current].title}</div>
        ) : (
          <div className="error">{error}</div>
        )}
        </div>
       
      </main>
    </div>
  );
}

export default App;
/* 

 {error && (
          <div>
            <p>{error}</p>
          </div>
        )}
      */
