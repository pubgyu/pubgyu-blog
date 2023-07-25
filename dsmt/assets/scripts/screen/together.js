(function () {
  function valueScrollMotion() {
    gsap.defaults({
      ease: 'power4.out',
      duration: 0.8
    });
    $('.subdesc-wrap .top-line').each(function () {
      gsap.fromTo(this, {
        opacity: 0,
        width: 0
      }, {
        opacity: 1,
        width: '100%',
        scrollTrigger: {
          trigger: this,
          start: function start() {
            if (window.innerWidth < 768) {
              return 'top 80%';
            } else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
              return 'top 70%';
            } else {
              return 'top 80%';
            }
          }
        }
      });
    });
    $('.subdesc-wrap .text-subdesc p').each(function () {
      gsap.fromTo(this, {
        opacity: 0,
        x: 50
      }, {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: this,
          start: function start() {
            if (window.innerWidth < 768) {
              return 'top 80%';
            } else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
              return 'top 70%';
            } else {
              return 'top 80%';
            }
          }
        }
      });
    });
    gsap.fromTo('.link-value', {
      opacity: 0,
      x: 50
    }, {
      opacity: 1,
      x: 0,
      scrollTrigger: {
        trigger: function trigger() {
          return window.innerWidth <= 1024 ? '.link-value' : '.subdesc-wrap .text-subdesc.last';
        },
        start: function start() {
          if (window.innerWidth < 768) {
            return 'top 80%';
          } else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
            return 'top 70%';
          } else {
            return 'bottom 80%';
          }
        }
      }
    });
  }
  valueScrollMotion();
})();