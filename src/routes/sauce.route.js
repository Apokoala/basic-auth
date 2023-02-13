const express = require('express');
const { sauceCollection } = require('../models/index');
const sauceRoutes = express();

const getSauces = async (_, res) => {
    const allSauces = await sauceCollection.read();
    res.json(allSauces);
};

const getSauce = async (req, res, next) => {
    const id = req.params.id;
    const sauce = await sauceCollection.read(id);
    sauce ? res.json(sauce) : next();
};

const deleteSauce = async (req, res, next) => {
    const id = req.params.id;
    const deleted = await sauceCollection.delete(id);
    deleted ? res.json({}) : next();
};

const createSauce = async (req, res) => {
    const { name, type } = req.body;
    const sauce = await sauceCollection.create({ name, type });
    res.json(sauce);
};

const updateSauce = async (req, res, next) => {
    const id = req.params.id;
    const { name, type } = req.body;
    const updatedSauce = { name, type };
    const sauce = await sauceCollection.update(updatedSauce, id);
    sauce ? res.json(sauce) : next();
};

sauceRoutes
    .get('/sauce', getSauces)
    .get('/sauce/:id', getSauce)
    .post('/sauce', createSauce)
    .put('/sauce/:id', updateSauce)
    .delete('/sauce/:id', deleteSauce);

module.exports = { sauceRoutes };