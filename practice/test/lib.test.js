const lib = require('../lib');
const {
    TestScheduler
} = require("jest");

describe('absolute', () => {
    it("returns the number itself if number is greater than or equal to 0", () => {
        const result = lib.abs(0);
        expect(result).toBe(0);
    })

    it('returns positive number if number is negative', () => {
        const result = lib.abs(-1);
        expect(result).toBe(1);
    })
})

describe('greetings', () => {
    it('greeting - returns greeting message to the user', () => {
        const result = lib.greet('nirdesh');
        expect(result).toBe('hello nirdesh');
    })
})

test('return genre of books', () => {
    const result = lib.genreOfBooks();
    //expect(result).toEqual(['action', 'romantic', 'comedy', 'thriller']);
    expect(result).toContain('action');
})


test('returns format of a book', () => {
    const result = lib.book();
    /*expect(result).toEqual({
        'name': 'Harry Potter',
        'author': 'J K Rowling',
        'genre': 'Action',
        'age_range': 15
    })*/
    /*expect(result).toMatchObject({
        'name': 'Harry Potter',
        'author': 'J K Rowling',
        'genre': 'Action',
        'age_range': 15
    })*/
    expect(result).toHaveProperty('age_range', 15);
})