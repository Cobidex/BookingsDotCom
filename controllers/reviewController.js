const Review = require('../models/review');
const User = require('../models/user');
const Accommodation = require('../models/accommodation');

const createReview = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { accomo_id, rating, text } = req.body;

    // Check if the user exists
    const user = await User.findByPk(user_id);
    if (!user) {
       return res.status(404).json({ error: 'User not found' });
    }

    // Check if the accommodation exists
    const accommodation = await Accommodation.findByPk(accomo_id);
    if (!accommodation) {
      return res.status(404).json({ error: 'Accommodation not found' });
    }

    // Create a new review
    const review = await Review.create({ user_id, accomo_id, rating, text });

    // Update the accommodation's rating
    const reviews = await Review.findAll({ where: { accomo_id } });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    accommodation.rating = averageRating;
    await accommodation.save();

    // Return the created review in the response
    res.status(201).json(review);
  } catch (error) {
    // Handle any errors that occur during the review creation process
    res.status(500).json({ error: 'Failed to create review' });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [User, Accommodation], // Include User and Accommodation models
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

module.exports = {
  createReview,
  getReviews,
};
