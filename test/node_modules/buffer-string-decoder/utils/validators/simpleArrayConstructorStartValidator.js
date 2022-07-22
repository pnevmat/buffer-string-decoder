const simpleArrayConstructorStartValidator = (
	i,
	startIndex,
	result,
	buffer,
) => {
	if (
		(i >= startIndex && result.result && buffer[i] === '"') ||
		(i >= startIndex &&
			result.result &&
			typeof Number(buffer[i]) === 'number' &&
			buffer[i] !== ',' &&
			buffer[i] !== '}' &&
			buffer[i] !== ']')
	) {
		return true;
	} else {
		return false;
	}
};

module.exports = simpleArrayConstructorStartValidator;
