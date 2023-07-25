/* closest pollyfill */
if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
      i,
      el = this;
    do {
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== el) {}
    } while (i < 0 && (el = el.parentElement));
    return el;
  };
}
/* // closest pollyfill */

/* forEach IE */
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
/* // forEach IE */

/* brower detect */
window.DSMT = {};
DSMT.browser = browserDetect();
$('html').addClass(DSMT.browser.name);
if (DSMT.browser.name == 'ie') {
  $('html').addClass(DSMT.browser.name + DSMT.browser.versionNumber);
} else {
  $('html').addClass('not-ie');
}
$('html').addClass(DSMT.browser.mobile ? ' mobile' : '');
if (DSMT.browser.os.indexOf('Windows') >= 0) $('html').addClass('windows');
function isIOS() {
  if (/iPad|iPhone|iPod/.test(navigator.platform)) {
    return true;
  } else {
    return navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);
  }
}
if (isIOS()) $('html').addClass('mobile');
/* // brower detect */

function etcBrowser() {
  if (/DaumApps/i.test(navigator.userAgent) || /DaumDevice/i.test(navigator.userAgent) || /SamsungBrowser/i.test(navigator.userAgent) || /NAVER/i.test(navigator.userAgent)) $('#fabButton').css('display', 'none');
}
etcBrowser();
var _mobileSize = 768;
var $window = $(window);
var $header = $('#dsmtHeader');
var $gnbWrap = $('#dsmtGnb');
var $gnb = $header.find('.gnb');
var $gnbLi = $header.find('.gnb>li');
var $btnMenuOpen = $header.find('.btn-gnb-open');
var $btnMenuClose = $header.find('.btn-gnb-close');
var $lnb = $('#dsmtLnb');
var $lnbBtn = $lnb.find('.lnb-open');
var gnbOpenName = 'gnb-open';
var noScrollName = 'no-scroll';

/* header GNB */
var accessibilityGnb = function () {
  var $hiddenEl = $('.skip-to-content-link, #dsmtContents, .page-key-visual, #dsmtLnb, #fabButton, #dsmtFooter, #storyLnb, iframe');
  var _on = function _on() {
    $header.find('>*, .header-inner>*').css('visibility', 'hidden');
    $hiddenEl.attr('aria-hidden', true);
    $gnbWrap.css('visibility', 'visible');
  };
  var _off = function _off() {
    $header.find('>*, .header-inner>*').removeAttr('style');
    $hiddenEl.removeAttr('aria-hidden');
    $gnbWrap.removeAttr('style');
  };
  return {
    on: _on,
    off: _off
  };
}();
var gnb = function () {
  var _open = function _open() {
    $('html').addClass(gnbOpenName);
    $gnbWrap.off('transitionend.open webkitTransitionEnd.open').on('transitionend.open webkitTransitionEnd.open', function () {
      $btnMenuClose.focus();
      $('html,body').addClass(noScrollName);
      $gnbWrap.off('transitionend.open webkitTransitionEnd.open');
      accessibilityGnb.on();
    });
  };
  var _close = function _close() {
    $('html,body').removeClass(noScrollName);
    accessibilityGnb.off();
    $('html').removeClass(gnbOpenName);
    $btnMenuOpen.focus();
  };
  var _init = function _init() {
    if ($('html').hasClass('ie')) {
      Stickyfill.add($('#dsmtLnb'));
    }
    $btnMenuOpen.on('click', function (e) {
      e.preventDefault();
      if (!$('html').hasClass(gnbOpenName)) _open();
    });
    $btnMenuClose.on('click', function (e) {
      e.preventDefault();
      if ($('html').hasClass(gnbOpenName)) _close();
    });
  };
  return {
    open: _open,
    close: _close,
    init: _init
  };
}();
gnb.init();
/* // header GNB */

