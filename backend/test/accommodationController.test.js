const assert = require('assert');
const Accommodation = require('../models/accommodation');
const accommodationController = require('../controllers/accommodationController');

describe('Accommodation Controller', () => {
    afterEach(() => {
        // Clean up any test-specific data or state if needed
    });

    describe('createAccommodation', () => {
        it('should create a new accommodation', async () => {
            const mockAccommodation = {
                id: 1,
                name: 'Test Accommodation',
                // Add other relevant properties
            };

            Accommodation.create = async (newAccommodation) => {
                assert.deepStrictEqual(newAccommodation, {
                    name: 'Test Accommodation',
                    // Add other relevant properties
                });

                return Promise.resolve(mockAccommodation);
            };

            const req = {
                body: {
                    name: 'Test Accommodation',
                    // Add other relevant properties
                },
            };
            const res = {
                status: (statusCode) => {
                    assert.strictEqual(statusCode, 201);
                    return res;
                },
                json: (data) => {
                    assert.deepStrictEqual(data, mockAccommodation);
                },
            };

            await accommodationController.createAccommodation(req, res);
        });

        it('should handle error during accommodation creation', async () => {
            Accommodation.create = () => {
                throw new Error('Database error');
            };

            const req = {
                body: {
                    name: 'Test Accommodation',
                    // Add other relevant properties
                },
            };
            const res = {
                status: (statusCode) => {
                    assert.strictEqual(statusCode, 500);
                    return res;
                },
                json: (data) => {
                    assert.deepStrictEqual(data, { error: 'Failed to create accommodation' });
                },
            };

            await accommodationController.createAccommodation(req, res);
        });
    });

    describe('updateAccommodation', () => {
        it('should update an existing accommodation', async () => {
            const mockAccommodation = {
                id: 1,
                name: 'Updated Accommodation',
                // Add other relevant properties
            };

            Accommodation.findByPk = async (id) => {
                assert.strictEqual(id, '1');

                return Promise.resolve(mockAccommodation);
            };

            Accommodation.prototype.save = async () => {
                return Promise.resolve();
            };

            const req = {
                params: { id: '1' },
                body: {
                    name: 'Updated Accommodation',
                    // Add other relevant properties
                },
            };
            const res = {
                json: (data) => {
                    assert.deepStrictEqual(data, mockAccommodation);
                },
            };

            await accommodationController.updateAccommodation(req, res);
        });

        it('should handle non-existent accommodation during update', async () => {
            Accommodation.findByPk = async () => {
                return Promise.resolve(null);
            };

            const req = {
                params: { id: '1' },
                body: {
                    name: 'Updated Accommodation',
                    // Add other relevant properties
                },
            };
            const res = {
                status: (statusCode) => {
                    assert.strictEqual(statusCode, 404);
                    return res;
                },
                json: (data) => {
                    assert.deepStrictEqual(data, { error: 'Accommodation not found' });
                },
            };

            await accommodationController.updateAccommodation(req, res);
        });

        it('should handle error during accommodation update', async () => {
            const mockAccommodation = {
                id: 1,
                name: 'Updated Accommodation',
                // Add other relevant properties
            };

            Accommodation.findByPk = async () => {
                return Promise.resolve(mockAccommodation);
            };

            Accommodation.prototype.save = () => {
                throw new Error('Database error');
            };

            const req = {
                params: { id: '1' },
                body: {
                    name: 'Updated Accommodation',
                    // Add other relevant properties
                },
            };
            const res = {
                status: (statusCode) => {
                    assert.strictEqual(statusCode, 500);
                    return res;
                },
                json: (data) => {
                    assert.deepStrictEqual(data, { error: 'Failed to update accommodation' });
                },
            };

            await accommodationController.updateAccommodation(req, res);
        });
    });

    describe('deleteAccommodation', () => {
        it('should delete an existing accommodation', async () => {
            const mockAccommodation = {
                id: 1,
                name: 'Test Accommodation',
                // Add other relevant properties
            };

            Accommodation.findByPk = async (id) => {
                assert.strictEqual(id, '1');

                return Promise.resolve(mockAccommodation);
            };

            Accommodation.prototype.destroy = async () => {
                return Promise.resolve();
            };

            const req = {
                params: { id: '1' },
            };
            const res = {
                json: (data) => {
                    assert.deepStrictEqual(data, { message: 'Accommodation deleted successfully' });
                },
            };

            await accommodationController.deleteAccommodation(req, res);
        });

        it('should handle non-existent accommodation during deletion', async () => {
            Accommodation.findByPk = async () => {
                return Promise.resolve(null);
            };

            const req = {
                params: { id: '1' },
            };
            const res = {
                status: (statusCode) => {
                    assert.strictEqual(statusCode, 404);
                    return res;
                },
                json: (data) => {
                    assert.deepStrictEqual(data, { error: 'Accommodation not found' });
                },
            };

            await accommodationController.deleteAccommodation(req, res);
        });

        it('should handle error during accommodation deletion', async () => {
            const mockAccommodation = {
                id: 1,
                name: 'Test Accommodation',
                // Add other relevant properties
            };

            Accommodation.findByPk = async () => {
                return Promise.resolve(mockAccommodation);
            };

            Accommodation.prototype.destroy = () => {
                throw new Error('Database error');
            };

            const req = {
                params: { id: '1' },
            };
            const res = {
                status: (statusCode) => {
                    assert.strictEqual(statusCode, 500);
                    return res;
                },
                json: (data) => {
                    assert.deepStrictEqual(data, { error: 'Failed to delete accommodation' });
                },
            };

            await accommodationController.deleteAccommodation(req, res);
        });
    });

    describe('searchAccommodations', () => {
        it('should return matching accommodations based on search criteria', async () => {
            const mockAccommodations = [
                {
                    id: 1,
                    name: 'Accommodation 1',
                    // Add other relevant properties
                },
                {
                    id: 2,
                    name: 'Accommodation 2',
                    // Add other relevant properties
                },
            ];

            Accommodation.findAll = async (searchQuery) => {
                assert.deepStrictEqual(searchQuery.where, {
                    location: 'Addis Ababa',
                    type: 'Hotel',
                    pricePerNight: 100,
                });

                return Promise.resolve(mockAccommodations);
            };

            const req = {
                query: {
                    location: 'Addis Ababa',
                    type: 'Hotel',
                    price: 100,
                },
            };
            const res = {
                json: (data) => {
                    assert.deepStrictEqual(data, mockAccommodations);
                },
            };

            await accommodationController.searchAccommodations(req, res);
        });

        it('should handle error during accommodation search', async () => {
            Accommodation.findAll = () => {
                throw new Error('Database error');
            };

            const req = {
                query: {
                    location: 'Addis Ababa',
                    type: 'Hotel',
                    price: 100,
                },
            };
            const res = {
                status: (statusCode) => {
                    assert.strictEqual(statusCode, 500);
                    return res;
                },
                json: (data) => {
                    assert.deepStrictEqual(data, { error: 'Failed to search accommodations' });
                },
            };

            await accommodationController.searchAccommodations(req, res);
        });
    });
});
