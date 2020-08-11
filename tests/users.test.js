const app = require('../index');
const supertest = require('supertest');
const request = supertest(app);

describe('POST user information', () => {
    it('200 success on sending valid information', async done => {
        const res = await request.post('/api/users/register')
            .send({
                "name": "sunny",
                "email": "abc@zyxab.com",
                "passowrd": "123456",
                "age": 10
            })
            .set('Accept', 'application/json');
        expect(res.status).toBe(200);
        done();
    })

    it('400 error on sending invalid information', async done => {
        const res = await request.post('/api/users/register')
            .send({
                "name": "su",
                "email": "abc@zyx.com",
                "passowrd": "123456",
                "age": 10
            })
            .set('Accept', 'application/json');
        expect(res.status).toBe(400);
        done();
    })

    it('400 success on not having unique email information', async done => {
        const res = await request.post('/api/users/register')
            .send({
                "name": "sunny",
                "email": "abc@zyx.com",
                "passowrd": "123456",
                "age": 10
            })
            .set('Accept', 'application/json');
        expect(res.status).toBe(400);
        done();
    })

})

describe('POST login information', () => {
    it('200 on sending perfect email and password', async done => {
        const res = await request.post('/api/users/login')
            .send({
                "email": "abc@zyxab.com",
                "password": "123456"
            })
            .set('Accept', 'application/json');

        expect(res.status).toBe(200);
        done();
    })

    it('400 on sending invalid email or passowrd', async done => {
        const res = await request.post('/api/users/login')
            .send({
                "email": "a@xyxz.com",
                "password": "123456"
            })
            .set('Accept', 'application/json');

        expect(res.status).toBe(400);
        done();
    })
    it('400 on sending invalid email or passowrd', async done => {
        const res = await request.post('/api/users/login')
            .send({
                "email": "abc@xyxz.com",
                "password": "123456abc"
            })
            .set('Accept', 'application/json');

        expect(res.status).toBe(400);
        done();
    })
    it('400 on sending invalid email or passowrd', async done => {
        const res = await request.post('/api/users/login')
            .send({
                "email": "abc",
                "password": "123456"
            })
            .set('Accept', 'application/json');

        expect(res.status).toBe(400);
        done();
    })
})