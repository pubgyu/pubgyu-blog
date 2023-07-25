window.storyLottie2 = document.querySelector('#story-lottie2 .content-wrap');
window.storyLottie2M = document.querySelector('#story-lottie2 .content-wrap');
window.storyLottie4 = document.querySelector('#story-lottie4 .lc4');
window.storyLottieAni2 = lottie.loadAnimation({
  container: storyLottie2,
  renderer: 'svg',
  loop: false,
  autoplay: false,
  rendererSettings: {
    className: 'lottie-svg'
  },
  path: './assets/json/story/intro2.json'
});
window.storyLottieAni2M = lottie.loadAnimation({
  container: storyLottie2M,
  renderer: 'svg',
  loop: false,
  autoplay: false,
  rendererSettings: {
    className: 'lottie-svg-mobile'
  },
  path: './assets/json/story/intro2_m.json'
});
window.storyLottieAni4 = lottie.loadAnimation({
  container: storyLottie4,
  renderer: 'canvas',
  loop: false,
  autoplay: false,
  path: './assets/json/story/wave.json'
});