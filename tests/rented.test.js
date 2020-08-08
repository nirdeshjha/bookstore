const app = require('../index');
const supertest = require('supertest');
const request = supertest(app);

describe('information about rented books', () => {
    it('returns list of all the rented books', async done => {
        const res = await request.get('/api/rented/all-rented-books');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            'name': 'nirdesh'
        })
        done();
    })
})

describe('information about rented books by a specific user', () => {
    it('returns list of book rented by a user', async done => {
        const res = await request.get('/api/rented/:1/all-rented-books');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            'name': 'nirdesh'
        })
        done();
    })
    it('returns error if the given id is not valid', async done => {
        const res = await request.get('/api/rented/:2/all-rented-books');
        expect(res.status).toBe(404);
        done();
    })
})