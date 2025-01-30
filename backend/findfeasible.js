const express = require('express');
const app = express();
const port = 5000;
const axios = require('axios');
const destinations = require('../database/db.json');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  return res.send("Hello");
});

app.post('/api', (req, res) => {
  const { start, destination, budget } = req.body;

  if (!start || !destination || budget === undefined) {
    return res.status(400).json({ message: "Missing required fields: start, destination, or budget" });
  }

  if (!Array.isArray(destinations) || destinations.length === 0) {
    return res.status(500).json({ message: "Destination data is unavailable" });
  }

  const destinationData = destinations.find(
    (dest) => dest.name.toLowerCase() === destination.toLowerCase()
  );

  if (!destinationData) {
    return res.status(404).json({ message: "Destination not found" });
  }

  const travelCost = destinationData.travel_costs.find(
    (cost) => cost.start_point.toLowerCase() === start.toLowerCase()
  );

  if (!travelCost) {
    return res.status(404).json({ message: "No travel cost record for the given start point" });
  }

  if (travelCost.total_cost <= budget) {
    return res.json({
      message: "Your trip is feasible",
      total_cost: travelCost.total_cost,
      tourist_spots: destinationData.tourist_spots,
    });
  } else {
    return res.json({
      message: "Your trip is not feasible",
      total_cost: travelCost.total_cost,
    });
  }
});

app.post('/chatwithbot', async (req, res) => {
  const { user_input } = req.body;

  if (!user_input) {
    return res.status(400).json({ message: "User input is required" });
  }

  try {
    // Sending request to the Python Flask server to get the response
    const response = await axios.post('http://127.0.0.1:5001/chat', { user_input });

    // Send back the AI's response
    return res.json({ response: response.data.response });
  } catch (error) {
    console.error('Error communicating with the Python server:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
