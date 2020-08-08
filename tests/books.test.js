const app = require('../index');
const supertest = require('supertest');
const request = supertest(app);


describe('testing all the books endpoint', () => {
    it('returns the list of all the books', async done => {
        const res = await request.get('/api/books/all-books');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            'name': 'nirdesh'
        });
        done();
    })
})

describe('testing particular book on basis of given id', () => {
    it('returns a specific book', async done => {
        const res = await request.get('/api/books/:1');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('author', "J K Rowling");
        done();
    })
})

describe('testing books on query', () => {
    it('returns a book of a spec', async done => {
        const res = await request.get('/api/books/?author=J K Rowling');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('author', 'J K Rowling');
        done();
    })
    it('the given author is not valid', async done => {
        const res = await request.get('/api/books/?author=J Rowling');
        expect(res.status).toBe(404);
        done();
    })
})