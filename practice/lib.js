function absolute(x) {
    /*if (x < 0) return -1 * x;
    if (x >= 0) return x;*/
    return (x >= 0) ? x : -x;
}

module.exports.greet = function (name) {
    return 'hello ' + name;
}

module.exports.abs = absolute;