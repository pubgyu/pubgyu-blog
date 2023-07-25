var html = document.documentElement;
var dsmtHeader = document.querySelector('#dsmtHeader');
var stickyWrap = document.querySelectorAll('.sticky-wrap');
var srotyWrap = document.getElementById('story-wrap');
var srotyScrollCon = document.getElementById('story-scroll-container');
var dsmtGnb = document.getElementById('dsmtGnb');
var doesPageBtn = document.querySelector('.does-page-btn');
var topBtn = document.getElementById('topButton');
var browserRecommend = document.querySelector('.browser-recommend');
if (navigator.maxTouchPoints == 5 && !/Android/i.test(navigator.userAgent)) html.classList.add('iphone');
if (navigator.maxTouchPoints == 5 && /Android/i.test(navigator.userAgent)) html.classList.add('android');
if (/KAKAOTALK/i.test(navigator.userAgent)) html.classList.add('kakaotalk');
if (navigator.maxTouchPoints == 5 && navigator.userAgent.match(/android\s([0-9\.]*)/i)) html.classList.add('old-android');
window.PREV_WIDTH_SIZE;
window.CURRENT_WIDTH_SIZE;
window.STORYIPHONE = html.classList.contains('iphone');
window.STORYANDROID = html.classList.contains('android');
window.STORYOLDANDROID = html.classList.contains('old-android');
if (STORYANDROID) html.classList.add('mobile');
window.STORYMOBILE = html.classList.contains('mobile');
window.STORYKAKAOTALK = html.classList.contains('kakaotalk');
window.STORYIE = html.classList.contains('ie');
window.STORYIE10 = html.classList.contains('ie10');
window.STORYCHROME = html.classList.contains('chrome');
window.STORYLOAD = false;
window.motionArray = [];
window.voiceActive = false;
var scrollParent = !STORYIPHONE && !STORYANDROID ? window : document.querySelector('#story-wrap');
var currentScrollOffset;
var resizeSet;
var resizeSet2;
var voiceInputFocus = false;
window.v3SetTime1;
window.v3SetTime2;
window.v3SetTime3;
window.v3SetTime4;
window.vestibulopathyLoadActive = false;
// 전정장애 기능 활성화시 true

