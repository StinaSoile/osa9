const calculateBmi = (height: number, weight: number): string => {
  const bmi = Math.round((weight / (height / 100) ** 2) * 10) / 10;
  let msg = "";
  if (bmi < 16) {
    msg = "Underweight (Severe thinness) ";
  }
  if (bmi > 16 && bmi < 16.9) {
    msg = "Underweight (Moderate thinness) ";
  }
  if (bmi > 17 && bmi < 18.4) {
    msg = "Underweight (Mild thinness) ";
  }
  if (bmi > 18.5 && bmi < 24.9) {
    msg = "Normal (Healthy weight)";
  }
  if (bmi > 25 && bmi < 29.9) {
    msg = "Overweight (Pre-obese) ";
  }
  if (bmi > 30 && bmi < 34.9) {
    msg = "Obese (Class I) ";
  }
  if (bmi > 35 && bmi < 39.9) {
    msg = "Obese (Class II) ";
  }
  if (bmi > 39.9) {
    msg = "Obese (Class III) ";
  }
  console.log(msg);
  return msg;
};
const a: number = Number(process.argv[2]);
const b: number = Number(process.argv[3]);
calculateBmi(a, b);

// console.log(calculateBmi(180, 74));
