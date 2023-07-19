import { expect } from 'chai';
import sinon from 'sinon';
import accommodationController from '../controllers/accommodationController.js';
import Accommodation from '../models/accommodation.js'; // Import the Accommodation model (replace with the correct path)

describe('Accommodation Controller', () => {
    describe('createAccommodation', () => {
        it('should create a new accommodation', async () => {
            const createStub = sinon.stub(Accommodation, 'create').resolves({
                id: 1, // Replace with a valid accommodation ID
                name: 'Test Accommodation',
                description: 'Test description',
                pricePerNight: 100,
                type: 'Hotel',
                availableDates: '2023-07-20',
                cityId: 1, // Replace with a valid city ID
                rating: 0.0,
            });

            const req = {
                body: {
                    name: 'Test Accommodation',
                    description: 'Test description',
                    pricePerNight: 100,
                    type: 'Hotel',
                    availableDates: '2023-07-20',
                    city_id: 1, // Replace with a valid city ID
                },
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await accommodationController.createAccommodation(req, res);

            // Expectations
            expect(res.status.calledOnceWith(201)).to.be.true;
            expect(res.json.calledOnce).to.be.true;
            expect(createStub.calledOnce).to.be.true;

            // Restore the stub to its original implementation
            createStub.restore();
        });
    });
});
