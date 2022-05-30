const ArrayAndObjectResolver = require('../utils/ArrayAndObjectResolver');

const arrayConstructor = (startI, endI, buffer) => {
	const result = {endIndex: null, result: null};

	let startIndex = startI;

	for (let i = startI; i <= endI; i++) {
		if (i <= startIndex && !result.result && buffer[i] === '[') {
			result.result = [];
		} else if (i <= startIndex && result.result) {
			continue;
		} else if (
			(i <= startIndex && !result.result && buffer[i] === '{') ||
			(i >= startIndex && result.result && buffer[i] === '{')
		) {
			startIndex = i;

			const resolver = new ArrayAndObjectResolver(buffer);
			const resultOfObjectConstructor = resolver.objectConstructor(startIndex);
			result.result.push(resultOfObjectConstructor.result);

			startIndex = resultOfObjectConstructor.endIndex;
			result.endIndex = startIndex;

			if (buffer.length === result.endIndex) {
				break;
			} else {
				continue;
			}
		}
	}

	return result;
};

module.exports = arrayConstructor;
