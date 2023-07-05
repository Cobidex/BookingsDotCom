const Accommodation = require('../models/accommodation');

const createAccommodation = async (req, res) => {
    try {
        // Extract data from the request body
        const {
            name,
            description,
            pricePerNight,
            type,
            availableDates,
            cityId,
            rating
        } = req.body;

        // Create a new accommodation object
        const newAccommodation = {
            name,
            description,
            pricePerNight,
            type,
            availableDates,
            cityId,
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

const formatAccommodationForDisplay = (accommodation) => {
    const formattedAccommodation = {
        id: accommodation.id,
        name: accommodation.name,
        description: accommodation.description,
        pricePerNight: accommodation.pricePerNight,
        type: accommodation.type,
        availableDates: accommodation.availableDates.split(','),
        cityId: accommodation.cityId,
        rating: accommodation.rating,
    };

    return formattedAccommodation;
};

module.exports = {
    createAccommodation,
    formatAccommodationForDisplay,
};