/* page LNB */
var lnbOff = false;
var accessibilityLnb = function () {
  var $hiddenEl = $('#dsmtContents, #fabButton, #dsmtFooter');
  var _on = function _on() {
    $hiddenEl.attr('aria-hidden', true);
    $lnbBtn.attr('aria-expanded', true);
    $lnb.find('.lnb').attr('aria-hidden', false);
  };
  var _off = function _off() {
    $hiddenEl.removeAttr('aria-hidden');
    $lnbBtn.attr('aria-expanded', false);
    $lnb.find('.lnb').attr('aria-hidden', true);
  };
  return {
    on: _on,
    off: _off
  };
}();
var lnb = function () {
  var openName = 'open';
  var _open = function _open() {
    $lnb.addClass(openName);
    accessibilityLnb.on();
  };
  var _close = function _close() {
    $lnb.removeClass(openName);
    accessibilityLnb.off();
  };
  var _off = function _off() {
    _close();
    $lnb.find('.lnb').attr('aria-hidden', false);
  };
  var _init = function _init() {
    _off();
    $lnbBtn.on('click', function (e) {
      if (window.innerWidth < _mobileSize) {
        e.preventDefault();
        if (!$lnb.hasClass(openName)) _open();else _close();
      }
    });
    $lnb.find('.bg').on('click.lnbBg', function () {
      _close();
    });
    $window.on('scroll', function (e) {
      if ($lnb.hasClass(openName)) _close();
    });
    $window.on('resize', function () {
      var winW = $window.innerWidth();
      if (winW >= _mobileSize) {
        if (!lnbOff) {
          _off();
          lnbOff = true;
        }
      } else {
        lnbOff = false;
      }
    });
  };
  return {
    open: _open,
    close: _close,
    off: _off,
    init: _init
  };
}();
lnb.init();
/* // page LNB */

/* header scroll effect */
var h_prevWinST = 0;
var h_curWinST = $window.scrollTop();
var kvHeight = 0;
var h_Height = 0;
var hideName = 'header-hide';
var fixedName = 'header-fixed';
var h_scrollTimer = null;
function headerHide() {
  $('html').addClass(hideName);
  if (window.innerWidth >= _mobileSize) {
    $header.on('transitionend.hide webkitTransitionEnd.hide', function () {
      $header.hide();
    });
  }
}
function headerShow() {
  $header.off('transitionend.hide webkitTransitionEnd.hide');
  $header.show();
  $('html').removeClass(hideName);
}
var hDelay = $('html').hasClass('ie') ? 30 : 20;
$window.on('scroll', function (e) {
  clearTimeout(h_scrollTimer);
  h_scrollTimer = setTimeout(function () {
    h_curWinST = $window.scrollTop();
    h_Height = $header.outerHeight();
    kvHeight = $('.page-key-visual').length ? $('.page-key-visual').height() : h_Height;
    if ($lnb.hasClass('open')) $lnb.removeClass('open');
    var _hideST = kvHeight;
    if (kvHeight != h_Height) {
      _hideST = kvHeight - h_Height / 2;
    }
    if ($('html').hasClass('ie')) {
      _hideST = kvHeight;
    }
    if (Math.abs(h_prevWinST - h_curWinST) > 200) {
      if (_hideST < h_curWinST) {
        $('html').addClass(fixedName);
        h_prevWinST > h_curWinST ? headerShow() : headerHide();
      } else {
        $('html').removeClass(fixedName);
        headerShow();
      }
    }
    h_prevWinST = h_curWinST;
  }, hDelay);
}).trigger('scroll');
/* // header scroll effect */

/* FAQ list */
var faqBtn = function faqBtn() {
  $('.faq-q button').on('click', function () {
    var $selected = $(this).closest('.faq-list');
    !$selected.hasClass('active') ? $selected.addClass('active') : $selected.removeClass('active');
    !$selected.hasClass('active') ? $(this).attr('aria-expanded', false) : $(this).attr('aria-expanded', true);
    if ($selected.hasClass('active')) {
      $selected.find('.faq-a').attr('tabindex', 1);
      setTimeout(function () {
        $selected.find('.faq-a').focus();
      }, 500);
      setTimeout(function () {
        $selected.find('.faq-a').removeAttr('tabindex');
      }, 1000);
    }
  });
};
/* // FAQ list */

