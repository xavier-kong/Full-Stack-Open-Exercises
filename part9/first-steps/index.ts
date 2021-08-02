import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi?', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400);
    res.send({
      error: "Invalid parameters"
    });
  } 
  try {
    const result = {
      weight: weight,
      height: height,
      bmi: calculateBmi(height, weight)
    };
    res.send(result);
  } catch (e) {
    res.send({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      error: e
    });
  }
});

app.post('/exercises', (req, res) => {
  if (!req.body) {
    res.status(400);
    res.send({
      error: "No request sent"
    });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  } else if (!req.body.target || !req.body.daily_exercises) {
    res.status(400);
    res.send({
      error: "missing fields"
    });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  } else if (!Array.isArray(req.body.daily_exercises) || isNaN(req.body.target)) {
    res.status(400);
    res.send({
      error: "malformatted parameters"
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;
  const result = calculateExercises(target, daily_exercises);

  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});