const arrayHandler = require('./handlers/arrayHandler');
const objectHandler = require('./handlers/objectHandler');
const stringHandler = require('./handlers/stringHandler');

const bufferDecoder = (buffer) => {
	if (typeof buffer !== 'string') {
		return 'You need to provide stringified entity to bufferDecoder';
	}
	let result = null;

	if (buffer[0] === '[' || buffer[1] === '[') {
		result = arrayHandler(buffer);
		return result;
	} else if (buffer[0] === '{' || buffer[1] === '{') {
		result = objectHandler(buffer);
		return result;
	} else {
		result = stringHandler(buffer);
		return result;
	}
};

module.exports = bufferDecoder;
