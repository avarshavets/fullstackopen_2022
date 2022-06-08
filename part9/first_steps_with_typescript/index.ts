// const express = require('express') -->
// --> when using 'require' compiler will interpret everything express-related to be of type 'any'
//     whereas when we use 'import', the editor knows the actual types of express-related parameters
// Thus, we will use import statement to import express module
// If it does not work, a combined method can be used --> import ... = require('...')
import express from 'express'
const app = express()
app.use(express.json()) // enables express to use json-parser as a middleware


import calculateBmi from './bmiCalculator'
import calculateExercises from './exerciseCalculator'

// unused local variables are not allowed in TypeScrips --> underscore prefix can fix this issue for 'req' parameter
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

// input for BMI calculation in url is defined as query string parameters: e.g.:
// http://localhost:3003/bmi?height=180&weight=74
app.get('/bmi/', (req, res) => {
    // params return an object {height: '180', weight: '74'}
    const params = req.query
    if (Object.entries(params).length !== 2) {
        return res.status(400).json({'error': 'not enough or too many parameters'})
    }

    try {
        for (const key in params) {
            if (isNaN(Number(params[key])) || !params[key]) throw new Error('malformatted parameters')
        }
        const { height, weight } = params
        const result = calculateBmi(Number(height), Number(weight))
        return res.status(200).json({
            height,
            weight,
            bmi: result
        })
    }
    catch (error: unknown) {
        // console.log(error)
        // logging will convert error into a string but to return conversion to string or Error type is needed
        return res.status(400).json({'error': (error as Error).message})
    }
})


// input parameters are target and array with daily exercise hours as query string parameters
app.post('/exercises', (req, res) => {
    // @typescript-eslint/no-unsafe-assignment
    const { target, exercises } = req.body

    if (!target || !exercises) {
        return res.status(400).json({'error': 'parameters missing'})
    }
    const allNumbers = () => exercises.every((e: number) => typeof e === "number")

    try {
        if (isNaN(Number(target)) || !allNumbers()) throw new Error('malformatted parameters')
        const result = calculateExercises(Number(target), exercises)
        return res.status(200).json(result)
    }
    catch (error: unknown) {
         return res.status(400).json({'error': (error as Error).message})
    }
})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})