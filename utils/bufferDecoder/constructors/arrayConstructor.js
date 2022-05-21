const ArrayAndObjectResolver = require('../utils/ArrayAndObjectResolver');
const arrayOfObjectsEndIndexHandler = require('../utils/arrayOfObjectsEndIndexHandler');

const arrayConstructor = (startI, endI, buffer) => {
	// console.log('Buffer in array constructor and recursion: ', buffer);
	// console.log('Start index in array constructor: ', startI);
	// console.log('End index in array constructor: ', endI);
	// console.log('Buffer end index in array constructor: ', buffer.length - 1);
	const result = {passedSteps: null, result: null};
	let subBuffer = null;
	let startIndex = startI;
	let endIndex = 0;
	// let simpleArrStartIndex = 0;

	for (let i = startI; i <= endI; i++) {
		if (i <= startIndex && !result.result && buffer[i] === '[') {
			result.result = [];
		} else if (
			(i <= startIndex && !result.result && buffer[i] === '{') ||
			(i >= startIndex && result.result && buffer[i] === '{')
		) {
			startIndex = i;
			endIndex = arrayOfObjectsEndIndexHandler(i, endI, buffer);

			for (let index = startIndex; index <= endIndex; index++) {
				if (!subBuffer) {
					subBuffer = buffer[index];
				} else {
					subBuffer += buffer[index];
				}
			}

			if (subBuffer) {
				const resolver = new ArrayAndObjectResolver(
					startIndex,
					endIndex,
					subBuffer,
				);
				const resultOfObjectConstructor = resolver.objectConstructor(
					startIndex,
					endIndex,
					subBuffer,
				);

				result.result.push(resultOfObjectConstructor.result);
				// console.log('Result after push of object constructor: ', result);
				subBuffer = null;
				break;
			}
		}
	}

	console.log('Result of arrayConstructor: ', result);
	return result;
};

module.exports = arrayConstructor;
