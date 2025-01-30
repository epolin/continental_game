import React, { useState } from 'react';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [showMenu, setShowMenu] = useState(true);
  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [chips, setChips] = useState([]);
  const [scores, setScores] = useState([]);

  // Función para agregar jugadores
  const addPlayer = () => {
    if (!currentPlayer || players.includes(currentPlayer)) return;
    setPlayers([...players, currentPlayer]);
    setCurrentPlayer('');
  };

  // Función para enviar puntajes
  const submitScores = () => {
    const playerScores = players.map((player) => ({
      name: player,
      score: parseInt(prompt(`Ingresa puntos para ${player}:`), 10),
    }));
    setScores(playerScores);
  };

  // Función para gestionar fichas
  const manageChips = () => {
    const playerChips = players.map((player) => ({
      name: player,
      chips: parseInt(prompt(`Ingresa fichas compradas por ${player}:`), 10),
    }));
    setChips(playerChips);
  };

  return (
    <div className="App">
      {/* Encabezado */}
      <header>
        <h1>Torneo Continental</h1>
        <button onClick={() => setShowMenu(!showMenu)}>☰ Menú</button>
      </header>

      {/* Menú */}
      {showMenu && (
        <nav>
          <ul>
            <li><button onClick={() => alert('Continuar Torneo')}>Continuar Torneo</button></li>
            <li><button onClick={() => alert('Partida Nueva')}>Partida Nueva</button></li>
            <li><button onClick={manageChips}>Gestionar Fichas</button></li>
            <li><button onClick={() => setShowPlayerForm(true)}>Registro de Jugadores</button></li>
          </ul>
        </nav>
      )}

      {/* Formulario para Agregar Jugadores */}
      {showPlayerForm && (
        <div>
          <h2>Agregar Jugador</h2>
          <input
            type="text"
            value={currentPlayer}
            onChange={(e) => setCurrentPlayer(e.target.value)}
            placeholder="Nombre del jugador"
          />
          <button onClick={addPlayer}>Agregar Jugador</button>
          <button onClick={() => setShowPlayerForm(false)}>Cancelar</button>
        </div>
      )}

      {/* Lista de Jugadores */}
      <section>
        <h2>Registro de Jugadores</h2>
        <ul>
          {players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
      </section>

      {/* Resultados de Puntos */}
      <section>
        <h2>Resultados de la Partida Actual</h2>
        <table>
          <thead>
            <tr>
              <th>Jugador</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={index}>
                <td>{score.name}</td>
                <td>{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={submitScores}>Enviar Resultados</button>
      </section>

      {/* Gestión de Fichas */}
      <section>
        <h2>Gestión de Fichas</h2>
        <table>
          <thead>
            <tr>
              <th>Jugador</th>
              <th>Fichas Compradas</th>
            </tr>
          </thead>
          <tbody>
            {chips.map((chip, index) => (
              <tr key={index}>
                <td>{chip.name}</td>
                <td>{chip.chips}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={manageChips}>Guardar Cambios</button>
      </section>
    </div>
  );
}

export default App;