window.STORY = {
  FFF0: 'rgba(255,255,255,0)',
  FFF1: 'rgba(255,255,255,1)',
  wW: Math.min(1920, window.innerWidth),
  wH: window.innerHeight,
  wOH: window.outerHeight,
  scrollDuration: !STORYMOBILE ? 0.9 : !STORYKAKAOTALK ? !STORYANDROID ? 0 : .95 : .8,
  fakeHeader: false,
  load: function load() {
    STORYLOAD = true;
    STORY.resize();
    setTimeout(function () {
      if (!STORYIE) STORY.scrollShow();
      doesPageBtnEvent.resize();
      if (vestibulopathyLoadActive) vestibulopathyEvent.show();
      browserRecommendEvent.show();
    }, 100);
    document.querySelector('.sticky-wrap.sticky1').classList.add('show');
    document.querySelector('.sticky-wrap.sticky1 .message-txt').classList.add('txt-show');
    var scrollInduceAni = lottie.loadAnimation({
      container: document.querySelector('.scroll-induce-wrap'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      rendererSettings: {
        className: 'scroll-induce-svg'
      },
      path: './assets/json/story/scrollAffordance.json'
    });
    document.querySelector('.scroll-induce-wrap').style.opacity = 1;
  },
  scroll: function scroll(callback, _ease) {
    gsap.ticker.fps(0);
    _ease = !_ease ? 0 : _ease;
    var esScroller = {
      ease: 1 - _ease,
      endY: 0,
      y: 0,
      scrolled: true
    };
    var rafTimeout = null;
    function esUpdate() {
      _ease = STORY.scrollDuration;
      esScroller.ease = 1 - _ease;
      var scrollY = !STORYIPHONE && !STORYANDROID ? window.pageYOffset : document.querySelector('#story-wrap').scrollTop;
      esScroller.endY = scrollY;
      esScroller.y += (scrollY - esScroller.y) * esScroller.ease;
      if (Math.abs(scrollY - esScroller.y) < esScroller.ease) {
        esScroller.y = scrollY;
        esScroller.scrolled = false;
        gsap.ticker.remove(esUpdate);
      }
      rafTimeout = esScroller.scrolled ? gsap.ticker.add(esUpdate) : null;
      if (callback) callback(esScroller.y);
    }
    return function () {
      esScroller.scrolled = true;
      if (!rafTimeout) rafTimeout = gsap.ticker.add(esUpdate);
    };
  },
  bodyScroll: function bodyScroll(y) {
    if (STORYLOAD) {
      srotyScrollCon.style.transform = 'translate3d(0,' + -y + 'px,0)';
      STORY.stickyScroll(y);
      doesPageBtnEvent.scroll(y);
      document.querySelector('.scroll-induce-wrap').style.opacity = 1 - y / 1000;
      if (!STORYMOBILE) {
        vestiScrollPercent = y / (document.querySelector('.page-all-height').clientHeight - STORY.wH) * 100;
      } else {
        vestiScrollPercent = y / (document.querySelector('.mobile-page-all-height').clientHeight - STORY.wH) * 100;
      }
      preTarget = y;
    }
  },
  stickyScroll: function stickyScroll(y) {
    stickyWrap.forEach(function (_this, idx) {
      var stickyCon = _this.querySelector('.sticky-con');
      var _move, _percent, _percent2;
      _percent = Math.max(0, Math.min(1, (y - _this.offsetTop) / (_this.clientHeight - STORY.wH)));
      _percent2 = Math.max(0, Math.min(1, (y - _this.offsetTop) / _this.clientHeight));
      if (!_this.classList.contains('cover-sticky')) {
        _move = Math.max(-STORY.wH * 2, Math.min(_this.clientHeight, y - _this.offsetTop));
      } else {
        _move = Math.max(-STORY.wH * 2, Math.min(_this.clientHeight - STORY.wH, y - _this.offsetTop));
      }
      stickyCon.style.transform = 'translate3d(0,' + _move + 'px,0)';
      if (_move < 0) _this.classList.remove('show');
      if (!_this.classList.contains('cover-sticky')) {
        if (_move >= 0 && _move < _this.clientHeight) _this.classList.add('show');
        if (_move >= _this.clientHeight) _this.classList.remove('show');
      } else {
        if (_move >= 0 && _move < _this.clientHeight - STORY.wH) {
          _this.classList.add('show');
          _this.classList.remove('hide');
        }
        if (_move >= _this.clientHeight - STORY.wH) {
          if (_percent2 == 1) {
            _this.classList.remove('hide');
          } else {
            _this.classList.add('hide');
          }
          _this.classList.remove('show');
        }
      }
      if (_this.classList.contains('show') || _this.classList.contains('hide')) {
        if (motionArray[idx - 1] && motionArray[idx - 1].scroll) {
          motionArray[idx - 1].scroll(_percent, _percent2);
        }
      }
      var V3Show = document.querySelector('.section-voice.v3').classList.contains('show');
      var V3Hide = document.querySelector('.section-voice.v3').classList.contains('hide');
      if (voiceActive) {
        if (V3Show || V3Hide) {
          STORY.topShow();
        } else {
          STORY.topHide();
        }
      } else {
        STORY.topHide();
      }
    });
  },
  resize: function resize() {
    STORY.wW = Math.min(1920, window.innerWidth);
    PREV_WIDTH_SIZE = STORY.wW;
    clearTimeout(resizeSet);
    resizeSet = setTimeout(function () {
      STORY.wH = html.classList.contains('chrome') && STORYMOBILE ? window.outerHeight + 2 : window.innerHeight + 2;
      STORY.wOH = window.outerHeight + 2;
      if (STORYKAKAOTALK) STORY.wH = window.outerHeight + 2;
      document.documentElement.style.setProperty('--vh', "".concat(STORY.wH, "px"));
      stickyWrap.forEach(function (_this, idx) {
        _this.style.marginTop = -STORY.wH + 'px';
        if (motionArray[idx - 1] && motionArray[idx - 1].resize) {
          motionArray[idx - 1].resize();
        }
      });
      if (!STORYMOBILE) {
        document.querySelector('.page-all-height').style.height = srotyScrollCon.clientHeight + 'px';
      } else {
        document.querySelector('.mobile-page-all-height').style.height = srotyScrollCon.clientHeight + 'px';
      }
      if (STORY.wW >= STORY.wH) {
        html.classList.add('horizon');
      } else {
        html.classList.remove('horizon');
      }
      CURRENT_WIDTH_SIZE = STORY.wW;
      clearTimeout(resizeSet2);
      resizeSet2 = setTimeout(function () {
        currentScrollOffset = !STORYIPHONE && !STORYANDROID ? window.pageYOffset : document.querySelector('#story-wrap').scrollTop;
        scrollParent.scrollTo(0, currentScrollOffset + 1);
      }, 500);
    }, 100);
  },
  topShow: function topShow() {
    document.querySelectorAll('.does-page-btn').forEach(function (_this) {
      _this.classList.add('top-show');
    });
    topBtn.classList.add('top-show');
  },
  topHide: function topHide() {
    document.querySelectorAll('.does-page-btn').forEach(function (_this) {
      _this.classList.remove('top-show');
    });
    topBtn.classList.remove('top-show');
  },
  scrollShow: function scrollShow() {
    html.classList.remove('scroll-hide');
    srotyScrollCon.style.paddingRight = 0;
    doesPageBtn.style.right = 0;
  },
  scrollHide: function scrollHide() {
    html.classList.add('scroll-hide');
    srotyScrollCon.style.paddingRight = window.getScrollbarWidth() + 'px';
    doesPageBtn.style.right = window.getScrollbarWidth() + 'px';
  },
  polygon: function polygon(p, x, y, radius, npoints) {
    var angle = p.TWO_PI / npoints;
    p.beginShape();
    for (var a = 0; a < p.TWO_PI; a += angle) {
      var sx = x + p.cos(a) * radius;
      var sy = y + p.sin(a) * radius;
      p.vertex(sx, sy);
    }
    p.endShape(p.CLOSE);
  },
  headerEffectOff: function headerEffectOff() {
    html.classList.add('header-color-none');
  },
  headerEffectOn: function headerEffectOn() {
    html.classList.remove('header-color-none');
  },
  fakeHeaderShow: function fakeHeaderShow(percent, start, speed, pageSpeed, reverse) {
    if (!html.classList.contains('ie')) {
      STORY.headerEffectOff();
      if (!STORY.fakeHeader) {
        STORY.fakeHeader = true;
        var fakeHeader = $('.header-wrap').clone();
        var fakePageBtn = $('.does-page-btn').clone();
        fakeHeader[0].classList.add('fake-header');
        fakeHeader[0].setAttribute('aria-hidden', 'true');
        fakePageBtn[0].classList.add('fake-page');
        fakePageBtn[0].setAttribute('tabIndex', '-1');
        fakePageBtn[0].setAttribute('aria-hidden', 'true');
        dsmtHeader.append(fakeHeader[0]);
        document.body.append(fakePageBtn[0]);
      }
      var pp = Math.min(1, (percent - start) * speed);
      var increaseOpacity = !reverse ? 1 - pp : pp;
      var pp2 = Math.min(1, (percent - start) * pageSpeed);
      var increaseOpacity2 = !reverse ? 1 - pp : pp2;
      if (dsmtHeader.querySelector('.fake-header')) dsmtHeader.querySelector('.fake-header').style.opacity = increaseOpacity;
      if (document.querySelector('.fake-page')) document.querySelector('.fake-page').style.opacity = increaseOpacity2;
    }
  },
  fakeHeaderHide: function fakeHeaderHide() {
    if (!html.classList.contains('ie')) {
      STORY.headerEffectOn();
      if (STORY.fakeHeader) {
        STORY.fakeHeader = false;
        dsmtHeader.querySelector('.fake-header').remove();
        document.querySelector('.fake-page').remove();
      }
    }
  }
};
if (!STORYIPHONE && !STORYANDROID) {
  window.addEventListener('scroll', STORY.scroll(STORY.bodyScroll, STORY.scrollDuration));
} else {
  document.querySelector('#story-wrap').addEventListener('scroll', STORY.scroll(STORY.bodyScroll, STORY.scrollDuration));
}
window.addEventListener('resize', function () {
  if (!STORYKAKAOTALK) {
    if (!voiceInputFocus) STORY.resize();
  } else {
    var sV2Show = document.querySelector('.section-voice.v2').classList.contains('show');
    var sV3Show = document.querySelector('.section-voice.v3').classList.contains('show');
    var sV3Hide = document.querySelector('.section-voice.v3').classList.contains('hide');
    if (!sV2Show && !sV3Show) {
      if (!sV3Hide) STORY.resize();
    }
    currentScrollOffset = !STORYIPHONE ? window.pageYOffset : document.querySelector('#story-wrap').scrollTop;
    scrollParent.scrollTo(0, currentScrollOffset + 1);
  }
});

// ie wheel
window.addEventListener('wheel', function (e) {
  if (STORYIE && ieScroll) {
    e.preventDefault();
    currentScrollOffset = !STORYIPHONE && !STORYANDROID ? window.pageYOffset : document.querySelector('#story-wrap').scrollTop;
    if (e.deltaY > 0) {
      scrollParent.scrollTo(0, currentScrollOffset + 150);
    } else {
      scrollParent.scrollTo(0, currentScrollOffset - 150);
    }
  }
});

//android
var touchAndroid = {
  prevY: 0,
  currentY: 0,
  moveY: 0,
  start: function start(e) {
    this.prevY = e.changedTouches[0].clientY;
  },
  move: function move(e) {
    this.currentY = e.changedTouches[0].clientY;
    this.moveY += 1;
    currentScrollOffset = !STORYIPHONE && !STORYANDROID ? window.pageYOffset : document.querySelector('#story-wrap').scrollTop;
    if (Math.abs(this.prevY - this.currentY) > 10 && this.moveY < 20) {
      scrollParent.scrollTo(0, currentScrollOffset + (this.prevY - this.currentY) * 2.5);
    } else {
      this.prevY = this.currentY;
    }
  },
  end: function end(e) {
    this.moveY = 0;
  }
};
window.addEventListener('touchstart', function (e) {
  touchAndroid.start(e);
});
window.addEventListener('touchmove', function (e) {
  if (STORYANDROID && !html.classList.contains('scroll-hide')) touchAndroid.move(e);
});
window.addEventListener('touchend', function (e) {
  touchAndroid.end(e);
});
var mobileAllHeight;
var mobileKeyboard;
var setOldAnd;
document.querySelector('.voice-mask .text-input').addEventListener('focus', function (e) {
  voiceInputFocus = true;
  if (!STORYIE && STORYANDROID) {
    setTimeout(function () {
      STORY.scrollDuration = 0.95;
      var secV3 = document.querySelector('.section-voice.v3');
      if (!STORYOLDANDROID) {
        scrollParent.scrollTo(0, secV3.offsetTop + secV3.clientHeight - STORY.wH + STORY.wH * 0.28);
      } else {
        clearTimeout(setOldAnd);
        setOldAnd = setTimeout(function () {
          scrollParent.scrollTo(0, secV3.offsetTop + secV3.clientHeight - STORY.wH + STORY.wH * 0.28);
          mobileKeyboard = STORY.wH - window.innerHeight;
          mobileAllHeight = document.querySelector('.mobile-page-all-height').clientHeight - mobileKeyboard;
          document.querySelector('.mobile-page-all-height').style.height = mobileAllHeight + 'px';
        }, 500);
      }
    }, 150);
  }
});
document.querySelector('.voice-mask .text-input').addEventListener('blur', function (e) {
  voiceInputFocus = false;
  STORY.scrollDuration = !STORYMOBILE ? 0.9 : !STORYKAKAOTALK ? !STORYANDROID ? 0 : .95 : .8;
  if (STORYOLDANDROID) {
    mobileAllHeight = document.querySelector('.mobile-page-all-height').clientHeight + mobileKeyboard;
    document.querySelector('.mobile-page-all-height').style.height = mobileAllHeight + 'px';
  }
});
var topSetTime1;
var topSetTime2;
// top button
topBtn.addEventListener('click', function (_this) {
  doesPageDimmed.classList.add('show');
  if (!doesPageDimmed.classList.contains('hide')) {
    $(doesPageDimmed).on('transitionend.trans1', function () {
      clearTimeout(topSetTime1);
      topSetTime1 = setTimeout(function () {
        STORY.scrollDuration = 0;
        document.querySelector('#dsmtHeader').removeAttribute('data-color-type');
        document.querySelector('.section-voice.v3').classList.remove('hide');
        scrollParent.scrollTo(0, 0);
        doesPageDimmed.classList.add('hide');
        clearTimeout(topSetTime2);
        topSetTime2 = setTimeout(function () {
          doesPageDimmed.classList.remove('show');
          doesPageDimmed.classList.remove('hide');
          STORY.scrollDuration = !STORYMOBILE ? 0.9 : !STORYKAKAOTALK ? !STORYANDROID ? 0 : .95 : .8;
          $(doesPageDimmed).off('transitionend.trans1');
        }, 1400);
      }, 800);
    });
  }
});

// youtube
var _tag = document.createElement('script');
_tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(_tag, firstScriptTag);
var storyYoutubeArray = [];
function onYouTubeIframeAPIReady() {
  document.querySelectorAll('.youtube-video-layer .video-wrap').forEach(function (_this) {
    var youtubeIframe = _this.querySelector('div');
    var ytSrc = _this.getAttribute('data-src');
    var ytTitle = _this.getAttribute('data-title');
    var player = new YT.Player(youtubeIframe, {
      playerVars: {
        'showinfo': 0,
        'rel': 0,
        'loop': 1,
        'playsinline': 1
      },
      videoId: ytSrc
    });
    storyYoutubeArray.push(player);
    $(_this).find('iframe').attr('title', ytTitle);
  });
}
document.querySelectorAll('iframe', function (_this) {
  _this.onload = function (e) {
    _this.contentWindow.postMessage('hello frame', '*');
  };
});

// dose video
var videoShowSetTime1;
var videoShowSetTime2;
var videoShowSetTime3;
var videoShowSetTime4;
var doesVideo = {
  play: function play(_this) {
    STORY.scrollHide();
    var thisLayer = document.querySelector('.youtube-video-layer');
    var idx = _this.getAttribute('data-idx');
    thisLayer.classList.add('show');
    clearTimeout(videoShowSetTime1);
    videoShowSetTime1 = setTimeout(function () {
      thisLayer.classList.add('visible');
    }, 50);
    document.querySelectorAll('.skip-to-content-link *').forEach(function (_this) {
      _this.setAttribute('tabIndex', '-1');
      _this.setAttribute('aria-hidden', 'true');
    });
    dsmtHeader.querySelectorAll('*').forEach(function (_this) {
      _this.setAttribute('tabIndex', '-1');
      _this.setAttribute('aria-hidden', 'true');
    });
    srotyWrap.querySelectorAll('*').forEach(function (_this) {
      _this.setAttribute('tabIndex', '-1');
      _this.setAttribute('aria-hidden', 'true');
    });
    doesPageBtn.querySelectorAll('*').forEach(function (_this) {
      _this.setAttribute('tabIndex', '-1');
      _this.setAttribute('aria-hidden', 'true');
    });
    storyYoutubeArray[idx].playVideo();
    thisLayer.querySelectorAll('.video-wrap').forEach(function (_this, i) {
      if (i == idx) {
        _this.style.display = 'block';
        _this.querySelector('iframe').focus();
        clearTimeout(videoShowSetTime2);
        videoShowSetTime2 = setTimeout(function () {
          _this.classList.add('show');
        }, 50);
      }
    });
    doesPageBtn.setAttribute('aria-hidden', 'true');
  },
  pause: function pause(_this) {
    if (STORYMOBILE && html.classList.contains('horizon')) {
      STORY.scrollHide();
    } else {
      STORY.scrollShow();
    }
    var thisLayer = document.querySelector('.youtube-video-layer');
    var idx = _this.getAttribute('data-idx');
    STORY.scrollDuration = !document.querySelector('.horizontal-message').classList.contains('show') ? 0.985 : 0.9;
    if (!STORYIE10) storyYoutubeArray[idx].pauseVideo();
    document.querySelectorAll('.skip-to-content-link *').forEach(function (_this) {
      _this.removeAttribute('tabIndex');
      if (!_this.classList.contains('aria-hidden')) _this.removeAttribute('aria-hidden');
    });
    dsmtHeader.querySelectorAll('*').forEach(function (_this) {
      _this.removeAttribute('tabIndex');
      if (!_this.classList.contains('aria-hidden')) _this.removeAttribute('aria-hidden');
    });
    srotyWrap.querySelectorAll('*').forEach(function (_this) {
      _this.removeAttribute('tabIndex');
      if (!_this.classList.contains('aria-hidden')) _this.removeAttribute('aria-hidden');
    });
    doesPageBtn.querySelectorAll('*').forEach(function (_this) {
      _this.removeAttribute('tabIndex');
      if (!_this.classList.contains('aria-hidden')) _this.removeAttribute('aria-hidden');
    });
    thisLayer.querySelectorAll('.video-wrap').forEach(function (_this, i) {
      if (i == idx) {
        _this.classList.remove('show');
        thisLayer.classList.remove('visible');
        clearTimeout(videoShowSetTime3);
        videoShowSetTime3 = setTimeout(function () {
          _this.style.display = 'none';
          thisLayer.classList.remove('show');
          document.querySelectorAll('.button-video-play').forEach(function (_this, i) {
            var mobileHorizon = document.querySelector('.horizontal-message').classList.contains('show') ? true : false;
            var parent = _this.closest('.sticky-wrap');
            var _endScroll;
            if (i == 0) {
              _endScroll = 200;
            }
            if (i == 1) {
              _endScroll = !mobileHorizon ? 700 : -1000;
            }
            if (i == 2) {
              _endScroll = !mobileHorizon ? 0 : -2500;
            }
            if (i == idx) {
              _this.focus();
              if (!vestibulopathyWrap.classList.contains('active') && !html.classList.contains('ie')) scrollParent.scrollTo({
                top: parent.offsetTop + parent.clientHeight + _endScroll,
                behavior: 'smooth'
              });
            }
          });
          if (!vestibulopathyWrap.classList.contains('active')) {
            clearTimeout(videoShowSetTime4);
            videoShowSetTime4 = setTimeout(function () {
              STORY.scrollDuration = !STORYMOBILE ? 0.9 : !STORYKAKAOTALK ? !STORYANDROID ? 0 : .95 : .8;
            }, 2000);
          }
        }, 100);
      }
    });
    doesPageBtn.removeAttribute('aria-hidden');
  }
};
document.querySelectorAll('.button-video-play').forEach(function (i) {
  i.addEventListener('click', function () {
    doesVideo.play(this);
  });
});
document.querySelectorAll('.youtube-layer-close').forEach(function (i) {
  i.addEventListener('click', function () {
    doesVideo.pause(this);
  });
});

// page btn
var doesPageContainer = document.querySelector('.does-page-container');
var doesPageDimmed = document.querySelector('.does-page-dimmed');
var doesPageBtnClick = true;
var doesPageBtnScroll = true;
var doesPageHash = [];
var doesPageArticle = [];
var preTarget = 0;
var clickSetTime1;
var clickSetTime2;
var clickSetTime3;
var clickSetTime4;
var mobilePageClick = false;
var doesPageBtnEvent = {
  show: function show() {
    if (STORYLOAD) {
      mobilePageClick = true;
      doesPageBtn.classList.add('show');
      doesPageContainer.classList.add('show');
      if (document.querySelector('.fake-page')) document.querySelector('.fake-page').classList.add('hide');
    }
  },
  hide: function hide() {
    if (STORYLOAD) {
      mobilePageClick = false;
      doesPageBtn.classList.remove('show');
      doesPageContainer.classList.remove('show');
      if (document.querySelector('.fake-page')) document.querySelector('.fake-page').classList.remove('hide');
    }
  },
  offset: function offset(target) {
    doesPageHash = [];
    doesPageBtn.querySelectorAll('a').forEach(function (_this, idx) {
      var articleId = _this.getAttribute('href');
      if (document.querySelector(articleId)) {
        var _top = document.querySelector(articleId).offsetTop + STORY.wH;
        if (articleId == '#brand-introduction') _top = _top - STORY.wH;
        if (STORY.wW > 767) {
          if (articleId == '#manifesto-film') _top = _top + 1500;
          if (articleId == '#brand-keywords') _top = _top - 3000;
          if (articleId == '#documentary-film') _top = _top + 2800;
          if (articleId == '#fellowship-introduction') _top = _top + 700;
          if (articleId == '#fellowship-film') _top = _top + 1300;
          if (articleId == '#participatory-contents') _top = _top + 800;
        } else {
          if (articleId == '#manifesto-film') _top = _top + 3400;
          if (articleId == '#brand-keywords') _top = _top - 3000;
          if (articleId == '#documentary-film') _top = _top + 4500;
          if (articleId == '#fellowship-introduction') _top = _top + 1500;
          if (articleId == '#fellowship-film') _top = _top + 2700;
          if (articleId == '#participatory-contents') _top = _top + 800;
        }
        doesPageHash.push(_top);
        doesPageArticle.push(articleId);
      }
    });
  },
  click: function click(_this, idx) {
    if (STORYLOAD) {
      doesPageBtn.querySelectorAll('a').forEach(function (__this) {
        __this.classList.remove('active');
      });
      _this.classList.add('active');
      if (!vestibulopathyEvent.vestibulopathyRemove) vestibulopathyWrap.style.display = 'none';
      doesPageBtnEvent.offset();
      var articleId = _this.getAttribute('href');
      var selectArticle = document.querySelector(articleId);
      if (selectArticle) {
        selectArticle.setAttribute('tabIndex', '1');
        clearTimeout(clickSetTime1);
        clickSetTime1 = setTimeout(function () {
          $(selectArticle).focus();
          selectArticle.setAttribute('tabIndex', '');
        }, 1000);
        doesPageBtnClick = false;
        doesPageBtnScroll = false;
        var _target = doesPageHash[idx];
        if (preTarget != _target) {
          doesPageDimmed.classList.add('show');
          doesPageBtnEvent.hide();
          if (!doesPageDimmed.classList.contains('hide')) {
            $(doesPageDimmed).on('transitionend.trans1', function () {
              STORY.scrollDuration = 0;
              clearTimeout(clickSetTime3);
              clickSetTime3 = setTimeout(function () {
                scrollParent.scrollTo(0, _target);
                scrollParent.onscroll = function (e) {
                  scrollParent.onscroll = null;
                  STORY.fakeHeaderHide();
                  doesPageDimmed.classList.add('hide');
                  clearTimeout(clickSetTime4);
                  clickSetTime4 = setTimeout(function () {
                    doesPageDimmed.classList.remove('show');
                    doesPageDimmed.classList.remove('hide');
                    STORY.scrollDuration = !STORYMOBILE ? 0.9 : !STORYKAKAOTALK ? !STORYANDROID ? 0 : .95 : .8;
                    doesPageBtnClick = true;
                    clearTimeout(clickSetTime2);
                    clickSetTime2 = setTimeout(function () {
                      doesPageBtnScroll = true;
                    }, 1000);
                    preTarget = _target;
                    $(doesPageDimmed).off('transitionend.trans1');
                  }, 1000);
                };
              }, 50);
            });
          }
        } else {
          doesPageBtnClick = true;
          doesPageBtnScroll = true;
        }
      }
    }
  },
  scroll: function scroll(y) {
    doesPageHash.forEach(function (_this, idx) {
      var _top = doesPageHash[idx];
      var _bottom = doesPageHash[idx + 1] ? doesPageHash[idx + 1] : doesPageHash[idx] + 10000;
      if (idx == 2) _top = doesPageHash[idx] - 800;
      if (idx == 4) _top = doesPageHash[idx] - 1300;
      if (y >= _top && y <= _bottom) {
        if (doesPageBtnClick && doesPageBtnScroll) {
          doesPageBtn.querySelectorAll('a').forEach(function (_this) {
            _this.classList.remove('active');
          });
          doesPageBtn.querySelectorAll('a')[idx].classList.add('active');
        }
      }
    });
  },
  resize: function resize() {
    doesPageBtnEvent.offset();
    var _doesPageMargin = Math.max(0, (window.innerWidth - 1920) / 2 - 20);
    doesPageBtn.style.height = '';
  }
};
window.addEventListener('resize', doesPageBtnEvent.resize);

// page btn
doesPageBtn.querySelectorAll('a').forEach(function (_this, idx) {
  _this.addEventListener('click', function (e) {
    e.preventDefault();
    if (STORY.wW <= 767) {
      if (!mobilePageClick) {
        doesPageBtnEvent.show();
      } else {
        doesPageBtnEvent.click(_this, idx);
      }
    } else {
      if (doesPageBtnClick && !vestibulopathyWrap.classList.contains('active')) doesPageBtnEvent.click(_this, idx);
    }
  });
  _this.addEventListener('focus', function () {
    if (STORY.wW > 767 && !vestibulopathyWrap.classList.contains('active')) doesPageBtnEvent.show();
  });
  _this.addEventListener('blur', function () {
    if (STORY.wW > 767) doesPageBtnEvent.hide();
  });
});
doesPageBtn.querySelector('.btn-wrap').addEventListener('mouseenter', function () {
  if (STORY.wW > 767 && !vestibulopathyWrap.classList.contains('active')) doesPageBtnEvent.show();
});
doesPageBtn.querySelector('.btn-wrap').addEventListener('mouseleave', function () {
  if (STORY.wW > 767) doesPageBtnEvent.hide();
});
document.querySelector('.section-voice .text-input').addEventListener('focus', function () {
  document.querySelector('.section-voice .text-input').classList.add('focus');
});
document.querySelector('.section-voice .text-input').addEventListener('blur', function () {
  document.querySelector('.section-voice .text-input').classList.remove('focus');
});

// mobile
doesPageContainer.addEventListener('click', function () {
  if (STORY.wW <= 767 && mobilePageClick) doesPageBtnEvent.hide();
});

// tab focus
var StoryFooter = document.querySelector('#dsmtFooter');
stickyWrap.forEach(function (_this) {
  _this.querySelectorAll('.focus-tab').forEach(function (__this) {
    __this.addEventListener('focus', function () {
      __this.addEventListener('keyup', function (e) {
        if (e.keyCode == 9) window.scrollTo(0, _this.offsetTop + _this.clientHeight - STORY.wH * 1.5);
      });
    });
  });
});
StoryFooter.querySelectorAll('a,button').forEach(function (_this) {
  _this.addEventListener('focus', function () {
    _this.addEventListener('keyup', function (e) {
      if (e.keyCode == 9) {
        window.scrollTo(0, srotyScrollCon.clientHeight);
      }
    });
  });
});
document.addEventListener('keydown', function (e) {
  if (e.keyCode == 9) {
    stickyWrap.forEach(function (_this) {
      _this.classList.add('tab');
    });
  }
});
document.addEventListener('keyup', function (e) {
  if (e.keyCode == 9) {
    stickyWrap.forEach(function (_this) {
      _this.classList.remove('tab');
    });
  }
});

// vestibulopathy
var vestibulopathyWrap = document.querySelector('.vestibulopathy-wrap');
var vestibulopathyCon = vestibulopathyWrap.querySelector('.vestibulopathy-con');
var vestibulopathyActive = vestibulopathyWrap.querySelector('.active-btn');
var vestibulopathyClose = vestibulopathyWrap.querySelector('.close-btn');
var vestibulopathyArrow = vestibulopathyWrap.querySelector('.arrow-wrap');
var vestibulopathyIdx = 0;
var vestiScrollP = 0;
var vestiScrollPercent = 0;
window.vestibulopathyEvent = {
  vestibulopathyRemove: false,
  show: function show() {
    if (!vestibulopathyEvent.vestibulopathyRemove) vestibulopathyWrap.style.display = 'block';
  },
  hide: function hide() {
    if (!vestibulopathyEvent.vestibulopathyRemove) vestibulopathyWrap.style.display = 'none';
  },
  active: function active() {
    vestibulopathyEvent.vestibulopathyRemove = true;
    STORY.scrollHide();
    vestibulopathyEvent.move(vestibulopathyIdx);
    vestibulopathyWrap.classList.add('active');
    html.classList.add('vestibulopathy');
  },
  close: function close() {
    vestibulopathyEvent.vestibulopathyRemove = true;
    vestibulopathyWrap.style.display = 'none';
  },
  move: function move(idx) {
    STORY.scrollDuration = 0;
    if (STORY.wW > 767) {
      var scrollKoEn = !html.classList.contains('en-page') ? 830 : 819;
      var scrollTotalKoEn = !html.classList.contains('en-page') ? 83665 : 83481;
      if (!STORYMOBILE) {
        vestiScrollP = scrollKoEn * idx * (document.querySelector('.page-all-height').clientHeight - window.innerHeight) / scrollTotalKoEn;
      } else {
        vestiScrollP = scrollKoEn * idx * (document.querySelector('.mobile-page-all-height').clientHeight - window.innerHeight) / scrollTotalKoEn;
      }
    } else {
      var _scrollKoEn = !html.classList.contains('en-page') ? 798 : 787;
      var _scrollTotalKoEn = !html.classList.contains('en-page') ? 92508 : 92440;
      if (!STORYMOBILE) {
        vestiScrollP = _scrollKoEn * idx * (document.querySelector('.page-all-height').clientHeight - window.innerHeight) / _scrollTotalKoEn;
      } else {
        vestiScrollP = _scrollKoEn * idx * (document.querySelector('.mobile-page-all-height').clientHeight - window.innerHeight) / _scrollTotalKoEn;
      }
    }
    if (vestiScrollP <= 0) {
      vestibulopathyArrow.querySelector('.prev-btn').setAttribute('aria-disabled', 'true');
    } else {
      vestibulopathyArrow.querySelector('.prev-btn').removeAttribute('aria-disabled');
    }
    var maxTop = !STORYMOBILE ? document.querySelector('.page-all-height').clientHeight : document.querySelector('.mobile-page-all-height').clientHeight;
    if (vestiScrollP >= maxTop - STORY.wH) {
      vestibulopathyArrow.querySelector('.next-btn').setAttribute('aria-disabled', 'true');
    } else {
      vestibulopathyArrow.querySelector('.next-btn').removeAttribute('aria-disabled');
    }
  },
  prev: function prev(idx) {
    if (vestiScrollPercent >= 88 && vestiScrollPercent <= 99.5) {
      STORY.fakeHeaderShow(0, 0, 100, 100, true);
    } else {
      STORY.fakeHeaderHide();
    }
    document.querySelectorAll('.cover-sticky').forEach(function (_this) {
      _this.classList.remove('hide');
    });
    document.querySelector('#dsmtHeader').removeAttribute('data-color-type');
    vestibulopathyEvent.move(idx);
    STORY.scrollDuration = 0;
    scrollParent.scrollTo(0, vestiScrollP);
  },
  next: function next(idx) {
    vestibulopathyEvent.move(idx);
    scrollParent.scrollTo(0, vestiScrollP);
  }
};
vestibulopathyActive.addEventListener('click', function () {
  vestibulopathyEvent.active();
});
vestibulopathyClose.addEventListener('click', function () {
  vestibulopathyEvent.close();
});
vestibulopathyArrow.querySelector('.prev-btn').addEventListener('click', function () {
  if (vestiScrollP > 0) vestibulopathyIdx--;
  vestibulopathyEvent.prev(vestibulopathyIdx);
});
vestibulopathyArrow.querySelector('.next-btn').addEventListener('click', function () {
  var maxTop = !STORYMOBILE ? document.querySelector('.page-all-height').clientHeight : document.querySelector('.mobile-page-all-height').clientHeight;
  if (vestiScrollP <= maxTop - STORY.wH) vestibulopathyIdx++;
  vestibulopathyEvent.next(vestibulopathyIdx);
});
var ieScroll = false;
var browserRecommendEvent = {
  show: function show() {
    if (STORYIE) browserRecommend.style.display = 'block';
  },
  hide: function hide() {
    if (STORYIE) {
      ieScroll = true;
      browserRecommend.style.display = 'none';
      STORY.scrollShow();
    }
  }
};
browserRecommend.querySelector('.close-btn').addEventListener('click', function () {
  browserRecommendEvent.hide();
});

// grid 
document.querySelectorAll('[data-grid]').forEach(function (_this) {
  var gridInfo = _this.getAttribute('data-grid');
  var gridColor = gridInfo.split(',')[0];
  var gridType = gridInfo.split(',')[1];
  var gridDom;
  var lineNum = gridType != 'cross' ? 5 : 9;
  gridDom = document.createElement("span");
  gridDom.classList.add('grid-wrap');
  gC = document.createElement("span");
  gC.classList.add('colum');
  gridDom.appendChild(gC);
  for (var i = 0; i < lineNum; i++) {
    var line = document.createElement("i");
    gC.appendChild(line);
  }
  if (gridType == 'cross') {
    gR = document.createElement("span");
    gR.classList.add('row');
    gridDom.appendChild(gR);
    for (var _i = 0; _i < lineNum; _i++) {
      var _line = document.createElement("i");
      gR.appendChild(_line);
    }
  }
  if (gridType == 'cross') gridDom.classList.add('cross');
  if (gridColor != 'w') gridDom.classList.add('bk');
  _this.appendChild(gridDom);
});