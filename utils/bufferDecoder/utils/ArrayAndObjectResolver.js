const arrayOfObjectsEndIndexHandler = require('./arrayOfObjectsEndIndexHandler');

class ArrayAndObjectResolver {
	constructor(startIndex, endIndex, buffer) {
		this.startI = startIndex;
		this.endI = endIndex;
		this.buffer = buffer;
	}

	arrayConstructor(startI, endI) {
		// debugger;
		const result = {passedSteps: null, result: null};
		let subBuffer = null;
		let passedSteps = null;
		// let recursionStep = recStep ? recStep : 0;
		let startIndex = startI;
		let endIndex = 0;

		for (let i = startI; i <= endI; i++) {
			if (i <= startIndex && !result.result && this.buffer[i] === '[') {
				result.result = [];
			} else if (
				(i <= startIndex && !result.result && this.buffer[i] === '{') ||
				(i >= startIndex && result.result && this.buffer[i] === '{')
			) {
				startIndex = i;
				endIndex = arrayOfObjectsEndIndexHandler(i, endI, this.buffer);
				// debugger;
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
				// debugger;
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
					console.log('Result after push of object constructor: ', result);
					subBuffer = null;
				}
			}
		}
		return result;
	}

	objectConstructor(startI, endI, buffer) {
		// debugger;
		const result = {passedSteps: null, result: null};
		let objectProperty = null;
		let objectValue = null;
		let passedSteps = null;

		let isObjectValue = false;

		let startIndex = 0;
		let endIndex = 0;

		for (let i = startIndex; i <= endI; i++) {
			if (
				(i <= startI && buffer[i] === '{') ||
				(i <= startI + 1 && buffer[i] === '{')
			) {
				result.result = {};
			} else if (i > startI && buffer[i] === '{') {
				startIndex = i;
				endIndex = endI - 1;
				break;
			} else if (i > startI && buffer[i] === '[') {
				startIndex = i;
				endIndex = endI - 1;
				break;
			}
		}
		// debugger;
		for (let i = startI; i <= endI; i++) {
			// console.log('Buffer item: ', buffer[i]);
			if (
				passedSteps &&
				i !== passedSteps.length + 2 &&
				buffer[passedSteps.length] === ',' &&
				buffer[passedSteps.length - 1] === ']'
			) {
				continue;
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
						if (/\W/.test(buffer[i - 2])) {
							passedSteps += buffer[i - 2];
						}
						passedSteps += buffer[i - 1];
					}
					passedSteps += buffer[i];
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
					// debugger;
					const arrayConstructorResult = this.arrayConstructor(
						startIndex,
						endIndex,
					);
					// debugger;
					objectValue = arrayConstructorResult.result;
					result.result[objectProperty] = objectValue;
					// debugger;
					if (!passedSteps) {
						passedSteps = arrayConstructorResult.passedSteps;
					} else if (
						buffer[
							(
								passedSteps +
								buffer[i - 1] +
								buffer[i] +
								arrayConstructorResult.passedSteps +
								']'
							).length
						] === ','
					) {
						passedSteps +=
							buffer[i - 1] +
							buffer[i] +
							arrayConstructorResult.passedSteps +
							']';
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
					} else {
						continue;
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
				// && buffer[i + 1] !== ' '
				if (/\W/.test(buffer[i + 1]) && /\W/.test(buffer[i + 2])) {
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
		return result;
	}
}

module.exports = ArrayAndObjectResolver;
