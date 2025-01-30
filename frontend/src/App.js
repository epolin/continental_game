import React, { useState } from 'react';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [scores, setScores] = useState([]);
  const [chips, setChips] = useState([]);
  const [currentSection, setCurrentSection] = useState('menu');
  const [currentRound, setCurrentRound] = useState(1); // Controla la ronda actual

  // Función para agregar jugadores
  const addPlayer = () => {
    if (!currentPlayer || players.includes(currentPlayer)) return;
    setPlayers([...players, currentPlayer]);
    setCurrentPlayer('');
  };

  // Función para iniciar la partida
  const startGame = () => {
    setCurrentSection('submit-scores'); // Avanza al flujo de registro de puntajes
  };

  // Función para enviar puntajes
  const submitScores = () => {
    const playerScores = players.map((player, index) => ({
      name: player,
      score: parseInt(scores[index], 10) || 0,
    }));
    alert('Resultados enviados:\n' + JSON.stringify(playerScores, null, 2));
    setCurrentRound(currentRound + 1); // Avanza a la siguiente ronda
  };

  // Función para gestionar fichas
  const submitChips = () => {
    const playerChips = players.map((player, index) => ({
      name: player,
      chips: parseInt(chips[index], 10) || 0,
    }));
    alert('Fichas guardadas:\n' + JSON.stringify(playerChips, null, 2));
  };

  return (
    <div className="App">
      {/* Encabezado */}
      <header>
        <h1>Torneo Continental</h1>
        <button onClick={() => setCurrentSection('menu')}>☰ Menú</button>
      </header>

      {/* Menú Principal */}
      {currentSection === 'menu' && (
        <nav>
          <ul>
            <li><button onClick={() => setCurrentSection('add-players')}>Registro de Jugadores</button></li>
            <li><button onClick={() => setCurrentSection('submit-scores')}>Enviar Resultados</button></li>
            <li><button onClick={() => setCurrentSection('manage-chips')}>Gestión de Fichas</button></li>
            <li><button onClick={() => alert('Continuar Torneo')}>Continuar Torneo</button></li>
            <li><button onClick={() => alert('Partida Nueva')}>Partida Nueva</button></li>
          </ul>
        </nav>
      )}

      {/* Registro de Jugadores */}
      {currentSection === 'add-players' && (
        <section>
          <h2>Registro de Jugadores</h2>
          <input
            type="text"
            value={currentPlayer}
            onChange={(e) => setCurrentPlayer(e.target.value)}
            placeholder="Nombre del jugador"
          />
          <button onClick={addPlayer}>Agregar Jugador</button>
          <ul>
            {players.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
          {players.length > 0 && (
            <button className="start-game-button" onClick={startGame}>
              Iniciar Partida
            </button>
          )}
          <button onClick={() => setCurrentSection('menu')}>Regresar al Menú</button>
        </section>
      )}

      {/* Enviar Resultados */}
      {currentSection === 'submit-scores' && (
        <section>
          <h2>Partida {currentRound}/8</h2>
          <p>🏆 Líder: -</p>
          <p>Objetivo: 2 tercias</p>
          <table>
            <thead>
              <tr>
                <th>Jugador</th>
                <th>Puntos</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={index}>
                  <td>{player}</td>
                  <td>
                    <input
                      type="number"
                      value={scores[index] || ''}
                      onChange={(e) => {
                        const newScores = [...scores];
                        newScores[index] = e.target.value;
                        setScores(newScores);
                      }}
                      placeholder="Puntos"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={submitScores}>Enviar Resultados</button>
          <button onClick={() => setCurrentSection('menu')}>Regresar al Menú</button>
        </section>
      )}

      {/* Gestión de Fichas */}
      {currentSection === 'manage-chips' && (
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
              {players.map((player, index) => (
                <tr key={index}>
                  <td>{player}</td>
                  <td>
                    <input
                      type="number"
                      value={chips[index] || ''}
                      onChange={(e) => {
                        const newChips = [...chips];
                        newChips[index] = e.target.value;
                        setChips(newChips);
                      }}
                      placeholder="Fichas"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={submitChips}>Guardar Cambios</button>
          <button onClick={() => setCurrentSection('menu')}>Regresar al Menú</button>
        </section>
      )}
    </div>
  );
}

export default App;