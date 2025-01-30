import React, { useState } from 'react';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [rounds, setRounds] = useState([]); // Guarda los resultados de todas las partidas
  const [chipsHistory, setChipsHistory] = useState([]); // Guarda el historial de fichas
  const [currentSection, setCurrentSection] = useState('menu');
  const [currentRound, setCurrentRound] = useState(1); // Controla la ronda actual
  const [error, setError] = useState(''); // Mensajes de error

  // Función para agregar jugadores
  const addPlayer = () => {
    if (!currentPlayer || players.includes(currentPlayer)) return;
    setPlayers([...players, currentPlayer]);
    setCurrentPlayer('');
  };

  // Función para iniciar la partida
  const startGame = () => {
    setCurrentSection('submit-scores');
    initializeScores(); // Inicializa los puntajes para la primera partida
  };

  // Función para inicializar puntajes
  const initializeScores = () => {
    const initialScores = players.map(() => 0);
    setRounds([{ scores: initialScores }]);
    setChipsHistory([{ chips: players.map(() => 0) }]);
  };

  // Función para validar los puntajes
  const validateScores = (scores) => {
    const zeroCount = scores.filter((score) => score === 0).length;

    // Solo puede haber un ganador (un jugador con 0 puntos)
    if (zeroCount !== 1) {
      setError('Error: Debe haber exactamente un ganador (0 puntos) en esta partida.');
      return false;
    }

    // Validar que todos los puntajes sean divisibles entre 5
    for (const score of scores) {
      if (score % 5 !== 0) {
        setError(`Error: El puntaje ${score} no es válido. Los puntos deben ser divisibles entre 5.`);
        return false;
      }
    }

    setError(''); // Limpiar errores si todo está bien
    return true;
  };

  // Función para enviar puntajes
  const submitScores = () => {
    const currentScores = rounds[currentRound - 1]?.scores || [];

    // Validar los puntajes
    if (!validateScores(currentScores)) return;

    // Avanzar a la siguiente partida o mostrar resultados finales
    const updatedRounds = [...rounds];
    updatedRounds[currentRound - 1] = { scores: currentScores };

    if (currentRound < 8) {
      setCurrentRound(currentRound + 1);
      updatedRounds.push({ scores: players.map(() => 0) }); // Inicializa puntajes para la siguiente partida
      setRounds(updatedRounds);
      setChipsHistory([...chipsHistory, { chips: players.map(() => 0) }]);
    } else {
      setCurrentSection('final-results');
    }
  };

  // Función para gestionar fichas
  const submitChips = () => {
    const currentChips = chipsHistory[currentRound - 1]?.chips || [];
    const updatedChipsHistory = [...chipsHistory];
    updatedChipsHistory[currentRound - 1] = { chips: currentChips };
    setChipsHistory(updatedChipsHistory);
  };

  return (
    <div className="App">
      {/* Encabezado */}
      <header>
        <h1>Torneo Continental</h1>
        <button onClick={() => setCurrentSection('menu')}>☰ Menú</button>
      </header>

      {/* Mensajes de Error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

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
              Comenzar Torneo
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
                      value={rounds[currentRound - 1]?.scores[index] || ''}
                      onChange={(e) => {
                        const updatedRounds = [...rounds];
                        updatedRounds[currentRound - 1].scores[index] = parseInt(e.target.value, 10) || 0;
                        setRounds(updatedRounds);
                      }}
                      placeholder="Puntos"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={submitScores}>
            {currentRound < 8 ? 'Siguiente Partida' : 'Finalizar Torneo'}
          </button>
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
                      value={chipsHistory[currentRound - 1]?.chips[index] || ''}
                      onChange={(e) => {
                        const updatedChipsHistory = [...chipsHistory];
                        updatedChipsHistory[currentRound - 1].chips[index] = parseInt(e.target.value, 10) || 0;
                        setChipsHistory(updatedChipsHistory);
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

      {/* Resultados Finales */}
      {currentSection === 'final-results' && (
        <section>
          <h2>Resultados Finales</h2>
          <table>
            <thead>
              <tr>
                <th>Jugador</th>
                <th>Puntuación Total</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={index}>
                  <td>{player}</td>
                  <td>{rounds.reduce((total, round) => total + (round.scores[index] || 0), 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setCurrentSection('menu')}>Regresar al Menú</button>
        </section>
      )}
    </div>
  );
}

export default App;