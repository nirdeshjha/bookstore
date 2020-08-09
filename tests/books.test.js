const app = require('../index');
const supertest = require('supertest');
const request = supertest(app);


describe('GET ', () => {
    it('list of all book', async done => {
        const res = await request.get('/api/books/all-books');
        expect(res.status).toBe(200);
        done();
    })
    it('count of all books', async done => {
        const res = await request.get('/api/books/all-books?number=true');
        expect(res.status).toBe(200);
        done();
    })
})

describe('POST /insert-book', () => {
    it('response  with 200 created', async done => {
        const res = await request
            .post('/api/books/insert-book')
            .send({
                "title": "book3",
                "author": "uahb.jabefjjkaef",
                "genre": ["action"],
                "ageAppropriationRange": 10,
                "numberOfCopies": 4,
                "rentalRate": 10
            })
            .set('Accept', 'application/json');
        expect(res.status).toBe(200);
        done();
    })
    it('response with 400 rejected', async done => {
        const res = await request
            .post('/api/books/insert-book')
            .send({
                "title": "bo",
                "author": "uahb.jabefjjkaef",
                "genre": ["action"],
                "ageAppropriationRange": 10,
                "numberOfCopies": 4,
                "rentalRate": 10
            })
            .set('Accept', 'application/json');
        expect(res.status).toBe(400);
        done();
    })
})

describe('GET books based on specific query', () => {
    it('response on valid genre', async done => {
        const res = await request.get('/api/books/?genre=action');
        expect(res.status).toBe(200);
        done();
    })
    it('response on valid author', async done => {
        const res = await request.get('/api/books/?author=uahb.jabefjjkaef');
        expect(res.status).toBe(200);
        done();
    })
    it('response on valid title', async done => {
        const res = await request.get('/api/books/?title=book3');
        expect(res.status).toBe(200);
        done();
    })
    it('response on invalid auhtor', async done => {
        const res = await request.get('/api/books/?author=abcd');
        expect(res.status).toBe(404);
        done();
    })
    it('response on invalid title', async done => {
        const res = await request.get('/api/books/?title=abcd');
        expect(res.status).toBe(404);
        done();
    })
    it('response on invalid genre', async done => {
        const res = await request.get('/api/books/?genre=abcd');
        expect(res.status).toBe(404);
        done();
    })
    it('response on valid author', async done => {
        const res = await request.get('/api/books/?regexAuthor=uahb');
        expect(res.status).toBe(200);
        done();
    })
    it('response on invalid author', async done => {
        const res = await request.get('/api/books/?regexAuthor=xyz');
        expect(res.status).toBe(404);
        done();
    })
})

describe('UPDATE books based on specific query', () => {
    it('404 error on invalid id', async done => {
        const res = await request.put('/api/books/5f30496c725306a717c1e34e');
        expect(res.status).toBe(404);
        done();
    })
    it('404 error on invalid author', async done => {
        const res = await request.put('/api/books/5f30496c725306a717c1e34f/?changeAuthor=ab');
        expect(res.status).toBe(404);
        done();
    })
    it('404 error on invalid title', async done => {
        const res = await request.put('/api/books/5f30496c725306a717c1e34f/?changeTitle=book');
        expect(res.status).toBe(404);
        done();
    })
    it('200 success on valid title', async done => {
        const res = await request.put('/api/books/5f30496c725306a717c1e34f/?changeTitle=book4');
        expect(res.status).toBe(200);
        done();
    })
    it('200 success on valid author', async done => {
        const res = await request.put('/api/books/5f30496c725306a717c1e34f/?changeAuthor=abcdef');
        expect(res.status).toBe(200);
        done();
    })
    it('200 success on valid price', async done => {
        const res = await request.put('/api/books/5f30496c725306a717c1e34f/?changePrice=10');
        expect(res.status).toBe(200);
        done()
    })
})

describe('DELETE based on a given bookID', () => {
    it('404 on ivalid Id', async done => {
        const res = await request.delete('/api/books/5f30496c725306a717c1e34e');
        expect(res.status).toBe(404);
        done();
    })
    it('200 on valid Id', async done => {
        const res = await request.delete('/api/books/5f304a37c03606a8d34c53d1');
        expect(res.status).toBe(200);
        done();
    })
})