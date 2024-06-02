interface Evaluation {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyHours: number[],
  goal: number
): Evaluation => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((d) => d !== 0).length;
  const average =
    dailyHours.reduce((acc, curr) => acc + curr, 0) / periodLength;
  const success = goal === average || goal < average;
  const target = goal;
  let rating = 0;
  let ratingDescription = "";
  if (average < goal / 2) {
    rating = 1;
    ratingDescription = "Too bad, next time better!";
  } else if (average < goal) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 3;
    ratingDescription = "Now we're talking!";
  }

  const evaluation = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
  console.log(evaluation);
  return evaluation;
};
const d: number = Number(process.argv[2]);

const c: number[] = process.argv.slice(3).map(Number);

calculateExercises(c, d);

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
