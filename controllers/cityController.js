const City = require('../models/city');

const getCities = async (req, res) => {
    try {
        const cities = await City.findAll();
        res.json(cities);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cities' });
    }
};

const getCityCount = async (req, res) => {
    try {
        const count = await City.count();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch city count' });
    }
};

const createCity = async (req, res) => {
    try {
        const { name } = req.body;
        const newCity = await City.create({ name });
        res.status(201).json(newCity);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create city' });
    }
};

const updateCity = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const city = await City.findByPk(id);
        if (!city) {
            return res.status(404).json({ error: 'City not found' });
        }
        city.name = name;
        await city.save();
        res.json(city);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update city' });
    }
};

const deleteCity = async (req, res) => {
    try {
        const { id } = req.params;
        const city = await City.findByPk(id);
        if (!city) {
            return res.status(404).json({ error: 'City not found' });
        }
        await city.destroy();
        res.json({ message: 'City deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete city' });
    }
};

module.exports = {
    getCities,
    createCity,
    updateCity,
    deleteCity,
};
