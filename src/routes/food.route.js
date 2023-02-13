const express = require('express')
const { foodCollection } = require('../models/index')
const foodRoutes = express()

const getFoods = async (_, res) => {
    const allFood = await foodCollection.read()
    res.json(allFood)
}

const getFood = async (req, res, next) => {
    const id = req.params.id
    const food = await foodCollection.read(id)
    food === null ? next() : res.json(food)
}

const deleteFood = async (req, res, next) => {
    const id = req.params.id
    const food = await foodCollection.delete(id)
    if (food === null) {
        next()
    } else {
        await food
        res.json({})
    }
}
const createFood = async (req, res) => {
    const foodItemName = req.body.name
    const foodGroup = req.body.group
    const food = await foodCollection.create({
        name: foodItemName,
        group: foodGroup,
    })
    res.json(food)
}

const updateFood = async (req, res, next) => {
    const id = req.params.id
    let food

    const foodItemName = req.body.name ?? food.name
    const foodGroup = req.body.group ?? user.group
    // console.log(req.body.group)
    let updatedFood = {
        name: foodItemName,
        group: foodGroup,
    }

    food = await foodCollection.update(updatedFood, id)

    res.json(food)
}
foodRoutes.get('/food', getFoods) // Retrieve All
foodRoutes.get('/food/:id', getFood) // Retrieve One
foodRoutes.post('/food', createFood) // Create
foodRoutes.put('/food/:id', updateFood) // Update
foodRoutes.delete('/food/:id', deleteFood) // Delete
module.exports = {
    foodRoutes,
}