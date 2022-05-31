const objectConstructorResultValidator = (
	i,
	objectProperty,
	objectValue,
	buffer,
) => {
	if (
		(i > 1 &&
			buffer[i] === ',' &&
			objectProperty &&
			objectValue &&
			buffer[i + 1] === '"') ||
		(i > 1 && buffer[i] === '}' && objectProperty && objectValue)
	) {
		return true;
	} else {
		return false;
	}
};

module.exports = objectConstructorResultValidator;
