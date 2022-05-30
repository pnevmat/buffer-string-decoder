const ArrayAndObjectResolver = require('../utils/ArrayAndObjectResolver');

const arrayConstructor = (startI, endI, buffer) => {
	// debugger;
	// console.log('Buffer in array constructor and recursion: ', buffer);
	// console.log('Start index in array constructor: ', startI);
	// console.log('End index in array constructor: ', endI);
	// console.log('Buffer end index in array constructor: ', buffer.length - 1);
	const result = {endIndex: null, result: null};

	let startIndex = startI;

	for (let i = startI; i <= endI; i++) {
		if (i <= startIndex && !result.result && buffer[i] === '[') {
			result.result = [];
		} else if (
			(i <= startIndex && !result.result && buffer[i] === '{') ||
			(i >= startIndex && result.result && buffer[i] === '{')
		) {
			startIndex = i;
			// debugger;
			const resolver = new ArrayAndObjectResolver(buffer);
			const resultOfObjectConstructor = resolver.objectConstructor(startIndex);
			result.result.push(resultOfObjectConstructor.result);
			// console.log('Result after push of object constructor: ', result);

			startIndex = resultOfObjectConstructor.endIndex;
			result.endIndex = startIndex;
			break;
		}
	}

	console.log('Result of arrayConstructor: ', result);
	return result;
};

module.exports = arrayConstructor;
