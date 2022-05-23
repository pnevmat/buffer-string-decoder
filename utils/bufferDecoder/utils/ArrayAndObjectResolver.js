const arrayOfObjectsEndIndexHandler = require('./arrayOfObjectsEndIndexHandler');
// const simpleArrayConstructor = require('../constructors/simpleArrayConstructor');

class ArrayAndObjectResolver {
	constructor(startIndex, endIndex, buffer) {
		this.startI = startIndex;
		this.endI = endIndex;
		this.buffer = buffer;
	}

	arrayConstructor(startI, endI) {
		const result = {passedSteps: null, result: null};
		let subBuffer = null;
		let passedSteps = null;
		let startIndex = startI;
		let endIndex = 0;
		// let simpleArrStartIndex = 0;

		for (let i = startI; i <= endI; i++) {
			if (i <= startIndex && !result.result && this.buffer[i] === '[') {
				result.result = [];
			} else if (
				(i <= startIndex && !result.result && this.buffer[i] === '{') ||
				(i >= startIndex && result.result && this.buffer[i] === '{')
			) {
				startIndex = i;
				endIndex = arrayOfObjectsEndIndexHandler(i, endI, this.buffer);

				for (let index = startIndex; index <= endIndex; index++) {
					if (!subBuffer) {
						subBuffer = this.buffer[index];
					} else {
						subBuffer += this.buffer[index];
					}

					if (!passedSteps) {
						passedSteps = this.buffer[index];
					} else if (passedSteps[passedSteps.length - 1] === '}') {
						passedSteps += ',' + this.buffer[index];
					} else {
						passedSteps += this.buffer[index];
					}
					if (index === endIndex) {
						result.passedSteps = passedSteps;
					}
				}

				if (subBuffer) {
					if (this.buffer !== subBuffer) {
						startIndex = 0;
						endIndex = subBuffer.length - 1;
					}
					const resultOfObjectConstructor = this.objectConstructor(
						startIndex,
						endIndex,
						subBuffer,
					);
					result.result.push(resultOfObjectConstructor.result);
					// console.log('Result after push of object constructor: ', result);
					subBuffer = null;
				}
			}
		}
		// console.log('Result of array constructor in class: ', result);
		return result;
	}

	objectConstructor(startI, endI, buffer) {
		const result = {passedSteps: null, result: null};
		let objectProperty = null;
		let objectValue = null;
		let passedSteps = null;

		let isObjectValue = false;
		// let isObjectOfObjects = false;
		// let isObjectOfArray = false;

		let startIndex = 0;
		let endIndex = 0;

		for (let i = startIndex; i <= endI; i++) {
			if (
				(i <= startI && buffer[i] === '{') ||
				(i <= startI + 1 && buffer[i] === '{')
			) {
				result.result = {};
			} else if (i > startI && buffer[i] === '{') {
				// isObjectOfObjects = true;
				startIndex = i;
				endIndex = endI - 1;
				break;
			} else if (i > startI && buffer[i] === '[') {
				// isObjectOfArray = true;
				startIndex = i;
				endIndex = endI - 1;
				break;
			}
		}

		for (let i = startI; i <= endI; i++) {
			// console.log('Buffer item: ', buffer[i]);
			if (i <= 1 && buffer[i] === '{') {
				result.result = {};
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
				// debugger;
				if (!passedSteps) {
					passedSteps = buffer[i - 2];
					passedSteps += buffer[i - 1];
					passedSteps += buffer[i];
				} else {
					if (
						buffer[i - 1] === '{' ||
						buffer[i - 1] === '}' ||
						buffer[i - 1] === '/' ||
						buffer[i - 1] === ':' ||
						buffer[i - 1] === ',' ||
						buffer[i - 1] === '"'
					) {
						// new RegExp(/\W/).test(buffer[i - 2])
						if (/\W/.test(buffer[i - 2])) {
							passedSteps += buffer[i - 2];
						}
						passedSteps += buffer[i - 1];
					}
					passedSteps += buffer[i];
					// new RegExp(/\W/).test(buffer[i + 1])
					if (/\W/.test(buffer[i + 1])) {
						passedSteps += buffer[i + 1];
					}
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
							break;
						}
					}

					const arrayConstructorResult = this.arrayConstructor(
						startIndex,
						endIndex,
					);

					objectValue = arrayConstructorResult.result;
					result.result[objectProperty] = objectValue;

					if (!passedSteps) {
						passedSteps = arrayConstructorResult.passedSteps;
					} else {
						passedSteps +=
							buffer[i - 1] +
							buffer[i] +
							arrayConstructorResult.passedSteps +
							']}';
					}

					result.passedSteps = passedSteps;

					objectProperty = null;
					objectValue = null;
					isObjectValue = false;
					console.log('Buffer in array constructor of class: ', this.buffer);
					console.log(
						'Buffer length in array constructor of class: ',
						this.buffer.length,
					);
					console.log(
						'Passed steps length in array constructor of class: ',
						passedSteps.length,
					);
					console.log(
						'Passed steps in array constructor of class: ',
						passedSteps,
					);
					if (this.buffer.length === passedSteps.length) {
						break;
					}
				} else if (i > 1 && buffer[i] === '{') {
					startIndex = i;
					for (let index = i; index <= endI; index++) {
						if (this.buffer[index] === '}') {
							endIndex = index;
						}
						objectValue = this.objectConstructor(startIndex, endIndex);
						result.result[objectProperty] = objectValue;
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

				if (
					buffer[i - 1] === ',' ||
					buffer[i - 1] === '"' ||
					buffer[i - 1] === '}'
				) {
					passedSteps += buffer[i - 2];
					passedSteps += buffer[i - 1];
				}

				passedSteps += buffer[i];

				// new RegExp(/\W/).test(buffer[i + 1])
				if (/\W/.test(buffer[i + 1]) && buffer[i + 1] !== ' ') {
					passedSteps += buffer[i + 1];
				}
			} else if (
				(i > 1 && buffer[i] === ',' && i < buffer.length - 1) ||
				(i > 1 && buffer[i] === '}' && i === buffer.length - 1)
			) {
				// console.log('Index of iterator: ', i);
				// console.log('Buffer end index: ', buffer.length - 1);
				// console.log('Object property: ', objectProperty);
				result.result[objectProperty] = objectValue;
				objectProperty = null;
				objectValue = null;
				isObjectValue = false;
			}
		}
		console.log('Result of object constructor in class: ', result);
		return result;
	}
}

module.exports = ArrayAndObjectResolver;
