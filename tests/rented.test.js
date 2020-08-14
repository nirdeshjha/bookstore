const app = require('../index');
const supertest = require('supertest');
const {
    TokenExpiredError
} = require('jsonwebtoken');
const request = supertest(app);

describe('GET ', () => {
    it('returns list of all the rented books', async done => {
        const res = await request.get('/api/rented/all-rented-books')
            .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMwZTUwOWMxN2NjZjNjNDRjN2Y1OTUiLCJpYXQiOjE1OTcwMzk4ODF9.6_qA8QHYQaQD7DDeLeCBrp0bwVBBgOGXV4bW1IKl9Ns');
        expect(res.status).toBe(200);
        done();
    })

    it('401 if token is not provided', async done => {
        const res = await request.get('/api/rented/all-rented-books');
        expect(res.status).toBe(401);
        done();
    })

    it('400 if  wrong token is provided', async done => {
        const res = await request.get('/api/rented/all-rented-books')
            .set('x-auth-token', '123');
        expect(res.status).toBe(400);
        done();
    })
})

describe('GET', () => {
    it('200 if a valid user', async done => {
        const res = await request.get('/api/rented/total-cost-between/?fromDate=12-08-2020&toDate=12-08-2020')
            .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMwZTUwOWMxN2NjZjNjNDRjN2Y1OTUiLCJpYXQiOjE1OTcwMzk4ODF9.6_qA8QHYQaQD7DDeLeCBrp0bwVBBgOGXV4bW1IKl9Ns');
        expect(res.status).toBe(200);
        done();
    })

    it('400 if invalid token is provided', async done => {
        const res = await request.get('/api/rented/total-cost-between/?fromDate=12-08-2020&toDate=12-08-2020')
            .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMwZTUOWMxN2NjZjNjNDRjN2Y1OTUiLCJpYXQiOjE1OTcwMzk4ODF9.6_qA8QHYQaQD7DDeLeCBrp0bwVBBgOGXV4bW1IKl9Ns');
        expect(res.status).toBe(400);
        done();
    })

    it('401 if no token is provided', async done => {
        const res = await request.get('/api/rented/total-cost-between/?fromDate=12-08-2020&toDate=12-08-2020');
        expect(res.status).toBe(401);
        done();
    })
})