const arrayHandler = require('./handlers/arrayHandler');
const objectHandler = require('./handlers/objectHandler');
const stringHandler = require('./handlers/stringHandler');

const bufferDecoder = (buffer) => {
	// const stringBuffer = buffer.toString();
	// console.log('Stringified buffer in decoder func: ', buffer);
	// console.log('Type of stringified buffer: ', typeof buffer);
	if (typeof buffer !== 'string') {
		return 'You need to provide stringified entity to bufferDecoder';
	}
	let result = null;

	if (buffer[0] === '[' || buffer[1] === '[') {
		result = arrayHandler(buffer);
		// console.log('Result of array handler in bufferDecoder: ', result);
		return result;
	} else if (buffer[0] === '{' || buffer[1] === '{') {
		result = objectHandler(buffer);
		console.log('Result of object handler in bufferDecoder: ', result);
		return result;
	} else {
		result = stringHandler(buffer);
		console.log('Result of string handler in bufferDecoder: ', result);
		return result;
	}
};

module.exports = bufferDecoder;
