import React, { useState } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, Award, Dice6, RefreshCw } from 'lucide-react';

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2
  },
  {
    question: "Who is the lead singer of Radiohead?",
    options: ["Thom Yorke", "Jonny Greenwood", "Colin Greenwood", "Ed O'Brien", "Philip Selway"],
    correct: 0
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1
  },
  {
    question: "Who is the all-time leading scorer in the NBA?",
    options: [ "Michael Jordan", "Kareem Abdul-Jabbar", "Kobe Bryant","Lebron James"],
    correct: 3
  },
  {
    question: "What is the largest mammal on Earth?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correct: 1
  },
  {
    question: "Who is the guitar player for Pink Floyd?",
    options: ["Roger Waters", "Richard Wright", "David Gilmour", "Nick Mason"],
    correct: 2
  }
];

const Quiz = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showDice, setShowDice] = useState(false);
  const [diceNumber, setDiceNumber] = useState(1);
  const [showBalloon, setShowBalloon] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  const checkAnswer = (selectedIndex) => {
    const correct = selectedIndex === quizData[currentQuestion].correct;
    setShowFeedback(true);
    setFeedbackText(correct ? "Correct! 🎉" : "Try Again!");
    if (correct) setScore(score + 1);
    
    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setShowFeedback(false);
  };

  const rollDice = () => {
    setShowDice(true);
    setDiceNumber(Math.floor(Math.random() * 6) + 1);
    setTimeout(() => setShowDice(false), 2000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 bg-gradient-to-br from-[black] to-[#9F8796] ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <nav className="bg-[#6C8776] p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:scale-110 transition-transform"
          >
            <Menu className="text-white" />
          </button>
          <span className="text-white ml-4 text-xl font-bold">Quiz Game</span>
        </div>
         
        <div className="flex items-center gap-4">
          <div className="relative chevron-menu">
          <button
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
              setMenuClicked(true);
              setTimeout(() => setMenuClicked(false), 2000); 
            }}
            className={`text-white flex items-center hover:scale-105 transition-transform rounded-md ${
              menuClicked ? 'menu-glow' : ''
            }`}
          >
            Menu <ChevronDown className="ml-1" />
          </button>
            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white text-gray-800 rounded shadow-lg p-2 animate-slideDown">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">Home</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">About</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">Settings</a>
              </div>
            )}
          </div>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 hover:scale-110 transition-transform"
          >
            {darkMode ? (
              <Sun className="text-white sun-hover" />
            ) : (
              <Moon className="text-white moon-hover" />
            )}
          </button>

        </div>
      </nav>

      <div className={`fixed top-0 left-0 h-full w-64 bg-[#6C8776] transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-white hover:scale-110 transition-transform"
        >
          <X />
        </button>
        <div className="p-4 text-white">
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:opacity-80">Home</a></li>
            <li><a href="#" className="hover:opacity-80">Profile</a></li>
            <li><a href="#" className="hover:opacity-80">Settings</a></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {quizCompleted ? (
          <div className="max-w-2xl mx-auto text-center">
            <div className={`p-8 rounded-lg shadow-xl transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
              <p className="text-xl mb-6">
                Your Score: {score}/{quizData.length}
              </p>
              <div className="flex justify-center items-center space-x-4">
              <button
                onClick={restartQuiz}
                className={`bg-[#6C8776] ${darkMode ? 'text-black hover:bg-gray-100' : 'text-white hover:bg-gray-800'} px-6 py-3 rounded-lg hover:scale-110 transition-transform flex items-center`}
              >
                <RefreshCw className="mr-2" /> Try Again
              </button>
              <button
                onClick={() => setShowLeaderboard(true)}
                className={`bg-[#6C8776] ${darkMode ? 'text-black hover:bg-gray-100' : 'text-white hover:bg-gray-800'} px-6 py-3 rounded-lg hover:scale-110 transition-transform flex items-center leaderboard-button`}
              >
                <Award className="mr-2" /> Leaderboard
              </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="max-w-2xl mx-auto">
              <div className={`p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-102 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-2xl font-bold mb-4">{quizData[currentQuestion].question}</h2>
                <div className="space-y-3">
                  {quizData[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => checkAnswer(index)}
                      className={`w-full p-3 text-left rounded transition-all duration-300 
                        ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
                        hover:shadow-md hover:scale-102`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {showFeedback && (
                  <div className="mt-4 text-center font-bold animate-bounce">
                    {feedbackText}
                  </div>
                )}
                <div className="mt-4 text-center">
                  Score: {score}/{quizData.length}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={rollDice}
                className="bg-[#6C8776] text-white px-4 py-2 rounded hover:scale-110 transition-transform"
              >
                <Dice6 className="inline-block mr-2" />
                Roll Dice
              </button>
              
              <button
                onClick={() => setShowLeaderboard(!showLeaderboard)}
                className="bg-[#6C8776] text-white px-4 py-2 rounded hover:scale-110 transition-transform leaderboard-button"
              >
                <Award className="inline-block mr-2" />
                Leaderboard
              </button>
            </div>
          </>
        )}

        {showDice && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin">
            <div className="text-4xl">{diceNumber}</div>
          </div>
        )}

        {showBalloon && (
          <div
            onClick={() => setShowBalloon(false)}
            className="fixed top-20 right-20 animate-float cursor-pointer"
          >
            🎈
          </div>
        )}

        <div className={`fixed bottom-0 left-0 right-0 bg-[#6C8776] text-white p-4 transform transition-transform duration-300 ${showLeaderboard ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="relative">
            <button
              onClick={() => setShowLeaderboard(false)}
              className="absolute top-0 right-0 hover:scale-110 transition-transform"
            >
              <X className='text-white' />
            </button>
            <h3 className="text-xl font-bold mb-2">Leaderboard</h3>
            <ul>
              <li>Player 1 - 300 points</li>
              <li>Player 2 - 250 points</li>
              <li>Player 3 - 200 points</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;