export const faveMaskMotion = function(el, option) {
	let canvas;
	let ctx;
	let offCanvas;
	let offCtx;
	let drawSvg = new Image();
	let frameImg = new Image();
	let maskInImg = new Image();
	let endEventTrue = true;
	let elW = el.width();
	let elH = el.height();

	let svgOrientation;
	let svgHorizonRatio;
	let svgVerticalRatio;

	let svgW;
	let svgH;
	let minSvgW;
	let minSvgH;
	let maskInImgW;
	let maskInImgH;
	let svgCenterL = 0;
	let svgCenterT = 0;
	let _currentW;
	let _currentH;
	let startX;
	let startY;

	let maskTxtWrap = el.parents().find('.txt-mask-wrap');
	let maskTxt = maskTxtWrap.find('.mask-txt');
	let maskInTxt = maskTxtWrap.find('.mask-txt.in');
	let maskOutTxt = maskTxtWrap.find('.mask-txt.out');
	let maskTxtW;
	let maskTxtH;

	let txtFontSize;
	let txtFontWeight;
	let txtFontFamily;
	let txtFontLineHeight;
	let txtFontInColor;
	let txtFontOutColor;
	let canvasInText;
	let canvasOutText;
	let canvasTextInLines = [];
	let canvasTextOutLines = [];

	let txtOffCanvas;
	let txtOffCtx;


	let autoPercent = 0;
	let autoRAF;
	let maxAutoPercent = 0;
	let widthRatio = 1;

	const defaults = {
		svgSrc : '',
		bgImgSrc : '',
		frameImgSrc : '',
		maskInImgSrc : '',
		moveNode : '',
		autoPlay : false,
		minScale : 1,
		maxScale : 1,
		viewW : 0,
		viewH : 0,
		originX : 'center',
		originY : 'center',
		bgFadeIn : false,
		bgFadeOut : false,
		reverse : false,
		speed : 0.01,
		positionX : 0,
		positionY : 0,
		startPercent : 0,
		alignX : 'left',
		alignY : 'top',
		bgColor : '#000',
		motionType : 'S',
		maskTxtDraw : false,
		marginRatio : 0,
		blandingMode : 'source-out'
	}
	const options = $.extend(defaults, option);

	let
	onScrollEvent = option.scrollEvent,
	onStartEvent = option.startEvent,
	onEndEvent = option.endEvent,
	onEndPrevEvent = option.endPrevEvent

	const _init = function() {
		canvas = el[0];
		ctx = canvas.getContext('2d');

		// off screen
		offCanvas = document.createElement('canvas');
		offCtx = offCanvas.getContext('2d');

		options.motionType = options.motionType.toUpperCase();

		_destroy();

		drawSvg.src = options.svgSrc;
		frameImg.src = options.frameImgSrc;
		maskInImg.src = options.maskInImgSrc;

		if(options.bgImgSrc != '') {
			el.parent().append('<div class="svg-bg"><div class="bg" /></div>');
			el.parent().find('.svg-bg .bg').css({
				'position' : 'absolute',
				'top' : 0,
				'left' : 0,
				'width' : '100%',
				'height' : '100%',
				'background-image' : 'url('+options.bgImgSrc+')',
				'background-size':'cover',
				'background-position' : 'center center'
			});
		}

		if(options.maskTxtDraw) {
			txtOffCanvas = document.createElement('canvas');
			txtOffCtx = txtOffCanvas.getContext('2d');
			txtOffCanvas.className = 'txt-canvas';
			el.parent().append(txtOffCanvas);
		}

		drawSvg.onload = function() {
			_resize();
			_draw(0);
		}
		frameImg.onload = function() {
			_draw(0);
		}
		maskInImg.onload = function() {
			_resize();
			_draw(0);
		}

		if(options.maskTxtDraw) textDrawInit();
	}
	const textDrawInit = function () {
		let _width = 0, i, j, result;
		canvasInText = maskInTxt.text();
		canvasOutText = maskOutTxt.text();
		txtFontSize = maskTxt.css('font-size');
		txtFontInColor = maskInTxt.data('color');
		txtFontOutColor = maskOutTxt.data('color');
		txtFontWeight = maskTxt.css('font-weight');
		txtFontFamily = maskTxt.css('font-family');

		maskTxtW = maskTxtWrap.css('width').split('px')[0];
		txtFontLineHeight = maskTxt.css('line-height').split('px')[0];

		offCtx.font = txtFontWeight + ' ' + txtFontSize + ' ' + txtFontFamily;
		txtOffCtx.font = txtFontWeight + ' ' + txtFontSize + ' ' + txtFontFamily;

		if (maskInTxt.height() >= maskOutTxt.height()) {
			maskTxtH = maskInTxt.height();
			maskOutTxt.addClass('absolute');
		}else {
			maskTxtH = maskOutTxt.height();
			maskInTxt.addClass('absolute');
		}

		while ( canvasInText.length ) {
			for( i=canvasInText.length; txtOffCtx.measureText(canvasInText.substr(0,i)).width > maskTxtW; i-- );

			result = canvasInText.substr(0,i);

			if ( i !== canvasInText.length )
				for( j=0; result.indexOf(" ",j) !== -1; j=result.indexOf(" ",j)+1 );

			canvasTextInLines.push( result.substr(0, j|| result.length) );
			_width = Math.max( _width, txtOffCtx.measureText(canvasTextInLines[ canvasTextInLines.length-1 ])._width );
			canvasInText  = canvasInText.substr( canvasTextInLines[ canvasTextInLines.length-1 ].length, canvasInText.length );
		}
		while ( canvasOutText.length ) {
			for( i=canvasOutText.length; offCtx.measureText(canvasOutText.substr(0,i)).width > maskTxtW; i-- );

			result = canvasOutText.substr(0,i);

			if ( i !== canvasOutText.length )
				for( j=0; result.indexOf(" ",j) !== -1; j=result.indexOf(" ",j)+1 );

			canvasTextOutLines.push( result.substr(0, j|| result.length) );
			_width = Math.max( _width, offCtx.measureText(canvasTextOutLines[ canvasTextOutLines.length-1 ])._width );
			canvasOutText  = canvasOutText.substr( canvasTextOutLines[ canvasTextOutLines.length-1 ].length, canvasOutText.length );
		}
	}
	const textDraw = function () {
		let i = 0, j = 0, 
			canvasTxtTop = maskTxtWrap.position().top + (maskTxtWrap.height() - maskTxtH);

		offCtx.font = txtFontWeight + ' ' + txtFontSize + ' ' + txtFontFamily;
		offCtx.textBaseline = 'top';
		offCtx.globalCompositeOperation = 'source-atop';
		offCtx.fillStyle = txtFontOutColor;
		txtOffCtx.font = txtFontWeight + ' ' + txtFontSize + ' ' + txtFontFamily;
		txtOffCtx.textBaseline = 'top';
		txtOffCtx.fillStyle = txtFontInColor;

		for ( i=0, j=canvasTextOutLines.length; i<j; ++i ) offCtx.fillText(canvasTextOutLines[i], maskTxtWrap.position().left, canvasTxtTop + (txtFontLineHeight*i) );
		for ( i=0, j=canvasTextInLines.length; i<j; ++i ) txtOffCtx.fillText(canvasTextInLines[i], maskTxtWrap.position().left, canvasTxtTop + (txtFontLineHeight*i) );
	}
	const _draw = function(_percent) {
		canvas.width = elW*widthRatio;
		offCanvas.width = canvas.width;
		if(options.maskTxtDraw) txtOffCanvas.width = canvas.width;

		let totalPercent = (options.reverse) ? (1-_percent) : _percent;
		let totalPercentDubble = totalPercent*2;
		let divisionStep1 = (1-Math.max(0,1-totalPercentDubble));
		let divisionStep2 = Math.max(0,totalPercentDubble-divisionStep1);

		if(options.motionType == 'S') {
			_currentW = ((svgW*totalPercent)+minSvgW);
			_currentH = ((svgH*totalPercent)+minSvgH);

			// aline X
			if (options.alignX != 'center') {
				startX = (options.alignX != 'right') ? (options.positionX*widthRatio) : canvas.width - minSvgW - (options.positionX*widthRatio);
			}else {
				startX = (canvas.width/2) - (minSvgW/2);
			}
			// aline Y
			if (options.alignY != 'center') {
				startY = (options.alignY != 'bottom') ? (options.positionY*widthRatio) : canvas.height - minSvgH - (options.positionY*widthRatio);
			}else {
				startY = (canvas.height/2) - (minSvgH/2);
			}

			if (options.originX != 'center') {
				let ratioX = startX + options.originX*((svgW+minSvgW)/100);
				svgCenterL = startX - (ratioX*totalPercent);
			}else {
				if ((options.alignX == 'right')) {
					svgCenterL = ((canvas.width/2)*2) - ((_currentW/2)*2);
				}
				if ((options.alignX == 'center')) {
					svgCenterL = (canvas.width/2) - (_currentW/2);
				}
			}
			if (options.originY != 'center') {
				let ratioY = startY + options.originY*((svgH+minSvgH)/100);
				svgCenterT = startY - (ratioY*totalPercent);
			}else {
				if ((options.alignY == 'bottom')) {
					svgCenterT = canvas.height - _currentH;
				}
				if ((options.alignY == 'center')) {
					svgCenterT = (canvas.height/2) - (_currentH/2);
				}
			}
		}

		if(options.motionType == 'X') {
			_currentW = canvas.height*svgVerticalRatio;
			_currentH = canvas.height;
			svgCenterL = canvas.width - (_currentW*divisionStep1);
			el.css('transform', 'translate('+(-canvas.width*divisionStep2)+'px, 0px)');
		}
		if(options.motionType == 'Y') {
			_currentW = canvas.width;
			_currentH = canvas.width*svgHorizonRatio;
			svgCenterT = canvas.height - (_currentH*divisionStep1);
			el.css('transform', 'translate(0px,'+(-_currentH*divisionStep2)+'px)');
		}

		if(drawSvg) {
			offCtx.beginPath();
			offCtx.drawImage(drawSvg,svgCenterL,svgCenterT,_currentW,_currentH);
			offCtx.closePath();
		}

		offCtx.globalCompositeOperation = options.blandingMode;

		if (options.bgColor != 'transparent') {
			offCtx.beginPath();
			offCtx.fillStyle = options.bgColor;
			offCtx.fillRect(0,0,canvas.width,canvas.height);
			offCtx.closePath();
		}

		if (options.maskInImgSrc) {
			offCtx.beginPath();
			offCtx.drawImage(maskInImg, (offCanvas.width/2) - (maskInImgW/2) , (offCanvas.height/2) - (maskInImgH/2) ,maskInImgW,maskInImgH);
			offCtx.closePath();
		}

		if (options.frameImgSrc) {
			offCtx.globalCompositeOperation = 'destination-over';
			offCtx.beginPath();
			offCtx.drawImage(frameImg,svgCenterL,svgCenterT,_currentW,_currentH);
			offCtx.closePath();
		}

		if(options.maskTxtDraw) textDraw();

		ctx.drawImage(offCanvas,0,0);

		if(options.bgFadeIn) el.next().css('opacity', _percent);
		if(options.bgFadeOut) el.next().css('opacity', 1-_percent);

		onScrollEvent && onScrollEvent.call(this,_percent);

		if (_percent == 1 && endEventTrue) {
			endEventTrue = false;
			onEndEvent && onEndEvent.call();
		}else if (_percent != 1 && !endEventTrue){
			endEventTrue = true;
			onEndPrevEvent && onEndPrevEvent.call();
		}
	}
	const _scroll = function(_easing) {
		let st = (typeof(_easing) == 'number') ? _easing : $(window).scrollTop();

		let _scrollTop = st - options.moveNode.offset().top;
		let _moveArea = options.moveNode.height() - $(window).height();

		let _percent = Math.min(1, (_scrollTop-_moveArea*options.startPercent) / (_moveArea - (_moveArea*options.startPercent)) );
		_percent = Math.min(1, Math.max(0, _percent));

		_draw(_percent);
	}
	const _play = function() {
		if (autoPercent == 0) onStartEvent && onStartEvent.call();

		if (autoPercent <= 1) {
			autoPercent += options.speed;
			maxAutoPercent = Math.min(1, autoPercent);
			_draw(maxAutoPercent);
			autoRAF = window.requestAnimationFrame(_play);
		}else {
			autoPercent = 0;
			window.cancelAnimationFrame(autoRAF);
		}
	}
	const _pause = function() {
		window.cancelAnimationFrame(autoRAF);
	}
	const _resize = function() {
		elW = el.width();
		elH = el.height();
		canvas.width = elW*widthRatio;
		canvas.height = elH*widthRatio;
		offCanvas.width = canvas.width;
		offCanvas.height = canvas.height;
		if(options.maskTxtDraw) {
			txtOffCanvas.width = canvas.width;
			txtOffCanvas.height = canvas.height;
		}

		svgOrientation = options.viewW>=options.viewH;
		svgHorizonRatio = (options.viewH/options.viewW);
		svgVerticalRatio = (options.viewW/options.viewH);
		svgW = (canvas.width*options.maxScale);
		svgH = svgW*svgHorizonRatio;

		if(svgOrientation) {
			minSvgW = Math.min(options.viewW*options.minScale, options.viewW*(canvas.width/options.viewW));
			minSvgH = minSvgW*svgHorizonRatio;
		}else {
			minSvgH = Math.min(options.viewH*options.minScale, (options.viewH*(canvas.height/options.viewH))-(el.height()*options.marginRatio) );
			minSvgW = minSvgH*svgVerticalRatio;
		}

		let maskInImgRatio = maskInImg.naturalHeight/maskInImg.naturalWidth;
		
		if (elW > elH) {
			maskInImgW = elW;
			maskInImgH = maskInImgW * maskInImgRatio;
		}else {
			maskInImgW = maskInImgH / maskInImgRatio;
			maskInImgH = elH;
		}
		

		if(!options.autoPlay) {
			_scroll();
		}else {
			_draw(maxAutoPercent);
		}
	}
	const _destroy = function() {
		canvas.width = '';
		canvas.height = '';
		autoPercent = 0;
		maxAutoPercent = 0;
		window.cancelAnimationFrame(autoRAF);
		el.parent().find('.svg-bg').remove();
		el.parent().find('.txt-canvas').remove();
	}
	_init();

	return {
		init : _init,
		draw : _draw,
		scroll : _scroll,
		play : _play,
		pause : _pause,
		resize : _resize,
		destroy : _destroy
	}
}