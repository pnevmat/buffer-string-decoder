const objectValueValidator = (i, isObjectValue, buffer) => {
	if (
		i > 1 &&
		isObjectValue &&
		buffer[i] !== ',' &&
		buffer[i] !== '"' &&
		buffer[i] !== '}'
	) {
		return true;
	} else {
		return false;
	}
};

module.exports = objectValueValidator;
