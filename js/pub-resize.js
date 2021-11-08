export const faveResize = function (cb, ms) {
	let debounceCheck;
	let sizeEventCall = true;
	let PREV_WIDTH_SIZE;
	let CURRENT_WIDTH_SIZE;
	return function () {
		PREV_WIDTH_SIZE = window.innerWidth;
		sizeEventCall = (!$('html').hasClass('mobile')) ? true : PREV_WIDTH_SIZE != CURRENT_WIDTH_SIZE;
		if (sizeEventCall) {
			clearTimeout(debounceCheck);
			debounceCheck = setTimeout(function() {
				cb();
			},ms);
		}
		CURRENT_WIDTH_SIZE = window.innerWidth;
	}
}