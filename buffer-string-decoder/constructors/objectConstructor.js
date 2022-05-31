const ArrayAndObjectResolver = require('../utils/ArrayAndObjectResolver');
const arrayConstructor = require('./arrayConstructor');

const objectConstructor = (startI, endI, buffer) => {
	// весь код нужно переписать под объект в котором может быть массив или еще один объект
	// debugger;
	// const someResult = arrayConstructor(0, 1, buffer);
	// console.log('ArrayConstructor func test: ', someResult);
	let result = null;
	let objectProperty = null;
	let objectValue = null;

	let isObjectValue = false;
	let isObjectOfObjects = false;
	let isObjectOfArray = false;

	let startIndex = 0;
	let endIndex = 0;

	for (let i = startIndex; i <= endI; i++) {
		if (
			(i <= startI && buffer[i] === '{') ||
			(i <= startI + 1 && buffer[i] === '{')
		) {
			result = {};
		} else if (i > startI && buffer[i] === '{') {
			isObjectOfObjects = true;
			startIndex = i;
			endIndex = endI - 1;
			break;
		} else if (i > startI && buffer[i] === '[') {
			isObjectOfArray = true;
			startIndex = i;
			endIndex = endI - 1;
			break;
		}
	}

	for (let i = startI; i <= endI; i++) {
		// console.log('Buffer item: ', buffer[i]);
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
				// console.log('Object property: ', objectProperty);
			} else {
				objectProperty += buffer[i];
				// console.log('Object property: ', objectProperty);
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
			if (i > 1 && buffer[i] === '[') {
				startIndex = i;
				for (let index = i; index <= endI; index++) {
					if (buffer[index] === ']') {
						endIndex = index;
					}
				}
				const resolver = new ArrayAndObjectResolver(
					startIndex,
					endIndex,
					buffer,
				);
				objectValue = resolver.arrayConstructor(
					startIndex,
					endIndex,
					buffer,
				).result;
				result[objectProperty] = objectValue;
				objectProperty = null;
				objectValue = null;
				isObjectValue = false;
			} else if (i > 1 && buffer[i] === '{') {
				startIndex = i;
				for (let index = i; index <= endI; index++) {
					if (buffer[index] === '}') {
						endIndex = index;
					}
					objectValue = objectConstructor(startIndex, endIndex, buffer);
					result[objectProperty] = objectValue;
					objectProperty = null;
					objectValue = null;
					isObjectValue = false;
				}
			}

			if (!objectValue) {
				objectValue = buffer[i];
				// console.log('Object value: ', objectValue);
			} else {
				objectValue += buffer[i];
				// console.log('Object value: ', objectValue);
			}
		} else if (
			(i > 1 && buffer[i] === ',' && i < buffer.length - 1) ||
			(i > 1 && buffer[i] === '}' && i === buffer.length - 1)
		) {
			// console.log('Index of iterator: ', i);
			// console.log('Buffer end index: ', buffer.length - 1);
			// console.log('Object property: ', objectProperty);
			result[objectProperty] = objectValue;
			objectProperty = null;
			objectValue = null;
			isObjectValue = false;
		}
	}
	// console.log('Result of objectConstructor: ', result);
	return result;
};

module.exports = objectConstructor;
