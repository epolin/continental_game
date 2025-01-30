import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [scores, setScores] = useState([]);
  const [chips, setChips] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);

  // Registrar jugador
  const addPlayer = async () => {
    if (!currentPlayer || players.includes(currentPlayer)) return;
    const response = await fetch('https://tu-backend.onrender.com/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerName: currentPlayer }),
    });
    const data = await response.json();
    if (data.success) {
      setPlayers(data.players);
      setCurrentPlayer('');
    }
  };

  // Obtener jugadores desde el backend
  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await fetch('https://tu-backend.onrender.com/api/players');
      const data = await response.json();
      setPlayers(data.players);
    };
    fetchPlayers();
  }, []);

  // Guardar puntajes
  const submitScores = async () => {
    const playerScores = players.map((player) => ({
      name: player,
      score: parseInt(prompt(`Ingresa puntos para ${player}:`), 10),
    }));
    const response = await fetch('https://tu-backend.onrender.com/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerScores }),
    });
    const data = await response.json();
    if (data.success) {
      setScores(data.scores);
      setCurrentRound(currentRound + 1);
    }
  };

  // Gestionar fichas
  const manageChips = async () => {
    const playerChips = players.map((player) => ({
      name: player,
      chips: parseInt(prompt(`Ingresa fichas compradas por ${player}:`), 10),
    }));
    const response = await fetch('https://tu-backend.onrender.com/api/chips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerChips }),
    });
    const data = await response.json();
    if (data.success) {
      setChips(data.chipsHistory);
    }
  };

  return (
    <div className="App">
      <h1>Torneo Continental</h1>
      <div>
        <input
          type="text"
          value={currentPlayer}
          onChange={(e) => setCurrentPlayer(e.target.value)}
          placeholder="Nombre del jugador"
        />
        <button onClick={addPlayer}>Agregar Jugador</button>
      </div>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
      <button onClick={submitScores}>Enviar Resultados</button>
      <button onClick={manageChips}>Gestionar Fichas</button>
      <h2>Puntajes</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            {score.name}: {score.score}
          </li>
        ))}
      </ul>
      <h2>Fichas Compradas</h2>
      <ul>
        {chips.map((chip, index) => (
          <li key={index}>
            {chip.name}: {chip.chips}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
