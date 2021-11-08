export const faveSequence = function (el,option) {
	let $elSticky = el.parents('.sticky-wrap');
	let canvas;
	let ctx;
	let offCanvas;
	let offCtx;
	let sequenceImgArray = [];
	let sequenceMImgArray = [];
	let sequenceArray;
	let sequenceImgSvgArray = [];
	let sequenceMImgSvgArray = [];
	let sequenceSvgArray;
	let loadComplete = false;

	let playRaf;
	let _playIdx = 0;
	let imgRatio;
	let fcCheck = true;
	let fileNumber;
	let widthRatio = 1;
	let svgImgExistence = false;

	const defaults = {
		imgSrc : '',
		fileName : '',
		mobileFileName : '',
		frame : 0,
		frameDivision : 1,
		bgAlpha : false,
		targetBgAlphaFrame : null,
		autoPlay : false,
		startFrame : 0,
		startPercent : 0,
		speed : 1,
		preLoadImg : [],
		frameEventStart : 0
	}
	const options = $.extend(defaults, option);

	let onLoadEvent = option.loadEvent;
	let onFrameInEvent = option.frameInEvent;
	let onFrameOutEvent = option.frameOutEvent;
	
	let aniFrame = options.frame/options.frameDivision;

	const _init = function () {
		canvas = el[0];
		ctx = canvas.getContext('2d');

		// off screen
		offCanvas = document.createElement('canvas');
		offCtx = offCanvas.getContext('2d');

		_resize();
	}
	const _imgLoad = function () {
		let idx = 0;
		let loadIdx = 0;
		let imgfile = (window.innerWidth <= 767 && options.mobileFileName != '') ? options.mobileFileName : options.fileName;
		sequenceArray = (window.innerWidth <= 767 && options.mobileFileName != '') ? sequenceMImgArray : sequenceImgArray;
		sequenceSvgArray = (window.innerWidth <= 767 && options.mobileFileName != '') ? sequenceMImgSvgArray : sequenceImgSvgArray;
		
		fileNumber = imgfile.replace(/[^0-9]/g,'');
		let fileAsset = imgfile.split(fileNumber)[0];
		let fileType = imgfile.split(fileNumber)[1];

		if (sequenceArray.length == 0) {
			_preLoad(fileAsset, fileType);

			for (var i = 0; i <= options.frame; i += options.frameDivision) {
				let sequenceImg = new Image();
				sequenceImg.src = options.imgSrc + fileAsset + countZero(i) + fileType;
				sequenceArray.splice(i, 0, sequenceImg);

				if (options.bgAlpha || options.targetBgAlphaFrame) {
					let sequenceSvgImg = new Image();
					if (!options.targetBgAlphaFrame) {
						sequenceSvgImg.src = options.imgSrc + fileAsset + countZero(i) + '.svg';
						sequenceSvgArray.splice(i, 0, sequenceSvgImg);
					}else if (i == options.targetBgAlphaFrame) {
						sequenceSvgImg.src = options.imgSrc + fileAsset + countZero(i) + '.svg';
						sequenceSvgArray.push(sequenceSvgImg);
					}

					sequenceSvgImg.onload = function () {
						svgImgExistence = true;
					}
				}
				sequenceImg.onload = function () {
					_offScreenDraw(loadIdx);
					
					if(sequenceArray[options.startFrame]) {
						_draw(options.startFrame);
						imgRatio = $(sequenceArray[options.startFrame])[0].naturalHeight/$(sequenceArray[options.startFrame])[0].naturalWidth;
					}
					loadIdx += options.frameDivision;
					if (loadIdx > options.frame) {
						loadComplete = true;
						onLoadEvent && onLoadEvent.call();
					}
				}
			}
		}else {
			_draw(options.startFrame);
		}
	}
	const countZero = function (i) {
		let cnt;
		let zero = '';
		let maxLength = fileNumber.toString().length;
		for (var j = 0; j < (maxLength-i.toString().length); j++) zero += '0';
		cnt = zero+i;

		return cnt;
	}
	const _preLoad = function (fileAsset, fileType) {
		for (var i = 0; i < options.preLoadImg.length; i++) {
			let sequenceImg = new Image();
			sequenceImg.src = options.imgSrc + fileAsset + countZero(options.preLoadImg[i]) + fileType;
			if (options.bgAlpha) {
				let sequenceSvgImg = new Image();
				sequenceSvgImg.src = options.imgSrc + fileAsset + countZero(options.preLoadImg[i]) + '.svg';
			}
		}
	}
	const _offScreenDraw = function (percent) {
		offCanvas.width = el.width()*widthRatio;
		let w, h, t, l;

		if (sequenceArray[percent]) {
			if (el.width() < el.height()) {
				l = 0;
				t = Math.floor((offCanvas.height/2)-((offCanvas.width*imgRatio)/2));
				w = Math.floor(offCanvas.width);
				h = Math.floor(offCanvas.width*imgRatio);
			}else {
				l = Math.floor((offCanvas.width/2)-((offCanvas.height/imgRatio)/2));
				t = 0;
				w = Math.floor(offCanvas.height/imgRatio);
				h = Math.floor(offCanvas.height);
			}

			if (options.bgAlpha && svgImgExistence) {
				offCtx.drawImage(sequenceSvgArray[percent],l,t,w,h);
				offCtx.globalCompositeOperation = 'source-in';
			}
			if (options.targetBgAlphaFrame==percent && svgImgExistence) {
				offCtx.drawImage(sequenceSvgArray[0],l,t,w,h);
				offCtx.globalCompositeOperation = 'source-in';
			}
			offCtx.drawImage(sequenceArray[percent],l,t,w,h);
		}
	}
	const _draw = function (percent) {
		offCanvas.width = el.width()*widthRatio;
		canvas.width = el.width()*widthRatio;

		if (sequenceArray[percent]) {
			ctx.beginPath();
			_offScreenDraw(percent);
			ctx.drawImage(offCanvas,0,0);
			ctx.closePath();

			_frameEventCallChecked(percent);
		}
	}
	const _frameEventCallChecked = function (percent) {
		if (percent >= options.frameEventStart && fcCheck) {
			fcCheck = false;
			onFrameInEvent && onFrameInEvent.call();
		}else if (percent < options.frameEventStart && !fcCheck) {
			fcCheck = true;
			onFrameOutEvent && onFrameOutEvent.call();
		}
	}
	const _scroll = function (_easing) {
		if (!options.autoPlay && loadComplete) {
			let st = (typeof(_easing) == 'number') ? _easing : $(window).scrollTop();

			let _scrollTop = st - $elSticky.offset().top;
			let _moveArea = $elSticky.height() - $(window).height();
			let _percent = Math.min(1, (_scrollTop-_moveArea*options.startPercent) / (_moveArea - (_moveArea*options.startPercent)) );
			_percent = Math.min(1, Math.max(0, _percent));

			_draw(Math.floor(_percent*aniFrame));
		}
	}
	const _play = function () {
		_playIdx = 0;
		window.cancelAnimationFrame(playRaf);
		if (options.autoPlay && loadComplete) {
			let motionDraw = function () {
				_playIdx += 0.016 * options.speed;
				_playIdx = Math.min(1,_playIdx);

				_draw(Math.floor(_playIdx*aniFrame));

				if (_playIdx < 1) {
					playRaf = window.requestAnimationFrame(motionDraw);
				}else {
					window.cancelAnimationFrame(playRaf);
				}
			}
			motionDraw();
		}
	}
	const _reversePlay = function () {
		_playIdx = 1;
		window.cancelAnimationFrame(playRaf);
		if (options.autoPlay && loadComplete) {
			let motionDraw = function () {
				_playIdx -= 0.016 * options.speed;
				_playIdx = Math.max(0,_playIdx);

				_draw(Math.floor(_playIdx*aniFrame));

				if (_playIdx > 0) {
					playRaf = window.requestAnimationFrame(motionDraw);
				}else {
					window.cancelAnimationFrame(playRaf);
				}
			}
			motionDraw();
		}
	}
	const _pause = function () {
		window.cancelAnimationFrame(playRaf);
	}
	const _resizeSetting = function () {
		canvas.width = el.width()*widthRatio;
		canvas.height = el.height()*widthRatio;
		offCanvas.width = el.width()*widthRatio;
		offCanvas.height = el.height()*widthRatio;
	}
	const _resize = function () {
		_resizeSetting();
		_imgLoad();
	}
	const _destroy = function () {
		_resizeSetting();
	}

	return {
		init : _init,
		scroll : _scroll,
		resize : _resize,
		play : _play,
		pause : _pause,
		reversePlay : _reversePlay,
		draw : _draw,
		destroy : _destroy
	}
}
