import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());
/*
following input in the request body:

{
  "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
  "target": 2.5
}

response is:

{
    "periodLength": 7,
    "trainingDays": 4,
    "success": false,
    "rating": 1,
    "ratingDescription": "bad",
    "target": 2.5,
    "average": 1.2142857142857142
}

*/
app.post("/exercises", (req, res) => {
  console.log("body on: " + req.body);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    return res.status(400).send({ error: "parameters missing" });
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const dailyExNumbers: number[] = [];
  daily_exercises.forEach((ex) => {
    dailyExNumbers.push(Number(ex));
  });

  if (dailyExNumbers.includes(NaN)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const calc = calculateExercises(dailyExNumbers, Number(target));
  return res.json({
    calc,
  });
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  const bmi = calculateBmi(height, weight);

  return res.json({
    weight,
    height,
    bmi,
  });
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
