const Accommodation = require('../models/accommodation');
const City = require('../models/city');

const createAccommodation = async (req, res) => {
    try {
        // Extract data from the request body
        const {
            name,
            description,
            pricePerNight,
            type,
            availableDates,
            city,
            rating
        } = req.body;

        // Create a new city
        const createdCity = await City.create(city);

        // Create a new accommodation object with the associated cityId
        const newAccommodation = {
            name,
            description,
            pricePerNight,
            type,
            availableDates,
            cityId: createdCity.id, // Assign the newly created city's ID as the cityId for the accommodation
            rating
        };

        // Insert the new accommodation into the database using the Accommodation model
        const createdAccommodation = await Accommodation.create(newAccommodation);

        // Return the created accommodation in the response
        res.status(201).json(createdAccommodation);
    } catch (error) {
        // Handle any errors that occur during the insertion process
        res.status(500).json({ error: 'Failed to create accommodation' });
    }
};


const updateAccommodation = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            description,
            pricePerNight,
            type,
            availableDates,
            cityId,
            rating
        } = req.body;

        const accommodation = await Accommodation.findByPk(id);
        if (!accommodation) {
            return res.status(404).json({ error: 'Accommodation not found' });
        }

        // Check if the city exists
        const city = await City.findByPk(cityId);
        if (!city) {
            return res.status(404).json({ error: 'City not found' });
        }

        accommodation.name = name;
        accommodation.description = description;
        accommodation.pricePerNight = pricePerNight;
        accommodation.type = type;
        accommodation.availableDates = availableDates;
        accommodation.cityId = cityId;
        accommodation.rating = rating;

        await accommodation.save();

        res.json(accommodation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update accommodation' });
    }
};

const deleteAccommodation = async (req, res) => {
    try {
        const { id } = req.params;

        const accommodation = await Accommodation.findByPk(id);
        if (!accommodation) {
            return res.status(404).json({ error: 'Accommodation not found' });
        }

        await accommodation.destroy();

        res.json({ message: 'Accommodation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete accommodation' });
    }
};

const searchAccommodations = async (req, res) => {
    try {
        const { location, type, price } = req.query;

        const searchQuery = {
            where: {},
            include: [City], // Include the City model for retrieving city details
        };

        if (location) {
            searchQuery.where['$City.name$'] = location;
        }

        if (type) {
            searchQuery.where.type = type;
        }

        if (price) {
            searchQuery.where.pricePerNight = price;
        }

        const accommodations = await Accommodation.findAll(searchQuery);

        res.json(accommodations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search accommodations' });
    }
};

module.exports = {
    createAccommodation,
    updateAccommodation,
    deleteAccommodation,
    searchAccommodations,
};
