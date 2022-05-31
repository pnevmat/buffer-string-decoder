const arrayConstructor = require('../constructors/arrayConstructor');
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
		} else if (i <= 2 && result && buffer[i] === '[') {
			isArrayOfArray = true;
			break;
		} else if (i <= 2 && result && buffer[i] === '{') {
			isArrayOfObjects = true;
			startIndex = 0;
			endIndex = buffer.length - 2;
			break;
		}
	}

	if (isArrayOfObjects && startIndex === 0 && endIndex) {
		result = [...arrayConstructor(startIndex, endIndex, buffer).result];
	} else if (isArray && !isArrayOfArray && !isArrayOfObjects && !isObject) {
		result = [...simpleArrayConstructor(startIndex, buffer).result];
	} else if (isArrayOfArray) {
		result =
			'You have passed an array of array to decoder, pass array of objects instead';
	}

	return result;
};

module.exports = arrayHandler;
