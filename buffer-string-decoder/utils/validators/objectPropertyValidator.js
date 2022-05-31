const objectPropertyValidator = (i, isObjectValue, buffer) => {
	if (
		i > 1 &&
		buffer[i] !== '{' &&
		buffer[i] !== '}' &&
		buffer[i] !== ']' &&
		buffer[i] !== '/' &&
		buffer[i] !== ':' &&
		buffer[i] !== ',' &&
		buffer[i] !== '"' &&
		!isObjectValue
	) {
		return true;
	} else {
		return false;
	}
};

module.exports = objectPropertyValidator;
