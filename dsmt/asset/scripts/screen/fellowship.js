$(function () {
  function videoControls() {
    var fellowVideo = $('.vod-fellowship');
    var dimLayer = $('.dim-layer');
    function resetVideo() {
      fellowVideo.removeAttr('controls');
      this.load();
      dimLayer.show();
      dimLayer.next('.poster-img').show();
    }
    $('.button-video-play').click(function () {
      dimLayer.hide();
      dimLayer.next('.poster-img').hide();
      fellowVideo.attr({
        controls: 'controls'
      });
      fellowVideo.get(0).play();
    });
    fellowVideo.on('ended', resetVideo);
  }
  videoControls();
  faqBtn();
  var stOptions = {
    startPC: 'top 50%',
    startMobile: 'top 70%'
  };
  var fellowMotion = function () {
    function pc() {
      gsap.fromTo('.sec-with .with-cont-item', {
        opacity: 0,
        y: 100
      }, {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        scrollTrigger: {
          trigger: '.sec-with .with-cont',
          start: 'top 60%'
        }
      });
    }
    function maxTablet() {
      $('.sec-with .with-cont-item').each(function () {
        gsap.fromTo(this, {
          opacity: 0,
          y: 100
        }, {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: this,
            start: stOptions.startMobile
          }
        });
      });
    }
    function minTablet() {
      gsap.fromTo('.sec-how .how-list-item', {
        opacity: 0,
        y: 100
      }, {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        scrollTrigger: {
          trigger: '.sec-how .how-list',
          start: 'top 75%'
        }
      });
    }
    function mobile() {
      $('.sec-how .how-list-item').each(function () {
        gsap.fromTo(this, {
          opacity: 0,
          y: 100
        }, {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: this,
            start: stOptions.startMobile
          }
        });
      });
    }
    return {
      pc: pc,
      maxTablet: maxTablet,
      minTablet: minTablet,
      mobile: mobile
    };
  }();
  var fellowshipScroll = function fellowshipScroll() {
    var _breakPoint = 1280;
    gsap.defaults({
      ease: 'power4.out',
      duration: 0.8
    });
    ScrollTrigger.matchMedia({
      '(min-width: 1281px)': fellowMotion.pc,
      '(max-width: 1280px)': fellowMotion.maxTablet,
      '(min-width: 768px)': fellowMotion.minTablet,
      '(max-width: 767px)': fellowMotion.mobile
    });
    gsap.fromTo('.sec-what .ico-arrow', {
      opacity: 0,
      x: -50
    }, {
      opacity: 1,
      x: 0,
      scrollTrigger: {
        trigger: '.sec-what .ico-arrow',
        start: function start() {
          return window.innerWidth <= _breakPoint ? stOptions.startMobile : 'top 75%';
        }
      }
    });
    $('.sec-what .benefit-card-item').each(function () {
      gsap.fromTo(this, {
        opacity: 0,
        y: 50
      }, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: this,
          start: function start() {
            return window.innerWidth <= _breakPoint ? stOptions.startMobile : 'top 75%';
          }
        }
      });
    });
    gsap.fromTo('.sec-how .ico-arrow', {
      opacity: 0,
      x: 50,
      y: -50
    }, {
      opacity: 1,
      x: 0,
      y: 0,
      scrollTrigger: {
        trigger: '.sec-how .ico-arrow',
        start: function start() {
          return window.innerWidth <= _breakPoint ? stOptions.startMobile : 'top 75%';
        }
      }
    });
  };
  fellowshipScroll();
});