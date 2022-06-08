interface ExerciseResult {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    success: boolean,
    rating: number,
    ratingDescription: string
}

// daily exercises are given as an array of 7 numbers --> hours of exercise for each day
// target --> target amount of daily hours
const calculateExercises = (target: number, exercises: Array<number>): ExerciseResult => {
    const getRating = () => {
        if (average < 1) {
            return 1
        }
        if (average < 2) {
            return 2
        }
        return 3
    }
    const ratingExplanation = {
        1: 'not enough exercises',
        2: 'not too bad but could be better',
        3: 'great job'
    }
    const periodLength = exercises.length
    const trainingDays = exercises.reduce((sum, item) =>
            item !== 0 ? sum + 1 : sum
    , 0)
    const average = exercises.reduce((sum, item) => (sum + item), 0) / periodLength
    const rating = getRating()
    return {
        periodLength,
        trainingDays,
        target,
        average,
        success: average >= target,
        rating,
        ratingDescription: ratingExplanation[rating]
    }
}

console.log(calculateExercises(2,[3, 0, 2, 4.5, 0, 3, 1]))

// function that takes and parsed the input from the command line
interface ExerciseValues {
    target: number,
    exercises: Array<number>
}
const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
    // ts-node + file name + target + 7 daily exercise hours --> 10 arguments
    if (args.length < 10) throw  new Error('Not enough arguments')

    // remove/slice 2 first items from arguments, which refer to run file command (ts-node file_name)
    const arrayOfStrings = args.slice(2)
    const areNumbers = () => {
        for (const s of arrayOfStrings) {
            if (isNaN(Number(s))) {
                return false
            }
        }
        return true
    }
    if (!areNumbers) throw new Error('Provided values are not numbers!')

    const exercises = []
    const target = Number(arrayOfStrings[0])
    for (const s of arrayOfStrings.slice(1)) {
        exercises.push(Number(s))
    }
    return {
        target,
        exercises
    }
}

// run the calculator
try {
    const { target, exercises } = parseExerciseArguments(process.argv)
    console.log(calculateExercises(target, exercises))
}
catch (error: unknown) {
    console.log(error)
}

export default calculateExercises