const objectHandler = (buffer) => {
	let result = null;
	let objectProperty = null;
	let objectValue = null;
	let isObjectValue = false;

	for (let i = 0; i <= buffer.length - 1; i++) {
		if (i <= 1 && buffer[i] === '{') {
			result = {};
		} else if (
			i > 1 &&
			buffer[i] !== '{' &&
			buffer[i] !== '}' &&
			buffer[i] !== '/' &&
			buffer[i] !== ':' &&
			buffer[i] !== ',' &&
			buffer[i] !== '"' &&
			!isObjectValue
		) {
			if (!objectProperty) {
				objectProperty = buffer[i];
			} else {
				objectProperty += buffer[i];
			}
		} else if (i > 1 && buffer[i] === ':') {
			isObjectValue = true;
		} else if (
			i > 1 &&
			isObjectValue &&
			buffer[i] !== ',' &&
			buffer[i] !== '"' &&
			buffer[i] !== '}'
		) {
			if (!objectValue) {
				objectValue = buffer[i];
			} else {
				objectValue += buffer[i];
			}
		} else if (
			(i > 1 && buffer[i] === ',' && i < buffer.length - 1) ||
			(i > 1 && buffer[i] === '}' && i === buffer.length - 1)
		) {
			result[objectProperty] = objectValue;

			objectProperty = null;
			objectValue = null;
			isObjectValue = false;
		}
	}

	return result;
};

module.exports = objectHandler;
