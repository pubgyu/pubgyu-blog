$(function () {
  var $slide = $('.project-slide .swiper');
  var $everySlide = $slide.find('.swiper-slide');
  var $currentSlide = $slide.find('.swiper-slide-active');
  var interleaveOffset = 0.5;
  var isMobile = false;
  $(window).on('resize', function () {
    if (window.innerWidth <= 767) {
      if (!isMobile) {
        interleaveOffset = 1;
        isMobile = true;
      }
    } else {
      if (isMobile) {
        interleaveOffset = 0.5;
        isMobile = false;
      }
    }
  }).resize();
  var projectSlider = new Swiper('.slide-contents', {
    loop: true,
    effect: 'fade',
    speed: 500,
    a11y: {
      prevSlideMessage: '이전 슬라이드',
      nextSlideMessage: '다음 슬라이드'
    },
    pagination: {
      el: '.project-slide .pagination',
      type: 'fraction',
      formatFractionCurrent: function formatFractionCurrent(number) {
        return ('0' + number).slice(-2);
      },
      formatFractionTotal: function formatFractionTotal(number) {
        return ('0' + number).slice(-2);
      }
    },
    navigation: {
      nextEl: '.project-slide .button-next',
      prevEl: '.project-slide .button-prev'
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false
    },
    on: {
      progress: function progress() {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          var slideProgress = swiper.slides[i].progress;
          var innerOffset = swiper.width * interleaveOffset;
          var innerTranslate = slideProgress * innerOffset * -1;
          swiper.slides[i].querySelector('.img-cont').style.transform = 'translate3d(' + innerTranslate + 'px, 0, 0)';
          swiper.slides[i].querySelector('.slide-cont').style.transform = 'translate3d(' + innerTranslate + 'px, 0, 0)';
        }
      },
      touchStart: function touchStart() {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = '';
        }
      },
      setTransition: function setTransition(speed) {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = speed + 'ms';
          swiper.slides[i].querySelector('.img-cont').style.transition = speed + 'ms';
          swiper.slides[i].querySelector('.slide-cont').style.transition = speed + 'ms';
        }
      },
      init: function init() {
        $everySlide = $slide.find('.swiper-slide');
        $currentSlide = $slide.find('.swiper-slide-active');
        $everySlide.css('visibility', 'hidden');
        $currentSlide.css('visibility', 'visible');
      },
      slideChange: function slideChange() {
        $everySlide = $slide.find('.swiper-slide');
        $everySlide.css('visibility', 'visible');
      },
      sliderFirstMove: function sliderFirstMove() {
        $everySlide = $slide.find('.swiper-slide');
        $everySlide.css('visibility', 'visible');
      },
      slideChangeTransitionEnd: function slideChangeTransitionEnd() {
        $everySlide = $slide.find('.swiper-slide');
        $currentSlide = $('.project-slide .swiper .swiper-slide-active');
        $everySlide.css('visibility', 'hidden');
        $currentSlide.css('visibility', 'visible');
      }
    }
  });

  // project contents

  function projectScrollMotion() {
    gsap.defaults({
      ease: 'power4.out',
      duration: 0.8
    });
    ScrollTrigger.matchMedia({
      '(min-width: 1281px)': function minWidth1281px() {
        //PC
        var projectTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.sponsor .message-part.left',
            start: 'top 18%',
            end: '+=280',
            pin: true,
            scrub: 0.5
          }
        });
        projectTl.from('.sponsor .message-part.left', {
          opacity: 1
        });
        projectTl.to('.sponsor .message-part.left', {
          opacity: 0
        });
        gsap.fromTo('.project .message-part.left', {
          opacity: 0,
          x: -20
        }, {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.project .message-part.left',
            start: 'top 18%',
            end: '+=190',
            pin: true,
            scrub: 0.5
          }
        });
        gsap.fromTo('.project .message-part.right', {
          opacity: 0
        }, {
          opacity: 1,
          scrollTrigger: {
            trigger: '.project .message-part.right',
            start: 'top 45%',
            scrub: 0.5
          }
        });
      },
      '(min-width: 768px) and (max-width: 1280px)': function minWidth768pxAndMaxWidth1280px() {
        //tablet small
        var projectTl3 = gsap.timeline({
          scrollTrigger: {
            trigger: '.sponsor .message-part.left',
            start: 'top 18%',
            end: '+=300',
            pin: true,
            scrub: 0.5
          }
        });
        projectTl3.from('.sponsor .message-part.left', {
          opacity: 1
        });
        projectTl3.to('.sponsor .message-part.left', {
          opacity: 0
        });
        gsap.fromTo('.project .message-part.left', {
          opacity: 0,
          x: -20
        }, {
          opacity: 1,
          x: 0,
          duration: 0.1,
          scrollTrigger: {
            trigger: '.project .message-part.left',
            start: 'top 18%',
            end: '+=230',
            pin: true,
            scrub: 0.5
          }
        });
        gsap.fromTo('.project .message-part.right', {
          opacity: 0
        }, {
          opacity: 1,
          scrollTrigger: {
            trigger: '.project .message-part.right',
            start: 'top 50%',
            scrub: 0.5
          }
        });
      },
      '(max-width: 767px)': function maxWidth767px() {
        //mobile
        gsap.fromTo('.sponsor .message-part.left', {
          opacity: 0,
          y: 50
        }, {
          opacity: 1,
          y: 0
        });
        gsap.fromTo('.sponsor .message-part.right', {
          opacity: 0,
          y: 50
        }, {
          opacity: 1,
          y: 0
        });
        gsap.fromTo('.project .message-part.left', {
          opacity: 0,
          y: 50
        }, {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: '.project .message-part.left',
            start: 'top 70%'
          }
        });
        gsap.fromTo('.project .message-part.right', {
          opacity: 0,
          y: 50
        }, {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: '.project .message-part.right',
            start: 'top 70%',
            end: '+=30'
          }
        });
      }
    });
  }
  if (!$('html').hasClass('ie10')) {
    projectScrollMotion();
  }
});