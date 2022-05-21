const simpleArrayConstructor = (buffer) => {
	console.log('Buffer in simple array constructor: ', buffer);
	let result = null;
	let arrayValue = null;

	for (let i = 0; i <= buffer.length - 1; i++) {
		// console.log('Buffer item in simple array constructor: ', buffer[i]);
		if (i <= 1 && !result && buffer[i] === '[') {
			result = [];
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
			(i > 1 && buffer[i] === ',' && i < buffer.length - 1) ||
			(i > 1 && buffer[i] === ']' && i === buffer.length - 1)
		) {
			// console.log('Index of iterator: ', i);
			// console.log('Buffer end index: ', buffer.length - 1);
			// console.log('Array value: ', arrayValue);

			result.push(arrayValue);
			arrayValue = null;
		}
	}
	console.log('Simple array constructor result: ', result);
	return result;
};

module.exports = simpleArrayConstructor;
