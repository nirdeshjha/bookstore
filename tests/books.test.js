const app = require('../index');
const supertest = require('supertest');
const request = supertest(app);

const myToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMwZTUwOWMxN2NjZjNjNDRjN2Y1OTUiLCJpYXQiOjE1OTcwMzk4ODF9.6_qA8QHYQaQD7DDeLeCBrp0bwVBBgOGXV4bW1IKl9Ns';

describe('GET ', () => {
    it('list of all book', async done => {
        const res = await request.get('/api/books/all-books')
            .set('x-auth-token', myToken);
        expect(res.status).toBe(200);
        done();
    })
    it('count of all books', async done => {
        const res = await request.get('/api/books/all-books?number=true')
            .set('x-auth-token', myToken);
        expect(res.status).toBe(200);
        done();
    })

    it('Inavlid token', async done => {
        const res = await request.get('/api/books/all-books?number=true')
            .set('x-auth-token', myToken + 'i');
        expect(res.status).toBe(400);
        done();
    })

    it('No token provided', async done => {
        const res = await request.get('/api/books/all-books?number=true');
        expect(res.status).toBe(401);
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
            .set('x-auth-token', myToken)
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
            .set('Accept', 'application/json')
            .set('x-auth-token', myToken);
        expect(res.status).toBe(400);
        done();
    })
})

describe('GET books based on specific query', () => {
    it('response on valid genre', async done => {
        const res = await request.get('/api/books/?genre=action')
            .set('x-auth-token', myToken);
        expect(res.status).toBe(200);
        done();
    })
    it('response on valid author', async done => {
        const res = await request.get('/api/books/?author=uahb.jabefjjkaef')
            .set('x-auth-token', myToken);
        expect(res.status).toBe(200);
        done();
    })
    it('response on valid title', async done => {
        const res = await request.get('/api/books/?title=book3')
            .set('x-auth-token', myToken);

        expect(res.status).toBe(200);
        done();
    })
    it('response on invalid auhtor', async done => {
        const res = await request.get('/api/books/?author=abcd')
            .set('x-auth-token', myToken);

        expect(res.status).toBe(404);
        done();
    })
    it('response on invalid title', async done => {
        const res = await request.get('/api/books/?title=abcd')
            .set('x-auth-token', myToken);
        expect(res.status).toBe(404);
        done();
    })
    it('response on invalid genre', async done => {
        const res = await request.get('/api/books/?genre=abcd')
            .set('x-auth-token', myToken);
        expect(res.status).toBe(404);
        done();
    })
    it('response on valid author', async done => {
        const res = await request.get('/api/books/?regexAuthor=uahb')
            .set('x-auth-token', myToken);
        expect(res.status).toBe(200);
        done();
    })
    it('response on invalid author', async done => {
        const res = await request.get('/api/books/?regexAuthor=xyz')
            .set('x-auth-token', myToken);
        expect(res.status).toBe(404);
        done();
    })

    it('Inavlid token', async done => {
        const res = await request.get('/api/books/?genre=abcd')
            .set('x-auth-token', 'eyJhbGcOiJIUzI1sInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMwZTUwOWMxN2NjZjNjNDRjN2Y1OTUiLCJpYXQiOjE1OTcwMzk4ODF9.6_qA8QHYQaQD7DDeLeCBrp0bwVBBgOGXV4bW1IKl9Ns');
        expect(res.status).toBe(400);
        done();
    })

    it('No token provided', async done => {
        const res = await request.get('/api/books/?genre=abcd');
        expect(res.status).toBe(401);
        done();
    })
})

describe('UPDATE books based on specific query', () => {
    it('404 error on invalid id', async done => {
        const res = await request.put('/api/books/5f304a37c03606a8d34c53d1/')
            .set('x-auth-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMwY2UzZjMwMTUxMTIzMTZmY2RiMTQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1OTczOTAxNTh9.VjRqO7qnSqTMhFGsTfxHBLModMJPGwSSI-TB7ESAfFk");
        expect(res.status).toBe(404);
        done();
    })
    it('404 error on invalid author', async done => {
        const res = await request.put('/api/books/5f2fceaf5399e65f2d751a1b/?changeAuthor=ab')
            .set('x-auth-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMwY2UzZjMwMTUxMTIzMTZmY2RiMTQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1OTczOTAxNTh9.VjRqO7qnSqTMhFGsTfxHBLModMJPGwSSI-TB7ESAfFk");
        expect(res.status).toBe(404);
        done();
    })
    it('404 error on invalid title', async done => {
        const res = await request.put('/api/books/5f2fceaf5399e65f2d751a1b/?changeTitle=book')
            .set('x-auth-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMwY2UzZjMwMTUxMTIzMTZmY2RiMTQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1OTczOTAxNTh9.VjRqO7qnSqTMhFGsTfxHBLModMJPGwSSI-TB7ESAfFk");
        expect(res.status).toBe(404);
        done();
    })
    it('200 success on valid title', async done => {
        const res = await request.put('/api/books/5f2fceaf5399e65f2d751a1b/?changeTitle=book4')
            .set('x-auth-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMwY2UzZjMwMTUxMTIzMTZmY2RiMTQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1OTczOTAxNTh9.VjRqO7qnSqTMhFGsTfxHBLModMJPGwSSI-TB7ESAfFk");
        expect(res.status).toBe(200);
        done();
    })
    it('200 success on valid author', async done => {
        const res = await request.put('/api/books/5f2fceaf5399e65f2d751a1b/?changeAuthor=abcdef')
            .set('x-auth-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMwY2UzZjMwMTUxMTIzMTZmY2RiMTQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1OTczOTAxNTh9.VjRqO7qnSqTMhFGsTfxHBLModMJPGwSSI-TB7ESAfFk");
        expect(res.status).toBe(200);
        done();
    })
    it('200 success on valid price', async done => {
        const res = await request.put('/api/books/5f2fceaf5399e65f2d751a1b/?changePrice=10')
            .set('x-auth-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMwY2UzZjMwMTUxMTIzMTZmY2RiMTQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1OTczOTAxNTh9.VjRqO7qnSqTMhFGsTfxHBLModMJPGwSSI-TB7ESAfFk");
        expect(res.status).toBe(200);
        done()
    })
})

/*describe('DELETE based on a given bookID', () => {
    it('404 on ivalid Id', async done => {
        const res = await request.delete('/api/books/5f30f22ba133894a5de57102')
            .set('x-auth-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMwY2UzZjMwMTUxMTIzMTZmY2RiMTQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1OTczOTAxNTh9.VjRqO7qnSqTMhFGsTfxHBLModMJPGwSSI-TB7ESAfFk");

        expect(res.status).toBe(404);
        done();
    })
    it('200 on valid Id', async done => {
        const res = await request.delete('/api/books/5f3638de946d1752393ce8b1')
            .set('x-auth-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMwY2UzZjMwMTUxMTIzMTZmY2RiMTQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1OTczOTAxNTh9.VjRqO7qnSqTMhFGsTfxHBLModMJPGwSSI-TB7ESAfFk");

        expect(res.status).toBe(200);
        done();
    })
})*/