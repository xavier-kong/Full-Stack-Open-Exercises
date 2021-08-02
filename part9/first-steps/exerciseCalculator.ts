interface Results {
  periodLength: number;
  trainingDays: number;
  average: number;
  target: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

const calculateExercises = (hours: Array<number>, target: number): Results => {
  const periodLength = hours.length;
  const trainingDays = hours.reduce((total, hours) => (hours !== 0 ? total + 1 : total),0);
  const average = hours.reduce((a,b) => (a + b)) / periodLength;
  let success;
  let rating;
  let ratingDescription;
  if (target < average) {
    rating = 3;
    ratingDescription = 'Exceeded target. Good job!';
    success = true;
  } else if ( target == average) {
    rating = 2;
    ratingDescription = 'Met target!';
    success = true;
  } else {
    rating = 1;
    ratingDescription = 'Did not meet target';
    success = false;
  }
  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription
  };
} 

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
