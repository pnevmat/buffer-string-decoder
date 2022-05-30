const simpleArrayConstructor = (startI, buffer) => {
	console.log('Buffer in simple array constructor: ', buffer);
	let result = {endIndex: null, result: null};
	let arrayValue = null;
	let startIndex = null;

	for (let i = startI; i <= buffer.length - 1; i++) {
		// debugger;
		// console.log('Buffer item in simple array constructor: ', buffer[i]);
		if (i <= startI && !result.result && buffer[i] === '[') {
			result.result = [];
		} else if (
			i >= 1 &&
			buffer[i] !== '[' &&
			buffer[i] !== ']' &&
			buffer[i] !== '/' &&
			buffer[i] !== ':' &&
			buffer[i] !== ',' &&
			buffer[i] !== '"'
		) {
			if (!arrayValue) {
				arrayValue = buffer[i];
				// console.log('Array value: ', arrayValue);
			} else {
				arrayValue += buffer[i];
				// console.log('Array value: ', arrayValue);
			}
		} else if (
			(i > 1 && buffer[i] === ',' && buffer[i + 1] === '"') ||
			(i > 1 && buffer[i] === ']')
		) {
			// console.log('Index of iterator: ', i);
			// console.log('Buffer end index: ', buffer.length - 1);
			// console.log('Array value: ', arrayValue);

			result.result.push(arrayValue);
			startIndex = i;
			arrayValue = null;

			if (buffer[i] === ']') {
				break;
			}
		}
	}
	result.endIndex = startIndex;
	console.log('Simple array constructor result: ', result);
	return result;
};

module.exports = simpleArrayConstructor;
