module.exports = function (attribute, value, test) {
    if (value === undefined) {
        return '';
    }

    return value === test ? attribute : '';
};