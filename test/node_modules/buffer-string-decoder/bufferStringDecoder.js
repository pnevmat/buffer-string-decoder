const ArrayAndObjectResolver = require('./resolvers/ArrayAndObjectResolver');

const bufferStringDecoder = (buffer) => {
	if (typeof buffer !== 'string') {
		return 'You need to provide stringified entity to bufferDecoder';
	}

	let result = null;
	let isArrayOfArray = false;
	let startIndex = 0;
	const resolver = new ArrayAndObjectResolver(buffer);

	for (let i = 0; i <= buffer.length - 1; i++) {
		if (i <= 2 && result && buffer[i] === '[') {
			isArrayOfArray = true;
			break;
		} else if (i >= 3 && result) {
			break;
		}
	}

	if (buffer[0] === '[' || buffer[1] === '[') {
		result = resolver.arrayConstructor(startIndex).result;
		return result;
	} else if (buffer[0] === '{' || buffer[1] === '{') {
		result = resolver.objectConstructor(startIndex).result;
		return result;
	} else if (isArrayOfArray) {
		result =
			'You have passed an array of array to decoder, pass array of objects instead';
	} else {
		result = buffer;
		return result;
	}
};

module.exports = bufferStringDecoder;
