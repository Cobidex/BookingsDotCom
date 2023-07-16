import Accommodation from '../models/accommodation.js';
import City from '../models/city.js';

const createAccommodation = async (req, res) => {
  // Extract data from the request body
  const {
    name,
    description,
    pricePerNight,
    type,
    availableDates,
    city_id,
  } = req.body;
  // Check if the city exists
  const existingCity = await City.findByPk(city_id);
  if (!existingCity) {
    return res.status(404).json({ error: 'City not found' });
  }

  // Create a new accommodation object with the associated cityId
  const newAccommodation = {
    name,
    description,
    pricePerNight,
    type,
    availableDates,
    cityId: existingCity.id, // Assign the existing city's ID as the cityId for the accommodation
  };

  try {
    // Insert the new accommodation into the database using the Accommodation model
    const createdAccommodation = await Accommodation.create(newAccommodation);

    // Return the created accommodation in the response
    res.status(201).json(createdAccommodation);
  } catch (err) {
    console.log('error creating accommodation:', err);
    res.status(500).json({ error: 'Serverside Error' });
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
      city,
    } = req.body;

    const accommodation = await Accommodation.findByPk(id);
    if (!accommodation) {
      return res.status(404).json({ error: 'Accommodation not found' });
    }

    // Check if the city exists
    const existingCity = await City.findByPk(city.id);
    if (!existingCity) {
      return res.status(404).json({ error: 'City not found' });
    }

    accommodation.name = name;
    accommodation.description = description;
    accommodation.pricePerNight = pricePerNight;
    accommodation.type = type;
    accommodation.availableDates = availableDates;
    accommodation.cityId = existingCity.id; // Assign the existing city's ID as the cityId for the accommodation

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

const getAccommodationsCount = async (req, res) => {
  try {
    const count = await Accommodation.count();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch accommodations count' });
  }
};

const getAccommodationsCountByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const count = await Accommodation.count({ where: { cityId } });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch accommodations count by city' });
  }
};

export default {
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
  searchAccommodations,
  getAccommodationsCount,
  getAccommodationsCountByCity,
};
