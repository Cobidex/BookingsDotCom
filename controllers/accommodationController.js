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

const updateAccommodation = async (req, res) => {
    try {
        const { id } = req.params; // Extract the accommodation ID from the request parameters

        // Extract the updated data from the request body
        const {
            name,
            description,
            pricePerNight,
            type,
            availableDates,
            cityId,
            rating
        } = req.body;

        // Find the accommodation by ID
        const accommodation = await Accommodation.findByPk(id);

        // Check if the accommodation exists
        if (!accommodation) {
            return res.status(404).json({ error: 'Accommodation not found' });
        }

        // Update the accommodation with the new data
        accommodation.name = name;
        accommodation.description = description;
        accommodation.pricePerNight = pricePerNight;
        accommodation.type = type;
        accommodation.availableDates = availableDates;
        accommodation.cityId = cityId;
        accommodation.rating = rating;

        // Save the updated accommodation
        await accommodation.save();

        // Return the updated accommodation in the response
        res.json(accommodation);
    } catch (error) {
        // Handle any errors that occur during the update process
        res.status(500).json({ error: 'Failed to update accommodation' });
    }
};

const deleteAccommodation = async (req, res) => {
    try {
        const { id } = req.params; // Extract the accommodation ID from the request parameters

        // Find the accommodation by ID
        const accommodation = await Accommodation.findByPk(id);

        // Check if the accommodation exists
        if (!accommodation) {
            return res.status(404).json({ error: 'Accommodation not found' });
        }

        // Delete the accommodation
        await accommodation.destroy();

        // Return a success message in the response
        res.json({ message: 'Accommodation deleted successfully' });
    } catch (error) {
        // Handle any errors that occur during the deletion process
        res.status(500).json({ error: 'Failed to delete accommodation' });
    }
};

module.exports = {
    createAccommodation,
    formatAccommodationForDisplay,
    updateAccommodation,
    deleteAccommodation,
};
