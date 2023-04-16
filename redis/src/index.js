const express = require("express");
const axios = require("axios");
const responseTime = require("response-time");

const app = express();

// Crear objeto para almacenar los resultados en memoria
const cache = {};

app.use(responseTime());

// Obtener todos los personajes
app.get("/character", async (req, res, next) => {
  try {
    // Buscar datos en la cache
    if (cache.character) {
      console.log("Using cached data");
      return res.send(cache.character);
    }

    // Obtener datos de DisneyAPI.dev
    const response = await axios.get("https://api.disneyapi.dev/characters");

    // Almacenar resultados en la cache
    cache.character = response.data;

    // Responder al cliente
    res.send(response.data);
  } catch (error) {
    res.send(error.message);
  }
});

// Obtener un personaje específico
app.get("/character/:id", async (req, res, next) => {
  try {
    // Buscar datos en la cache
    if (cache[req.params.id]) {
      console.log("Using cached data");
      return res.send(cache[req.params.id]);
    }

    // Obtener datos de DisneyAPI.dev
    const response = await axios.get(
      `https://api.disneyapi.dev/characters/${req.params.id}`
    );

    // Almacenar resultados en la cache
    cache[req.params.id] = response.data;

    // Responder al cliente
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
