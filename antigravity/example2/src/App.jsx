import { useState, useEffect } from 'react'
import './App.css' // We might keep this or remove it if using index.css only, but standard vite setup has it.
// Actually, let's rely on index.css for everything to succeed the plan's simplicity.

const CHOICES = [
  { id: 'rock', label: 'Rock', icon: '✊' },
  { id: 'paper', label: 'Paper', icon: '✋' },
  { id: 'scissors', label: 'Scissors', icon: '✌️' }
];

function App() {
  const [scores, setScores] = useState({ player: 0, computer: 0 });
  const [gameState, setGameState] = useState('idle'); // idle, playing (could add delay), result
  const [choices, setChoices] = useState({ player: null, computer: null });
  const [resultMessage, setResultMessage] = useState('');

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomIndex];
  };

  const determineWinner = (playerChoice, computerChoice) => {
    if (playerChoice.id === computerChoice.id) return 'draw';
    
    if (
      (playerChoice.id === 'rock' && computerChoice.id === 'scissors') ||
      (playerChoice.id === 'paper' && computerChoice.id === 'rock') ||
      (playerChoice.id === 'scissors' && computerChoice.id === 'paper')
    ) {
      return 'player';
    }
    
    return 'computer';
  };

  const handleChoice = (choiceId) => {
    const playerChoice = CHOICES.find(c => c.id === choiceId);
    const computerChoice = getComputerChoice();
    
    setChoices({ player: playerChoice, computer: computerChoice });
    
    const winner = determineWinner(playerChoice, computerChoice);
    
    if (winner === 'player') {
      setScores(prev => ({ ...prev, player: prev.player + 1 }));
      setResultMessage('You Win! 🎉');
    } else if (winner === 'computer') {
      setScores(prev => ({ ...prev, computer: prev.computer + 1 }));
      setResultMessage('Computer Wins! 🤖');
    } else {
      setResultMessage("It's a Draw! 🤝");
    }
    
    setGameState('result');
  };

  const resetGame = () => {
    setGameState('idle');
    setChoices({ player: null, computer: null });
    setResultMessage('');
  };

  return (
    <div className="app-container">
      <h1>Rock Paper Scissors</h1>
      
      <div className="scoreboard">
        <div className="score-item">
          <span className="score-label">Player</span>
          <span className="score-value">{scores.player}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Computer</span>
          <span className="score-value">{scores.computer}</span>
        </div>
      </div>

      <div className="game-area">
        {gameState === 'idle' ? (
          <div className="choices-grid">
            {CHOICES.map((choice) => (
              <button 
                key={choice.id} 
                className={`choice-btn ${choice.id}`}
                onClick={() => handleChoice(choice.id)}
              >
                <span className="choice-icon">{choice.icon}</span>
                {choice.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="result-view">
            <div className="battle-arena">
              <div className="fighter">
                <span className="fighter-label">You</span>
                <span className="fighter-icon">{choices.player?.icon}</span>
              </div>
              <div className="versus">VS</div>
              <div className="fighter">
                <span className="fighter-label">Computer</span>
                <span className="fighter-icon">{choices.computer?.icon}</span>
              </div>
            </div>
            
            <div className="result-overlay">
              <h2 className="result-message">{resultMessage}</h2>
              <button className="play-again-btn" onClick={resetGame}>
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
