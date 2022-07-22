const simpleArrayConstructor = require('../constructors/simpleArrayConstructor');
const arrayConstructorBreakValidator = require('../utils/validators/arrayConstructorBreakValidator');
const objectPropertyValidator = require('../utils/validators/objectPropertyValidator');
const objectValueValidator = require('../utils/validators/objectValueValidator');
const objectConstructorResultValidator = require('../utils/validators/objectConstructorResultValidator');
const simpleArrayConstructorStartValidator = require('../utils/validators/simpleArrayConstructorStartValidator');

class ArrayAndObjectResolver {
	constructor(buffer) {
		this.buffer = buffer;
	}

	arrayConstructor(startI) {
		const result = {endIndex: null, result: null};

		let startIndex = startI;

		for (let i = startI; i <= this.buffer.length - 1; i++) {
			if (i <= startIndex && !result.result && this.buffer[i] === '[') {
				result.result = [];
			} else if (i <= startIndex && result.result) {
				continue;
			} else if (
				(i <= startIndex && !result.result && this.buffer[i] === '{') ||
				(i >= startIndex && result.result && this.buffer[i] === '{')
			) {
				startIndex = i;

				const resultOfObjectConstructor = this.objectConstructor(startIndex);
				result.result.push(resultOfObjectConstructor.result);

				startIndex = resultOfObjectConstructor.endIndex;
			} else if (
				simpleArrayConstructorStartValidator(i, startIndex, result, this.buffer)
			) {
				startIndex = i - 1;

				const simpleArrayConstructorResult = simpleArrayConstructor(
					startIndex,
					this.buffer,
				);

				result.result = simpleArrayConstructorResult.result;
				startIndex = simpleArrayConstructorResult.endIndex;
			} else if (arrayConstructorBreakValidator(i, this.buffer)) {
				break;
			}
		}

		result.endIndex = startIndex;
		return result;
	}

	objectConstructor(startI) {
		const result = {endIndex: null, result: null};
		let objectProperty = null;
		let objectValue = null;

		let isObjectValue = false;

		let startIndex = startI;

		for (let i = startI; i <= this.buffer.length - 1; i++) {
			if (i <= startIndex && !result.result && this.buffer[i] === '{') {
				result.result = {};
			} else if (i <= startIndex && result.result) {
				continue;
			} else if (objectPropertyValidator(i, isObjectValue, this.buffer)) {
				if (!objectProperty) {
					objectProperty = this.buffer[i];
				} else {
					objectProperty += this.buffer[i];
				}
			} else if (i > 1 && this.buffer[i] === ':') {
				isObjectValue = true;
			} else if (objectValueValidator(i, isObjectValue, this.buffer)) {
				if (i > 1 && this.buffer[i] === '[') {
					startIndex = i;

					const arrayConstructorResult = this.arrayConstructor(startIndex);

					objectValue = arrayConstructorResult.result;
					result.result[objectProperty] = objectValue;
					startIndex = arrayConstructorResult.endIndex;

					result.endIndex = startIndex;

					objectProperty = null;
					objectValue = null;
					isObjectValue = false;

					if (this.buffer.length === result.endIndex) {
						break;
					} else {
						continue;
					}
				} else if (i > 1 && this.buffer[i] === '{') {
					startIndex = i;

					const objectConstructorResult = this.objectConstructor(startIndex);

					objectValue = objectConstructorResult.result;
					result.result[objectProperty] = objectValue;

					objectProperty = null;
					objectValue = null;
					isObjectValue = false;

					startIndex = objectConstructorResult.endIndex;

					if (this.buffer.length === result.endIndex) {
						break;
					} else {
						continue;
					}
				}

				if (!objectValue) {
					objectValue = this.buffer[i];
				} else {
					objectValue += this.buffer[i];
				}
			} else if (
				objectConstructorResultValidator(
					i,
					objectProperty,
					objectValue,
					this.buffer,
				)
			) {
				result.result[objectProperty] = objectValue;
				result.endIndex = i;

				objectProperty = null;
				objectValue = null;
				isObjectValue = false;

				if (this.buffer[i] === '}') {
					break;
				}
			} else if (i > startIndex && this.buffer[i] === '}') {
				if (this.buffer[i] === '}') {
					result.endIndex = i;
				}

				break;
			}
		}

		return result;
	}
}

module.exports = ArrayAndObjectResolver;
