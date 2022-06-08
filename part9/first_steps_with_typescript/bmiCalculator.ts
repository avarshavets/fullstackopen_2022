type Result = string
const calculateBmi = (height: number, weight: number): Result => {
    const bmi = weight/((height/100)^2)
    if (bmi < 18.4) {
        return 'Underweight'
    }
    if (bmi >= 18.5 && bmi < 24.9) {
        return 'Normal'
    }
    if (bmi >= 25.0 && bmi < 29.9) {
        return 'Overweight'
    }
    if (bmi >= 30.0) {
        return 'Obese'
    }
    throw new Error('not being able to perform calculation')
}

// bmiCalculator.js is run with command "npm run calculateBmi", which is defined in package.json
console.log(calculateBmi(180, 74))


// To get the calculator work with command-line parameters, process.argv
// Note: argv[0] = "ts-node", argv[1] = "file name", and argv[2] , argv[3] are height and weight respectively!
const height = Number(process.argv[2])
const weight = Number(process.argv[3])
console.log(`BMI with ${height} and ${weight} =`, calculateBmi(height, weight))


// Adding data validation for data provided through command-line
// Interface defines the "shape" an object should have
interface Values {
    value1: number,
    value2: number
}
const parseArguments = (args: Array<string>): Values => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too many arguments')

    // isNaN ~ is Not-A-Number
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    }
    else {
        throw new Error('Provided values are not numbers!')
    }
}

try {
    const { value1, value2 } = parseArguments(process.argv)
    console.log('Calculated Bmi is', calculateBmi(value1, value2))
}
catch (error: unknown) {
    console.log(error)
}

export default calculateBmi