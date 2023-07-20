import { expect } from 'chai';
import sinon from 'sinon';
import bookingController from '../controllers/bookingController.js';
import Booking from '../models/booking.js';
import User from '../models/user.js';
import Accommodation from '../models/accommodation.js';

describe('Booking Controller', () => {
    describe('createBooking', () => {
        it('should create a new booking', async () => {
            // Test data
            const bookingData = {
                checkIn: '2023-07-20',
                checkOut: '2023-07-25',
                accommodationId: 1,
            };
            const userId = 1;

            // Create a Sinon stub for User.findByPk
            const userFindByPkStub = sinon.stub(User, 'findByPk').resolves({ id: userId });

            // Create a Sinon stub for Accommodation.findByPk
            const accommodationFindByPkStub = sinon.stub(Accommodation, 'findByPk').resolves({ id: bookingData.accommodationId });

            // Create a Sinon stub for Booking.findOne
            const bookingFindOneStub = sinon.stub(Booking, 'findOne').resolves(null);

            // Create a Sinon stub for Booking.create
            const bookingCreateStub = sinon.stub(Booking, 'create').resolves({ id: 1, ...bookingData, user_id: userId });

            const req = {
                body: bookingData,
                user: { userId },
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await bookingController.createBooking(req, res);

            // Expectations
            expect(userFindByPkStub.calledOnceWith(userId)).to.be.true;
            expect(accommodationFindByPkStub.calledOnceWith(bookingData.accommodationId)).to.be.true;
            expect(bookingFindOneStub.calledOnce).to.be.true;
            expect(bookingCreateStub.calledOnceWith({
                checkIn: bookingData.checkIn,
                checkOut: bookingData.checkOut,
                user_id: userId,
                accomo_id: bookingData.accommodationId,
            })).to.be.true;
            expect(res.status.calledOnceWith(201)).to.be.true;
            expect(res.json.calledOnceWith({ id: 1, ...bookingData, user_id: userId })).to.be.true;

            // Restore the stubs to their original implementation
            userFindByPkStub.restore();
            accommodationFindByPkStub.restore();
            bookingFindOneStub.restore();
            bookingCreateStub.restore();
        });
    });
    describe('cancelBooking', () => {
        it('should cancel an existing booking', async () => {
            // Test data
            const bookingId = 1;
            const userId = 1;

            // Create a Sinon stub for Booking.findByPk
            const bookingFindByPkStub = sinon.stub(Booking, 'findByPk').resolves({ id: bookingId});

            // Create a Sinon stub for Booking.prototype.destroy
            const bookingDestroyStub = sinon.stub(Booking.prototype, 'destroy');

            const req = {
                params: { id: bookingId },
            };
            const res = {
                status: sinon.stub().returnsThis(), // Create a Sinon stub for the status function
                json: sinon.stub(),
            };

            await bookingController.cancelBooking(req, res);

            // Restore the stubs to their original implementation
            bookingFindByPkStub.restore();
            bookingDestroyStub.restore();
        });
    });
});
