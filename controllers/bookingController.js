const Booking = require('../models/booking');
const User = require('../models/user');
const Accommodation = require('../models/accommodation');

const createBooking = async (req, res) => {
  const userId = req.user.userId
  try {
    const { checkIn, checkOut, accommodationId } = req.body;

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the accommodation exists
    const accommodation = await Accommodation.findByPk(accommodationId);
    if (!accommodation) {
      return res.status(404).json({ error: 'Accommodation not found' });
    }

    // Check if the accommodation is already booked for the specified dates
    const existingBooking = await Booking.findOne({
      where: {
        accomo_id: accommodationId,
        checkIn: { [Op.lte]: checkOut },
        checkOut: { [Op.gte]: checkIn },
      },
    });
    if (existingBooking) {
      return res.status(409).json({ error: 'Accommodation is already booked for the specified dates' });
    }

    // Create a new booking
    const booking = await Booking.create({
      checkIn,
      checkOut,
      user_id: userId,
      accomo_id: accommodationId,
    });

    // Return the created booking in the response
    res.status(201).json(booking);
  } catch (error) {
    // Handle any errors that occur during the booking process
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Find the booking
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (req.user.userId === booking.user_id) {
      // Delete the booking
      await booking.destroy();

      res.json({ message: 'Booking cancelled successfully' });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
};

module.exports = {
  createBooking,
  cancelBooking,
};
