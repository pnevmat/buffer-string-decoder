const arrayConstructorBreakValidator = (i, buffer) => {
	if (
		(buffer[i - 1] === ']' && buffer[i] === ',') ||
		(buffer[i - 1] === ']' && buffer[i] === '}') ||
		(buffer[i - 1] === '}' && buffer[i] === ']')
	) {
		return true;
	} else {
		return false;
	}
};

module.exports = arrayConstructorBreakValidator;
