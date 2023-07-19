import { expect } from 'chai';
import sinon from 'sinon';
import accommodationController from '../controllers/accommodationController.js';
import Accommodation from '../models/accommodation.js';
import City from '../models//city.js';

describe('Accommodation Controller', () => {
    describe('createAccommodation', () => {
        it('should create a new accommodation', async () => {
            // Test data
            const newAccommodationData = {
                name: 'Test Accommodation',
                description: 'Test description',
                pricePerNight: 100,
                type: 'Hotel',
                availableDates: '2023-07-20',
                city_id: 1,
            };

            // Create a Sinon stub for Accommodation.create
            const createStub = sinon.stub(Accommodation, 'create').resolves({
                id: 1,
                ...newAccommodationData,
                rating: 0.0,
            });

            const req = {
                body: newAccommodationData,
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

    // Test for updateAccommodation
    describe('updateAccommodation', () => {
        it('should update an existing accommodation', async () => {
            // Test data
            const accommodationId = 1;
            const updatedAccommodationData = {
                name: 'Updated Accommodation',
                description: 'Updated description',
                pricePerNight: 150,
                type: 'Apartment',
                availableDates: '2023-08-10',
                city: {
                    id: 2,
                },
            };

            // Create a Sinon stub for Accommodation.findByPk
            const findByPkStub = sinon.stub(Accommodation, 'findByPk').resolves({
                id: accommodationId,
                ...updatedAccommodationData,
                rating: 0.0,
                save: sinon.stub().resolves(),
            });

            const req = {
                params: { id: accommodationId },
                body: updatedAccommodationData,
            };
            const res = {
                json: sinon.stub(),
            };

            await accommodationController.updateAccommodation(req, res);

            // Expectations
            expect(findByPkStub.calledOnceWith(accommodationId)).to.be.true;
            expect(res.json.calledOnce).to.be.true;

            // Restore the stub to its original implementation
            findByPkStub.restore();
        });
    });

    // Test for deleteAccommodation
    describe('deleteAccommodation', () => {
        it('should delete an existing accommodation', async () => {
            // Test data
            const accommodationId = 1;

            // Create a Sinon stub for Accommodation.findByPk
            const findByPkStub = sinon.stub(Accommodation, 'findByPk').resolves({
                id: accommodationId,
                destroy: sinon.stub().resolves(),
            });

            const req = {
                params: { id: accommodationId },
            };
            const res = {
                json: sinon.stub(),
            };

            await accommodationController.deleteAccommodation(req, res);

            // Expectations
            expect(findByPkStub.calledOnceWith(accommodationId)).to.be.true;
            expect(res.json.calledOnce).to.be.true;

            // Restore the stub to its original implementation
            findByPkStub.restore();
        });
    });

    // Test for getAccommodationsCount
    describe('getAccommodationsCount', () => {
        it('should get the count of all accommodations', async () => {
            // Create a Sinon stub for Accommodation.count
            const countStub = sinon.stub(Accommodation, 'count').resolves(10); // Replace with the expected count

            const req = {};
            const res = {
                json: sinon.stub(),
            };

            await accommodationController.getAccommodationsCount(req, res);

            // Expectations
            expect(countStub.calledOnce).to.be.true;
            expect(res.json.calledOnceWith({ count: 10 })).to.be.true; // Replace with the expected count

            // Restore the stub to its original implementation
            countStub.restore();
        });
    });

    // Test for getAccommodationsCountByCity
    describe('getAccommodationsCountByCity', () => {
        it('should get the count of accommodations by city', async () => {
            // Test data
            const cityId = 1;

            // Create a Sinon stub for Accommodation.count
            const countStub = sinon.stub(Accommodation, 'count').resolves(5); // Replace with the expected count

            const req = {
                params: { cityId: cityId },
            };
            const res = {
                json: sinon.stub(),
            };

            await accommodationController.getAccommodationsCountByCity(req, res);

            // Expectations
            expect(countStub.calledOnceWith({ where: { cityId } })).to.be.true;
            expect(res.json.calledOnceWith({ count: 5 })).to.be.true; // Replace with the expected count

            // Restore the stub to its original implementation
            countStub.restore();
        });
    });
});
