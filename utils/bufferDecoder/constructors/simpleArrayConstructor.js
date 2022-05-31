const simpleArrayConstructor = (startI, buffer) => {
	const result = {endIndex: null, result: null};
	let arrayValue = null;
	let startIndex = null;

	for (let i = startI; i <= buffer.length - 1; i++) {
		if (i <= startI && !result.result && buffer[i] === '[') {
			result.result = [];
		} else if (
			i >= 1 &&
			buffer[i] !== '[' &&
			buffer[i] !== ']' &&
			buffer[i] !== '/' &&
			buffer[i] !== ':' &&
			buffer[i] !== ',' &&
			buffer[i] !== '"'
		) {
			if (!arrayValue) {
				arrayValue = buffer[i];
			} else {
				arrayValue += buffer[i];
			}
		} else if (
			(i > 1 && buffer[i] === ',' && buffer[i + 1] === '"') ||
			(i > 1 && buffer[i] === ']')
		) {

			result.result.push(arrayValue);
			startIndex = i;
			arrayValue = null;

			if (buffer[i] === ']') {
				break;
			}
		}
	}
	result.endIndex = startIndex;
	return result;
};

module.exports = simpleArrayConstructor;
