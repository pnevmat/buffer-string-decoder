const arrayOfObjectsEndIndexHandler = (index, endIndex, buffer) => {
	// debugger;
	let result = null;

	for (let i = index; i <= endIndex; i++) {
		if (buffer[endIndex] === '}' && buffer[endIndex + 1] === ']') {
			result = endIndex;
			break;
		}

		if (buffer[i] === '}') {
			if (
				// выбирает последний индекс для объекта в котором есть еще объект который идет значением последнего свойства объекта
				(buffer[i - 1] === '}' &&
					buffer[i + 1] === ',' &&
					new RegExp(/\W/).test(buffer[i + 2])) ||
				// выбирает последний индекс для объекта в котором есть еще массив который идет значением последнего свойства объекта
				(buffer[i - 1] === ']' &&
					buffer[i + 1] === ',' &&
					new RegExp(/\W/).test(buffer[i + 2])) ||
				// должен выбирать последний индекс объекта в котором есть еще массив или объект но он идет значением не последнего свойства объекта
				// !new RegExp(/\W/).test(buffer[i - 1]) &&
				(buffer[i + 1] === ',' && buffer[i + 2] === '{')
			) {
				result = i;
				break;
			} else if (buffer[i + 1] === ']' && buffer[i + 2] === '}') {
				result = i;
				break;
			}
		}
	}
	return result;
};

module.exports = arrayOfObjectsEndIndexHandler;
