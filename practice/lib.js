function absolute(x) {
    /*if (x < 0) return -1 * x;
    if (x >= 0) return x;*/
    return (x >= 0) ? x : -x;
}

module.exports.greet = function (name) {
    return 'hello ' + name;
}

module.exports.genreOfBooks = function () {
    return ['action', 'romantic', 'comedy', 'thriller'];
}

module.exports.book = function () {
    const book1 = {
        'name': 'Harry Potter',
        'author': 'J K Rowling',
        'genre': 'Action',
        'age_range': 15
    }
    return book1;
}


module.exports.abs = absolute;