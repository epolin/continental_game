const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let players = [];
let scores = [];
let chipsHistory = [];
let currentRound = 1;

// Endpoint para registrar jugadores
app.post('/api/register', (req, res) => {
  const { playerName } = req.body;
  if (!playerName || players.includes(playerName)) {
    return res.status(400).json({ error: "Nombre inválido o ya registrado" });
  }
  players.push(playerName);
  res.json({ success: true, players });
});

// Endpoint para obtener jugadores
app.get('/api/players', (req, res) => {
  res.json({ players });
});

// Endpoint para guardar puntajes
app.post('/api/scores', (req, res) => {
  const { playerScores } = req.body;
  scores = playerScores;
  res.json({ success: true, scores });
});

// Endpoint para gestionar fichas
app.post('/api/chips', (req, res) => {
  const { playerChips } = req.body;
  chipsHistory = playerChips;
  res.json({ success: true, chipsHistory });
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
