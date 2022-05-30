const simpleArrayConstructor = require('../constructors/simpleArrayConstructor');

class ArrayAndObjectResolver {
	constructor(buffer) {
		this.buffer = buffer;
	}

	arrayConstructor(startI) {
		// debugger;
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
				// debugger;
				const resultOfObjectConstructor = this.objectConstructor(startIndex);
				result.result.push(resultOfObjectConstructor.result);
				// console.log('Result after push of object constructor: ', result);
				startIndex = resultOfObjectConstructor.endIndex;
			} else if (i >= startIndex && result.result && this.buffer[i] === '"') {
				startIndex = i - 1;
				const simpleArrayConstructorResult = simpleArrayConstructor(
					startIndex,
					this.buffer,
				);
				result.result = simpleArrayConstructorResult.result;
				startIndex = simpleArrayConstructorResult.endIndex;
			} else if (
				(this.buffer[i - 1] === ']' && this.buffer[i] === ',') ||
				(this.buffer[i - 1] === ']' && this.buffer[i] === '}') ||
				(this.buffer[i - 1] === '}' && this.buffer[i] === ']')
			) {
				break;
			}
		}
		console.log('Result of array constructor in class: ', result);
		result.endIndex = startIndex;
		return result;
	}

	objectConstructor(startI) {
		// debugger;
		const result = {endIndex: null, result: null};
		let objectProperty = null;
		let objectValue = null;

		let isObjectValue = false;

		let startIndex = startI;

		// debugger;
		for (let i = startI; i <= this.buffer.length - 1; i++) {
			// console.log('Buffer item: ', buffer[i]);
			if (i <= startIndex && !result.result && this.buffer[i] === '{') {
				result.result = {};
			} else if (i <= startIndex && result.result) {
				continue;
			} else if (
				i > 1 &&
				this.buffer[i] !== '{' &&
				this.buffer[i] !== '}' &&
				this.buffer[i] !== ']' &&
				this.buffer[i] !== '/' &&
				this.buffer[i] !== ':' &&
				this.buffer[i] !== ',' &&
				this.buffer[i] !== '"' &&
				!isObjectValue
			) {
				if (!objectProperty) {
					objectProperty = this.buffer[i];
					// console.log('Object property: ', objectProperty);
				} else {
					objectProperty += this.buffer[i];
					// console.log('Object property: ', objectProperty);
				}
			} else if (i > 1 && this.buffer[i] === ':') {
				isObjectValue = true;
			} else if (
				i > 1 &&
				isObjectValue &&
				this.buffer[i] !== ',' &&
				this.buffer[i] !== '"' &&
				this.buffer[i] !== '}'
			) {
				if (i > 1 && this.buffer[i] === '[') {
					startIndex = i;

					// debugger;
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
					// debugger;
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
					// console.log('Object value: ', objectValue);
				} else {
					objectValue += this.buffer[i];
					// console.log('Object value: ', objectValue);
				}
			} else if (
				(i > 1 &&
					this.buffer[i] === ',' &&
					objectProperty &&
					objectValue &&
					this.buffer[i + 1] === '"') ||
				(i > 1 && this.buffer[i] === '}' && objectProperty && objectValue)
			) {
				// console.log('Index of iterator: ', i);
				// console.log('Buffer end index: ', buffer.length - 1);
				// console.log('Object property: ', objectProperty);
				// debugger;
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
		console.log('Result of object constructor in class: ', result);
		return result;
	}
}

module.exports = ArrayAndObjectResolver;
