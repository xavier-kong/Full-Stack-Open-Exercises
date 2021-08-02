interface BmiInput {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BmiInput => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100)**2
  if (bmi >= 40) {
    return 'Obese (Class III)'
  } else if (bmi >= 35 ) {
    return 'Obese (Class II)'
  } else if (bmi >= 30 ) {
    return 'Obese (Class I)'
  } else if (bmi >= 25) {
    return 'Overweight (Pre-obese)'
  } else if (bmi >= 18.5) {
    return 'Normal range'
  } else if (bmi >= 17) {
    return 'Underweight (Mild thinness)'
  } else if (bmi >= 16) {
    return 'Underweight (Moderate thinness)'
  } else {
    return 'Underweight (Severe thinness)'
  }
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}