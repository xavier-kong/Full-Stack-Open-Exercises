interface Results {
  periodLength: number;
  trainingDays: number;
  average: number;
  target: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}
// interface ExerciseInput {
//   target: number;
//   days: Array<number>;
// }

// const parseArgs = (args: Array<string>): ExerciseInput => {
//   if (args.length < 4) throw new Error('Not enough arguments');
//   if (args.length > 12) throw new Error('Too many arguments');

//   const hoursArr = [];
//   for (let i = 3; i <= args.length-1; i++) {
//     if (isNaN(Number(args[i]))) {
//       throw new Error('Provided values were not numbers!');
//     }
//     hoursArr.push(Number(args[i]));
//   }

//   if (!isNaN(Number(args[2]))) {
//     return {
//       target: Number(args[2]),
//       days: hoursArr, 
//     };
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }
// };

export const calculateExercises = (target: number, hours: Array<number> ): Results => {
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
}; 

// try {
//   const { target, days } = parseArgs(process.argv);
//   console.log(calculateExercises(target, days));
// } catch (e) {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//   console.log('Error, something bad happened, message: ', e.message);
// }
