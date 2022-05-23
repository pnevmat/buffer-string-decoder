const arrayConstructor = require('../constructors/arrayConstructor');
const objectConstructor = require('../constructors/objectConstructor');
const simpleArrayConstructor = require('../constructors/simpleArrayConstructor');

const arrayHandler = (buffer) => {
	let result = null;
	let isArray = false;
	let isObject = false;
	let isArrayOfArray = false;
	let isArrayOfObjects = false;
	let startIndex = 0;
	let endIndex = 0;

	for (let i = 0; i <= buffer.length - 1; i++) {
		if (i <= 1 && !result && buffer[i] === '[') {
			result = [];
			isArray = true;
		} else if (i === 0 && !result && buffer[i] === '{') {
			result = {};
			isObject = true;
		} else if (i <= 2 && result && buffer[i] === '[') {
			isArrayOfArray = true;
			startIndex = i;
			endIndex = buffer.length - 2;
			break;
		} else if (i <= 2 && result && buffer[i] === '{') {
			isArrayOfObjects = true;
			startIndex = 0;
			endIndex = buffer.length - 2;
			break;
		}
	}

	if (
		(isArrayOfArray && startIndex && endIndex) ||
		(isArrayOfObjects && startIndex === 0 && endIndex)
	) {
		// debugger;
		// console.log('Array constructor started');
		result = [...arrayConstructor(startIndex, endIndex, buffer).result];
		// console.log('Result of array constractor in array handler: ', result);
	} else if (isArray && !isArrayOfArray && !isArrayOfObjects && !isObject) {
		// console.log('Simple array constructor started');
		result = [...simpleArrayConstructor(buffer)];
		// console.log('Result of simple array constractor in array handler: ', result);
	} else if (isObject && !isArrayOfObjects && !isArrayOfArray && !isArray) {
		// console.log('Object constructor started');
		result = objectConstructor(startIndex, endIndex, buffer);
		// console.log('Result of object constractor in array handler: ', result);
	}

	// console.log('Result of arrayHandler: ', result);
	return result;
};

module.exports = arrayHandler;
