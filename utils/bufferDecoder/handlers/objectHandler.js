const objectHandler = (buffer) => {
	let result = null;
	let objectProperty = null;
	let objectValue = null;
	let isObjectValue = false;

	for (let i = 0; i <= buffer.length - 1; i++) {
		console.log('Buffer item: ', buffer[i]);
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
				console.log('Object property: ', objectProperty);
			} else {
				objectProperty += buffer[i];
				console.log('Object property: ', objectProperty);
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
				console.log('Object value: ', objectValue);
			} else {
				objectValue += buffer[i];
				console.log('Object value: ', objectValue);
			}
		} else if (
			(i > 1 && buffer[i] === ',' && i < buffer.length - 1) ||
			(i > 1 && buffer[i] === '}' && i === buffer.length - 1)
		) {
			console.log('Index of iterator: ', i);
			console.log('Buffer end index: ', buffer.length - 1);
			console.log('Object property: ', objectProperty);
			result[objectProperty] = objectValue;
			objectProperty = null;
			objectValue = null;
			isObjectValue = false;
		}
	}
	console.log('Result of objectHandler: ', result);
	return result;
};

module.exports = objectHandler;