/* dropdown */
var dropdown = function () {
  var $dropdownWrap = $('.dropdown-wrap');
  var $selectBox = $dropdownWrap.find('select');
  $selectBox.before('<button id="dropdown-menu" class="dropdown-btn" aria-haspopup="listbox" aria-expanded="false"></button>');
  $dropdownWrap.append('<div class="dropdown-menu" role="listbox" aria-labelledby="dropdown-menu"></div>');
  var $optionList = $('.dropdown-menu');
  var $selectBtn = $('.dropdown-btn');
  var _init = function _init() {
    var selectOption;
    $selectBox.find('option').each(function (i) {
      var optionText = $(this).text();
      $optionList.append('<button aria-selected="false" role="option">' + optionText + '</button>');
      if ($(this).attr('selected')) {
        selectOption = $(this).index();
      }
    });
    selectOption == undefined ? $optionList.find('button:first-child').addClass('selected') : $optionList.find('button').eq(selectOption).addClass('selected');
    _optionInit();
    _selectActive();
    _optionClick();
    _keyboardControl();
  };
  var _optionInit = function _optionInit() {
    $selectBtn.text($optionList.find('button.selected').text());
    $optionList.find('button').attr('aria-selected', false);
    $optionList.find('button.selected').attr('aria-selected', true);
  };
  var _selectActive = function _selectActive() {
    $(document).click(function (e) {
      var $target = $(e.target);
      if ($target.closest('.dropdown-wrap').length && !$selectBox.hasClass('active')) {
        $selectBox.addClass('active');
        $selectBtn.attr('aria-expanded', true);
      } else {
        $selectBox.removeClass('active');
        $selectBtn.attr('aria-expanded', false);
      }
    });
  };
  var _optionClick = function _optionClick() {
    $optionList.on('click', 'button', function () {
      $optionList.find('button').removeClass('selected');
      optionIdx = $(this).addClass('selected').index();
      $selectBox.find('option').prop('selected', false).removeAttr('aria-selected');
      $selectBox.find('option').eq(optionIdx).prop('selected', true).attr('aria-selected', true);
      $selectBtn.attr('aria-expanded', false);
      $selectBox.removeClass('active').trigger('change');
      _optionInit();
      setTimeout(function () {
        $selectBtn.focus();
      }, 100);
      return false;
    });
  };
  var _keyboardControl = function _keyboardControl() {
    $selectBox.on('keydown', function (e) {
      if (e.keyCode == 13) {
        !$selectBox.hasClass('active') ? $selectBox.addClass('active') : $selectBox.removeClass('active');
      } else if (e.keyCode == 40) {
        $optionList.find('button:first-child').focus();
        return false;
      }
    });
    $selectBtn.on('keydown', function (e) {
      if ($selectBox.hasClass('active') && e.keyCode == 40) {
        $optionList.find('button:first-child').focus();
        return false;
      }
    });
    $optionList.on('keydown', 'button', function (e) {
      if (e.keyCode == 38) {
        $(this).prev().focus();
        return false;
      } else if (e.keyCode == 40) {
        $(this).next().focus();
        return false;
      }
    });
  };
  return {
    init: _init,
    optionInit: _optionInit,
    selectActive: _selectActive,
    optionClick: _optionClick,
    keyboardControl: _keyboardControl
  };
}();
dropdown.init();
/* // dropdown */

/* intersection observer */
var itemTransformY = 100;
var observerOptions = {
  threshold: 0.3
};
var itemShowValue = {
  ease: 'power4.out',
  duration: 0.8,
  opacity: 1,
  y: 0
};
var observerCallback = function observerCallback(entries, dsmtObserver) {
  entries.forEach(function (entry) {
    if (entry.boundingClientRect.y - itemTransformY < $(window).height()) {
      dsmtObserver.unobserve(entry.target);
      gsap.to(entry.target, itemShowValue);
    } else if (entry.isIntersecting) {
      dsmtObserver.unobserve(entry.target);
      gsap.to(entry.target, itemShowValue);
    }
  });
};
var dsmtObserver = new IntersectionObserver(observerCallback, observerOptions);
var observerItems = $('[data-will-change]');
observerItems.each(function (i, obj) {
  dsmtObserver.observe(obj);
});
/* // intersection observer */

