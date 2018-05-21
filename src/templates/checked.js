module.exports = function (value, test) {
    if (value == undefined) {
        return '';
    }

    return value == test ? 'checked' : '';
};