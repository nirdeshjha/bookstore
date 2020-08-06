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

test('greeting - returns greeting message to the user', () => {
    const result = lib.greet('nirdesh');
    expect(result).toBe('hello nirdesh');
})