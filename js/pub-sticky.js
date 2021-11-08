export const faveSticky = function (el,option) {
	let $fixedInner = el.find('.fixed-inner');
	let $fixedContent = el.find('.fixed-content');
	let stickyShow;
	let scrollView = true;
	let _elTop = el.offset().top;
	let _elH = el.height();
	let startPre = 0;

	const defaults = {
		mode : null,
		end : null,
		minHeight : 0,
		maxHeightM : 0,
		maxHeight : 0,
		preShow : 0,
		fadeInShow : false
	}
	const options = $.extend(defaults, option);

	let onScrollEvent = option.scrollEvent;
	let onEndEvent = option.endEvent;

	const _stickyChecked = function () {
		let prop = 'position:';
		let value = 'sticky';
		let prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
		let el = document.createElement('a');
		let mStyle = el.style;
		mStyle.cssText = prop + prefixes.join(value + ';' + prop).slice(0, - prop.length);

		if (mStyle.position.indexOf(value) !== -1) {
			stickyShow = true;
		}else {
			stickyShow = false;
			$('.m_content-highlights').addClass('no-sticky');
		}

		if(stickyShow) $fixedInner.addClass('o-sticky');
		if (options.mode == 'fixed') {
			$fixedInner.removeClass('o-sticky');
			stickyShow = false;
		}
	}
	const _init = function () {
		_stickyChecked();
		_resize();
	}
	const _scroll = function () {
		let showIn = $(window).scrollTop() >= (_elTop - window.innerHeight);
		let showOut = $(window).scrollTop() <= _elTop + _elH;
		scrollView = (showIn && showOut) ? true : false;

		if (!stickyShow) {
			scrollView = true;
			startPre = options.preShow;
		}
		if (scrollView) {
			el.addClass('scroll-show');
			let _scrollTop = $(window).scrollTop() - el.offset().top + startPre;
			let _moveArea = el.height() - window.innerHeight + startPre;
			let _percent = Math.min(1, _scrollTop / _moveArea);
			_percent = Math.min(1, Math.max(0, _percent));

			if (!stickyShow) {
				if (_scrollTop >= 0) {
					if (_percent >= 1) {
						if(options.end != 'fixed') {
							$fixedInner.removeClass('o-fixed').css('top', _moveArea - startPre);
						}else {
							$fixedInner.addClass('o-fixed').css('top', 0);
						}
					}else {
						$fixedInner.addClass('o-fixed').css('top', 0);
					}
				}else {
					$fixedInner.removeClass('o-fixed').css('top', 0);
				}
			}

			onScrollEvent && onScrollEvent.call(this, _percent);

			if (options.fadeInShow) {
				let fadeStep = Math.min(1, _scrollTop / (_moveArea*0.4));
				fadeStep = Math.min(1, Math.max(0, fadeStep));
				$fixedContent.css('opacity', fadeStep);

				if(fadeStep >= 1) {
					el.addClass('o-end');
				}else {
					el.removeClass('o-end');
				}
			}
		}else {
			el.removeClass('scroll-show');
		}
	}
	const _resize = function () {
		_elTop = el.offset().top;
		_elH = el.height();
		let _gapMargin;
		if (window.innerWidth >= 768) {
			_gapMargin = -(window.innerHeight-options.maxHeight)/2;
		}else {
			_gapMargin = -(window.innerHeight-options.maxHeightM)/2;
		}

		$fixedInner.css('min-height', options.minHeight);

		if (_gapMargin < 0) {
			el.css({
				'margin-bottom' : _gapMargin,
				'padding-bottom' : ''
			});
		}else {
			el.css({
				'margin-bottom' : '',
				'padding-bottom' : _gapMargin
			});
		}
		if (stickyShow) el.parents('.sticky-sec').css('margin-top', -options.preShow);

		_scroll();
	}

	_init();

	return {
		scroll : _scroll,
		resize : _resize
	}
}