/* fab button */
var $fabBtn = $('#fabButton');
if ($fabBtn.length) {
  var hideFab = function hideFab() {
    gsap.to($fabBtn, {
      duration: 0.3,
      opacity: 0,
      x: '200%',
      onComplete: function onComplete() {
        $fabBtn.removeClass('active').css('visibility', 'hidden');
        fabActive = false;
      }
    });
  };
  var showFab = function showFab() {
    fabActive = true;
    $fabBtn.css('visibility', 'visible');
    gsap.to($fabBtn, {
      duration: 0.3,
      opacity: 1,
      x: 0
    });
  };
  var f_prevWinST = 0;
  var f_curWinST = $window.scrollTop();
  var fabActive = false;
  var f_scrollTimer = null;
  gsap.set($fabBtn, {
    opacity: 0,
    x: '200%'
  });
  $window.on('scroll', function (e) {
    clearTimeout(f_scrollTimer);
    f_scrollTimer = setTimeout(function () {
      f_curWinST = $window.scrollTop();
      if (f_prevWinST > f_curWinST) {
        if (!fabActive) {
          showFab();
        }
      } else {
        if (fabActive) {
          hideFab();
        }
      }
      if (f_curWinST == 0) {
        hideFab();
      }
      f_prevWinST = f_curWinST;
    }, 30);
  }).trigger('scroll');
  $('#fabButton').on('click', function (e) {
    gsap.to(window, {
      ease: 'circ.out',
      duration: 0.6,
      scrollTo: 0
    });
  });
}
/* // fab button */

$('.button-outline, a.badge-item').on('touchstart', function () {});
$('.view-contents .view-bottom a[disabled]').on('click', function (e) {
  e.preventDefault();
});

/* form */
function checkTextareaCounter() {
  $('textarea.form-text-area').each(function () {
    var _this = $(this);
    var maxLeng = Number(_this.data('maxlength'));
    _this.on('keyup paste input', function () {
      var thisCount = $(this).val().length;
      var counter = $(this).next('.form-counter').find('em');
      if (!counter) return false;
      if (thisCount < maxLeng) {
        counter.html(thisCount);
      } else {
        counter.html(maxLeng);
        var maxText = _this.val().substr(0, maxLeng);
        _this.val(maxText);
      }
      if (thisCount > 0) {
        $(this).next('.form-counter').addClass('active');
      } else {
        $(this).next('.form-counter').removeClass('active');
      }
    });
  });
}
if ($('textarea.form-text-area').length) {
  checkTextareaCounter();
}
function checkMaxInput() {
  $('.max-input').each(function () {
    var _this = $(this);
    var maxLeng = window.innerWidth > 767 ? Number(_this.data('maxlength')) : Number(_this.data('maxlength')) - 2;
    _this.on('keyup paste input', function () {
      var thisCount = $(this).val().length;
      if (thisCount < maxLeng) {} else {
        var maxText = _this.val().substr(0, maxLeng);
        _this.val(maxText);
      }
    });
  });
}
if ($('.max-input').length) {
  checkMaxInput();
}
/* //form */

/* footer - breadcrumbs */
var crumbsW = 0;
var crumbsLeng = $('#dsmtFooter .breadcrumb-list li').length;
var crumbsLengCur = crumbsLeng - 2;
if ($('#dsmtFooter .breadcrumb-list').length) {
  $('#dsmtFooter .breadcrumb-list li').each(function () {
    crumbsW += $(this).outerWidth();
  });
  crumbsW += 12;
  $window.on('resize', function () {
    if (crumbsLeng < 3) return false;
    resizeBreadcrumbs();
  }).resize();
}
function resizeBreadcrumbs() {
  var $footer = $('#dsmtFooter .footer-inner');
  var _wW = window.innerWidth;
  _wW -= parseInt($footer.css('padding-left'));
  _wW -= parseInt($footer.css('padding-right'));
  var $breadcrumbs = $('#dsmtFooter .breadcrumb-list');
  var $ellipsis = '<em class="ellipsis" aria-hidden="true">...</em>';
  if (_wW <= Math.round(crumbsW)) {
    if (!$breadcrumbs.find('li a').find('.ellipsis').length) {
      $breadcrumbs.find('li:eq(' + crumbsLengCur + ') a').append($ellipsis);
    }
    $breadcrumbs.addClass('trunscated');
    $breadcrumbs.find('li:eq(' + crumbsLengCur + ')').addClass('smaller');
  } else {
    $breadcrumbs.removeClass('trunscated');
    $breadcrumbs.find('li:eq(' + crumbsLengCur + ')').removeClass('smaller');
  }
}
/* //footer - breadcrumbs */