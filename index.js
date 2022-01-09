// We need exactly 5 inputs, so if we don't have that something is wrong


if (process.argv.length !== 7) {
   console.log(`
     You gave ${process.argv.length - 2} arguments(s) to the program
 
     Please provide 5 arguments for
     
     weight (kg), 
     height (m), 
     age, 
     wether you exercise daily (yes or no)
     and your gender (m or f)
     
     Example:
 
     $ node index.js 82 1.79 32 yes m
   `);
 
   process.exit();
 }
 
 var weightInKg = parseInt(process.argv[2]);
 var heightInM = parseFloat(process.argv[3]);
 var age = parseInt(process.argv[4]);
 var dailyExercise = process.argv[5];
 var gender = process.argv[6];
 
 // Check if weight OR height Or age is not a number (NaN)
 if (isNaN(weightInKg) || isNaN(heightInM) || isNaN(age)) {
   console.log(`
     Please make sure weight, height and age are numbers:
 
     weight (kg) example: 82 | your input: ${process.argv[2]}
     height (m) example 1.79 | your input: ${process.argv[3]}
     age (years) example 32  | your input: ${process.argv[4]} 
 
     $ node index.js 82 1.79 32 yes m
   `);
 
   process.exit();
 }
 
 if (age < 20) {
   console.log(`
     This BMI calculator was designed to be used by people older than 20
 
     BMI is calculated differently for young people.
 
     Please visit: https://en.wikipedia.org/wiki/Body_mass_index#Children_(aged_2_to_20)
 
     For more information
   `);
 
   process.exit();
 }
 
 // check if weight is lower than 30 kg OR higher than 300 kg
 if (weightInKg < 30 || weightInKg > 300) {
   console.log(`
     Please enter a weight in kgs
     
     Your weight of ${weightInKg} kgs does not fall in the range between 30 kg and 300 kg
 
     If you weight is below 30 kg or over 300 kg seek professional medical help
   `);
 
   process.exit();
 }
 
 // check wether dailyExercise was answered with "yes" or "no"
 if (dailyExercise !== "yes" && dailyExercise !== "no") {
   console.log(`
     Please specify wether you exercise daily with yes or no
 
     You entered: ${dailyExercise}
 
     (Don't worry, we won't judge you if you enter no)
   `);
 
   process.exit();
 }
 
 // The formula for BMI is: weight (kg) / (height (m) x height (m))
 var BMI = weightInKg / (heightInM * heightInM);
 
 // Assumption: ideal BMI is 22.5
 // The formula for idealWeight is 22.5 x height (m) x height (m)
 var idealWeightKg = 22.5 * heightInM * heightInM;
 
 // The formula for Basal Metabolic Rate (BMR) is: 10 x weight (kg) + 6.25 x height (cm) - 5 x age
 var heightInCm = heightInM * 100;
 
 // Assumption: You are either male or female
 
 // Declaring a variable, but not assigning it yet, the value will depend on wether someone is "m" or "f"!
 var BMR;
 
 if (gender === "m") {
   BMR = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 50;
 } else {
   BMR = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 150;
 }
 
 // Assumption: calories for a normal lifestyle is BMR * 1.4
 // Assumption: calories for a active lifestyle is BMR * 1.6
 
 // Declaring a variable, but not assigning it yet, the value will depend on wether someone exercises!
 var dailyCalories;
 
 if (dailyExercise === "yes") {
   // assigning dailyCalories a value now that we've checked the condition
   dailyCalories = BMR * 1.6;
} else {
   dailyCalories = BMR * 1.4;
 }
 
 var weightToLoseKg = weightInKg - idealWeightKg;
 
 // Assumption: we can lose or gain 0.5 kg a week
 // Using Math.abs to make dietWeeks a positive number
 var dietWeeks = Math.abs(weightToLoseKg / 0.5);
 
 // Assumption: to lose 0.5 kg a week we need to cut calorie intake by 500 calories
 // Assumption: to lgain 0.5 kg a week we need to increase calorie intake by 500 calories
 
 // Declaring a variable, but not assigning it yet
 // the value will depend on wether someone needs to lose or gain weight
 var dietCalories;
 
 if (weightToLoseKg > 0) {
   dietCalories = dailyCalories - 500;
 } else {
   dietCalories = dailyCalories + 500;
 }
 
 console.log(`
 **************
 BMI CALCULATOR
 **************
 
 age: ${age} years
 gender: ${gender}
 height: ${heightInM} m
 weight: ${weightInKg} kg
 do you exercise daily? ${dailyExercise}
 
 ****************
 FACING THE FACTS
 ****************
 
 Your BMI is ${Math.round(BMI)}
 
 A BMI under 18.5 is considered underweight
 A BMI above 25 is considered overweight
 
 Your ideal weight is ${Math.round(idealWeightKg)} kg
 With a normal lifestyle you burn ${Math.round(dailyCalories)} calories a day
 
 **********
 DIET PLAN
 **********
 
 If you want to reach your ideal weight of ${Math.round(idealWeightKg)} kg:
 
 Eat ${Math.round(dietCalories)} calories a day
 For ${Math.round(dietWeeks)} weeks
 `);