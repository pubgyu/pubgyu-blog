window.storyLottie1 = document.querySelector('#story-lottie1 .content-wrap');
window.storyLottie1M = document.querySelector('#story-lottie1 .content-wrap');
var loadedPercent;
window.storyLottieAni1 = lottie.loadAnimation({
  container: storyLottie1,
  renderer: 'svg',
  loop: false,
  autoplay: false,
  rendererSettings: {
    className: 'lottie-svg',
    progressiveLoad: false
  },
  path: storyLottie1.getAttribute('data-lottie')
});
//mobile
window.storyLottieAni1M = lottie.loadAnimation({
  container: storyLottie1M,
  renderer: 'svg',
  loop: false,
  autoplay: false,
  rendererSettings: {
    className: 'lottie-svg-mobile',
    progressiveLoad: false
  },
  path: storyLottie1.getAttribute('data-lottie-m')
});
window.getScrollbarWidth = function () {
  var outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  outer.style.msOverflowStyle = 'scrollbar';
  document.body.appendChild(outer);
  var inner = document.createElement('div');
  outer.appendChild(inner);
  var scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
};
var horizontalGuideSet;
var horizontalGuide = function horizontalGuide() {
  // feed 1
  var portraitRatio = window.innerWidth / window.innerHeight;
  if (document.documentElement.classList.contains('mobile') && window.innerWidth <= 1000) {
    if (!window.matchMedia('(orientation: portrait)').matches && portraitRatio > 1.7) {
      if (!document.querySelector('.section-voice .text-input').classList.contains('focus')) {
        document.querySelector('.horizontal-message').classList.add('show');
        document.documentElement.classList.add('scroll-hide');
        document.documentElement.classList.add('bkBg');
      }
    } else {
      document.querySelector('.horizontal-message').classList.remove('show');
      document.documentElement.classList.remove('scroll-hide');
      document.documentElement.classList.remove('bkBg');
    }
  }
  clearTimeout(horizontalGuideSet);
  horizontalGuideSet = setTimeout(function () {
    document.querySelector('.sticky-wrap.sticky1 .sticky-con').style.height = window.innerHeight + 'px';
  }, 150);
  var scrollParent = !document.documentElement.classList.contains('mobile') ? window : document.querySelector('#story-wrap');
  var currentScrollOffset = !document.documentElement.classList.contains('mobile') ? window.pageYOffset : document.querySelector('#story-wrap').scrollTop;
  scrollParent.scrollTo({
    top: currentScrollOffset + 10,
    behavior: 'smooth'
  });
};

// init
window.scrollTo(0, 0);
document.getElementById('story-scroll-container').style.paddingRight = getScrollbarWidth() + 'px';
document.querySelector('.does-page-btn').style.height = window.innerHeight + 'px';
document.querySelector('.does-page-btn').style.right = getScrollbarWidth() + 'px';
var startLottie = window.innerWidth > 1000 ? storyLottieAni1 : storyLottieAni1M;
startLottie.addEventListener("DOMLoaded", function () {
  var ff = 0;
  var loadAnimationStart = true;
  var loadFrame = startLottie.totalFrames;
  document.getElementById('story-wrap').style.opacity = 1;
  horizontalGuide();
  function dataAnimation() {
    startLottie.goToAndStop(ff, true);
    // if (ff <= loadFrame) {
    if (ff <= 90) {
      if (window.innerWidth > 767) {
        ff += .3;
      } else {
        ff += .5;
      }
      requestAnimationFrame(dataAnimation);
    } else {
      window.cancelAnimationFrame(dataAnimation);
      if (loadedPercent == 1) {
        loadFrame = startLottie.totalFrames;
        window.cancelAnimationFrame(dataAnimation);
        if (loadAnimationStart) {
          loadAnimationStart = false;
          loadAnimation();
        }
      }
    }
  }
  function loadAnimation() {
    startLottie.goToAndStop(ff, true);
    // if (ff <= loadFrame) {
    if (ff <= 90) {
      if (window.innerWidth > 767) {
        ff += .3;
      } else {
        ff += .5;
      }
      requestAnimationFrame(loadAnimation);
    } else {
      window.cancelAnimationFrame(loadAnimation);
      window.STORY.load();
    }
  }
  var xmlhttp = new XMLHttpRequest(),
    method = 'GET',
    url = window.location.href;
  xmlhttp.open(method, url, true);
  xmlhttp.onprogress = function (event) {
    loadedPercent = event.loaded / event.total;
    loadFrame = 90 * loadedPercent;
    window.cancelAnimationFrame(dataAnimation);
    dataAnimation();
  };
  xmlhttp.send();
});
window.addEventListener('resize', horizontalGuide);