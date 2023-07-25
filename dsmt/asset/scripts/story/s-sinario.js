window.sinarioMotion = {
  lottieSecondSinario: {
    tl: null,
    canvas: {
      frame: 0
    },
    tlEvent: function tlEvent() {
      var _this = this;
      this.tl = new gsap.timeline();
      this.tl.pause();
      var stickyWrap = document.querySelector('.sticky-wrap.sticky2');
      var _message3 = stickyWrap.querySelector('.message-txt.message3');
      var _message4 = stickyWrap.querySelector('.message-txt.message4');
      var _logo1 = stickyWrap.querySelector('.logo-clip.logo1');
      var _logo2 = stickyWrap.querySelector('.logo-clip.logo2');
      _this.tl.to('.sticky-wrap.sticky2 .message-txt .fade-tit', 0, {
        opacity: 0
      }, 'reset');
      if (STORY.wW > 767) {
        _this.tl.to(_logo2.querySelector('.logo-img'), 0, {
          transform: 'translate(-50%,-50%) scale(1)'
        }, 'reset');
      } else {
        _this.tl.to(_logo2.querySelector('.logo-img.mobile'), 0, {
          transform: 'translate(-50%,-50%) scale(1)'
        }, 'reset');
      }
      _this.tl.to(_logo1, 0, {
        height: 0
      }, 'reset').to(_logo2, 0, {
        height: 0
      }, 'reset').to(_message4, 0, {
        opacity: 0
      }, 'reset');
      if (STORY.wW > 1000) {
        _this.tl.to(_this.canvas, storyLottieAni2.totalFrames - 1, {
          frame: storyLottieAni2.totalFrames - 1,
          ease: Sine.easeInOut
        }, 'st1');
      } else {
        _this.tl.to(_this.canvas, storyLottieAni2M.totalFrames - 1, {
          frame: storyLottieAni2M.totalFrames - 1,
          ease: Sine.easeInOut
        }, 'st1');
      }
      if (!document.documentElement.classList.contains('en-page')) {
        _this.tl.to('.sticky-wrap.sticky2 .message-txt .fade-tit', 30, {
          opacity: 1,
          ease: Sine.easeInOut
        }, 'st1+=160');
      } else {
        if (STORY.wW > 767) {
          _this.tl.to('.sticky-wrap.sticky2 .message-txt .fade-tit', 30, {
            opacity: 1,
            ease: Sine.easeInOut
          }, 'st1+=140');
        } else {
          _this.tl.to('.sticky-wrap.sticky2 .message-txt .fade-tit', 30, {
            opacity: 1,
            ease: Sine.easeInOut
          }, 'st1+=100');
        }
      }
      _this.tl.to(_logo1, 110, {
        height: 101 + '%',
        ease: Sine.easeInOut
      }, 'st2') // feed 3
      .to(_logo1, 90, {}, 'st2+=70') // feed 3
      .to(_logo2, 110, {
        height: 101 + '%',
        ease: Sine.easeInOut
      }, 'st3') // feed 3
      .to(stickyWrap.querySelector('.page-dimmed'), 110, {
        height: 101 + '%',
        ease: Sine.easeInOut
      }, 'st3') // feed 3
      .to(stickyWrap.querySelector('.page-dimmed'), 140, {}, 'st3+=70').to(_message3, 1, {
        opacity: 0,
        ease: Sine.easeInOut
      }, 'st3+=160');
      if (STORY.wW > 1000) {
        _this.tl.to(_logo2.querySelector('.logo-img'), 190, {
          transform: 'translate(-50%,-50%) scale(17)',
          ease: Sine.easeInOut
        }, 'st5');
      } else {
        _this.tl.to(_logo2.querySelector('.logo-img.mobile'), 20, {
          'marginTop': -35,
          ease: Sine.easeInOut
        }, 'st4+=1').to(_logo2.querySelector('.logo-img.mobile'), 190, {
          transform: 'translate(-50%,-50%) scale(20)',
          ease: Sine.easeInOut
        }, 'st5');
      }
      _this.tl.to(_message4, 5, {
        opacity: 1,
        ease: Sine.easeInOut
      }, 'st5+=5').to(_message4, 1, {}, 'st6');
    },
    init: function init() {
      var _this = this;
      if (STORY.wW > 1000) {
        storyLottieAni2.addEventListener('DOMLoaded', function () {
          _this.tlEvent();
        });
      } else {
        storyLottieAni2M.addEventListener('DOMLoaded', function () {
          _this.tlEvent();
        });
      }
      motionArray.push(this);
    },
    scroll: function scroll(percent) {
      if (this.tl) {
        var total = this.tl._tDur;
        this.tl.seek(total * percent);
        if (STORY.wW > 1000) {
          storyLottieAni2.goToAndStop(total * percent, true);
        } else {
          storyLottieAni2M.goToAndStop(total * (percent * 1.3), true);
        }
      }
      if (window.vestibulopathyLoadActive) {
        if (percent > 0.0005) {
          vestibulopathyEvent.hide();
        } else {
          vestibulopathyEvent.show();
        }
      }
    },
    resize: function resize() {
      if (this.tl) {
        this.tl.seek(0).kill();
        this.tlEvent();
      }
    }
  },
  videoMaskSinario: {
    tl: null,
    tlEvent: function tlEvent() {
      var stickyWrap = document.querySelector('.sticky-wrap.sticky3');
      var _message1 = stickyWrap.querySelector('.message-txt.message1');
      var _videoDoesText = stickyWrap.querySelector('.video-does-text');
      var _videoCon = _videoDoesText.querySelector('.video-con');
      var _dVideoCon = _videoDoesText.querySelector('.d-video-content');
      var _playBtn = _videoDoesText.querySelector('.button-video-play');
      this.tl = new gsap.timeline();
      this.tl.pause();
      this.tl
      // reset
      .to(_message1, 0, {
        opacity: 1
      }, 'reset').to(_videoDoesText, 0, {
        opacity: 0
      }, 'reset').to(_playBtn, 0, {
        opacity: 0
      }, 'reset').to(_dVideoCon, 0, {
        height: 0
      }, 'reset');
      // if (!STORYCHROMEBROWSER) {
      // 	this.tl.to(_dVideoCon, 0, { height: 0 }, 'reset')
      // } else {
      // 	this.tl.to(_dVideoCon, 0, { clipPath: 'polygon(30% 50%, 70% 50%, 70% 50%, 30% 50%)' }, 'reset')
      // }

      if (STORY.wW > 767) {
        this.tl.to(_videoCon, 0, {
          maxWidth: 516,
          height: 127
        }, 'reset');
      } else {
        this.tl.to(_videoCon, 0, {
          maxWidth: 206,
          height: 51
        }, 'reset');
      }
      if (STORY.wW < 360) this.tl.to(_videoCon, 0, {
        maxWidth: 177,
        height: 43.8
      }, 'reset');
      if (STORY.wW >= 768 && STORY.wW <= 1024) this.tl.to(_videoCon, 0, {
        maxWidth: 425,
        height: 100
      }, "reset");
      if (STORY.wW <= 767) {
        this.tl.to(_message1, 1, {
          scale: .55,
          ease: Sine.easeInOut
        }, 'st1');
      }
      this.tl.to(_message1, 1, {
        opacity: 0,
        ease: Sine.easeInOut
      }, 'st2');
      if (STORY.wW > 767) {
        this.tl.to(_videoDoesText, 1, {
          opacity: 1,
          ease: Sine.easeInOut
        }, 'st2');
      } else {
        this.tl.to(_videoDoesText, 1, {
          opacity: 1,
          ease: Sine.easeInOut
        }, 'st2+=2');
      }
      if (STORY.wW > 767) {
        // if (!STORYCHROMEBROWSER) {
        // 	this.tl.to(_dVideoCon, 3, { height: STORY.wH, ease: Sine.easeInOut }, 'st3')
        // } else {
        // 	// this.tl.to(_dVideoCon, 3, { height: STORY.wH, ease: Sine.easeInOut }, 'st3')
        // 	this.tl.to(_dVideoCon, 0, { clipPath: 'polygon(30% 30%, 70% 30%, 70% 70%, 30% 70%)', ease: Sine.easeInOut }, 'st3')
        // }
        this.tl.to(_dVideoCon, 3, {
          height: STORY.wH,
          ease: Sine.easeInOut
        }, 'st3');
        this.tl.to(_videoCon, 2, {
          height: STORY.wH + 160,
          ease: Sine.easeInOut
        }, 'st4').to(_videoCon, 1, {
          maxWidth: STORY.wW,
          ease: Sine.easeInOut
        }, 'st5').to(_playBtn, 1, {
          opacity: 1,
          ease: Sine.easeInOut
        }, 'st5');
      } else {
        this.tl.to(_dVideoCon, 3, {
          height: STORY.wH + 160,
          ease: Sine.easeInOut
        }, 'st3').to(_videoCon, 4, {
          height: STORY.wH + 160,
          ease: Sine.easeInOut
        }, 'st4').to(_videoCon, 3, {
          maxWidth: STORY.wW,
          ease: Sine.easeInOut
        }, 'st5').to(_playBtn, 3, {
          opacity: 1,
          ease: Sine.easeInOut
        }, 'st5');
      }
      this.tl.to(_playBtn, 2, {}, 'st6');
    },
    init: function init() {
      this.tlEvent();
      motionArray.push(this);
    },
    scroll: function scroll(percent, percent2) {
      var total = this.tl._tDur;
      this.tl.seek(total * percent);
      if (percent2 >= 0.35 && percent2 < 1) {
        STORY.headerEffectOff();
      } else {
        STORY.headerEffectOn();
      }
    },
    resize: function resize() {
      this.tl.seek(0).kill();
      this.tlEvent();
    }
  },
  rectsSinario: {
    colum: 7,
    row: 4,
    margin: 172,
    rectsSize: 100,
    moveRectColor: ['#444', '#878787', '#cacaca', '#fff'],
    rect: {
      x: 0,
      y: STORY.wH / 2,
      r: 0,
      size: 100,
      fill: '#444',
      etcRectX1: 0,
      etcRectX2: 0,
      etcRectX3: 0
    },
    rects: {
      y: STORY.wH / 2
    },
    circle: {
      y: STORY.wH,
      size: 142
    },
    tl: null,
    tlEvent: function tlEvent() {
      var stickyWrap3 = document.querySelector('.sticky-wrap.sticky3');
      var stickyWrap4 = document.querySelector('.sticky-wrap.sticky4');
      var _videoDoesText = stickyWrap3.querySelector('.video-does-text');
      var _message1 = stickyWrap4.querySelector('.message-txt.message1');
      if (STORY.wW > 767) {
        this.colum = 7;
        this.margin = 172;
        this.rect.size = 100;
        this.rectsSize = 100;
        this.circle.size = 142;
      } else {
        this.colum = 3;
        this.margin = 95;
        this.rect.size = 40;
        this.rectsSize = 40;
        this.circle.size = 107;
      }
      this.tl = new gsap.timeline();
      this.tl.pause();
      this.tl.to(_message1, 0, {
        opacity: 0
      }, 'reset').to(this.rect, 3, {
        y: 0
      }, 'st1').to(this.rects, 3, {
        y: 0
      }, 'st1').to(_message1, 1, {
        opacity: 1,
        ease: Sine.easeInOut
      }, 'st1+=1')
      // .to(_videoDoesText, 3, { opacity: 0 }, 'st1+=1')
      .to(_videoDoesText, 3, {}, 'st1+=1').to(this.rect, 1, {
        y: this.margin,
        fill: this.moveRectColor[1],
        ease: Sine.easeInOut
      }, 'st2').to(this.rect, 0, {
        etcRectX1: -STORY.wW
      }).to(this.rect, 1, {
        y: this.margin * 2,
        fill: this.moveRectColor[2],
        ease: Sine.easeInOut
      }, 'st3').to(this.rect, 0, {
        etcRectX2: -STORY.wW
      }).to(this.rect, 1, {
        y: this.margin * 3,
        fill: this.moveRectColor[3],
        ease: Sine.easeInOut
      }, 'st4').to(this.rect, 0, {
        etcRectX3: -STORY.wW
      });
      if (STORY.wW > 767) {
        this.tl.to(this.rect, 1, {
          size: 32,
          r: 20,
          x: this.circle.size / 2 - 37,
          y: this.margin * this.row / 2 - 52,
          ease: Sine.easeInOut
        }, 'st5').to(this.rects, 1, {
          y: -(this.margin * (this.row + 3)),
          ease: Sine.easeInOut
        }, 'st5');
      } else {
        this.tl.to(this.rect, 1, {
          size: 12,
          r: 20,
          x: this.circle.size / 2 - 39,
          y: this.margin * this.row / 2 - 34,
          ease: Sine.easeInOut
        }, 'st5').to(this.rects, 1, {
          y: -(this.margin * (this.row + 5)),
          ease: Sine.easeInOut
        }, 'st5');
      }
      this.tl.to(_message1, 1, {
        opacity: 0,
        ease: Sine.easeInOut
      }, 'st5').to(this.circle, 1, {
        y: 0,
        ease: Sine.easeInOut
      }, 'st5');
    },
    init: function init() {
      this.tlEvent();
      motionArray.push(this);
    },
    scroll: function scroll(percent, percent2) {
      var total = this.tl._tDur;
      this.tl.seek(total * percent);
      if (percent2 >= 0.5 && percent2 < 1) STORY.headerEffectOn();
    },
    resize: function resize() {
      this.tl.seek(0).kill();
      this.tlEvent();
    }
  },
  lighthouseSinario: {
    circle: {
      size: 142,
      circleSize1: 480,
      circleSize2: 720,
      circleSizeMargin1: 0,
      circleSizeMargin2: 0,
      circleStroke: STORY.FFF0,
      circleStroke2: STORY.FFF0
    },
    smallCircle: {
      size: 32
    },
    cone: {
      size: 0,
      rotate: 0
    },
    tl: null,
    tlEvent: function tlEvent() {
      var stickyWrap5 = document.querySelector('.sticky-wrap.sticky5');
      var _message1 = stickyWrap5.querySelector('.message-txt.message1');
      if (STORY.wW > 767) {
        this.circle.size = 142;
        this.circle.circleSize1 = 580;
        this.circle.circleSize2 = 920;
        this.circle.circleSizeMargin1 = 100;
        this.circle.circleSizeMargin2 = 200;
        this.smallCircle.size = 32;
      } else {
        this.circle.size = 107;
        this.circle.circleSize1 = 240;
        this.circle.circleSize2 = 600;
        this.circle.circleSizeMargin1 = 50;
        this.circle.circleSizeMargin2 = 100;
        this.smallCircle.size = 12;
      }
      this.tl = new gsap.timeline();
      this.tl.pause();
      this.tl.to(_message1, 0, {
        opacity: 0
      }, 'reset');
      if (STORY.wW > 767) {
        this.tl.to(this.circle, 1, {
          size: 245,
          ease: Sine.easeInOut
        }, 'st1');
      } else {
        this.tl.to(this.circle, 1, {
          size: 107,
          ease: Sine.easeInOut
        }, 'st1');
      }
      this.tl.to(this.cone, 1, {
        size: 2,
        ease: Sine.easeInOut
      }, 'st1').to(this.circle, 1, {
        circleSizeMargin1: 0,
        circleStroke: '#fff',
        ease: Sine.easeInOut
      }, 'st2').to(this.circle, 1, {
        circleSizeMargin2: 0,
        circleStroke2: '#fff',
        ease: Sine.easeInOut
      }, 'st2').to(this.cone, 1, {
        size: 300,
        ease: Sine.easeInOut
      }, 'st2');
      if (STORY.wW > 767) {
        this.tl.to(this.cone, 5, {
          size: 1000,
          rotate: 4.712,
          ease: Sine.easeInOut
        }, 'st3');
        if (!document.documentElement.classList.contains('ie')) {
          this.tl.to(_message1, 5, {
            opacity: 1,
            ease: Sine.easeInOut
          }, 'st3');
        } else {
          this.tl.to(_message1, 2, {
            opacity: 1,
            ease: Sine.easeInOut
          }, 'st3+=4');
          this.tl.to(_message1, 2, {
            opacity: 0,
            ease: Sine.easeInOut
          }, 'st3+=9');
        }
        this.tl.to(this.circle, 5, {
          size: 0,
          circleSizeMargin1: 100,
          circleSizeMargin2: 200,
          circleStroke: STORY.FFF0,
          circleStroke2: STORY.FFF0,
          ease: Sine.easeInOut
        }, 'st4');
      } else {
        this.tl.to(this.cone, 5, {
          size: 1000,
          rotate: 6.282,
          ease: Sine.easeInOut
        }, 'st3');
        if (!document.documentElement.classList.contains('ie')) {
          this.tl.to(_message1, .2, {
            opacity: 1,
            ease: Sine.easeInOut
          }, 'st3+=3');
        } else {
          this.tl.to(_message1, .2, {
            opacity: 1,
            ease: Sine.easeInOut
          }, 'st3+=4.4');
          this.tl.to(_message1, .2, {
            opacity: 0,
            ease: Sine.easeInOut
          }, 'st3+=6');
        }
        this.tl.to(this.circle, 5, {
          size: 0,
          circleSizeMargin1: 50,
          circleSizeMargin2: 100,
          circleStroke: STORY.FFF0,
          circleStroke2: STORY.FFF0,
          ease: Sine.easeInOut
        }, 'st4');
      }
      this.tl.to(this.cone, 5, {
        size: 0,
        ease: Sine.easeInOut
      }, 'st4');
    },
    init: function init() {
      this.tlEvent();
      motionArray.push(this);
    },
    scroll: function scroll(percent) {
      var total = this.tl._tDur;
      this.tl.seek(total * percent);
    },
    resize: function resize() {
      this.tl.seek(0).kill();
      this.tlEvent();
    }
  },
  shootingStarSinario: {
    colum: 385,
    row: 200,
    circle: {
      size: 32
    },
    smallCircle: {
      size1: 0,
      size2: 0,
      size3: 0,
      size4: 0,
      scp1: [[5, 2], [6, 3], [6, 4], [6, 5], [5, 6]],
      scp2: [[3, 4], [3, 5], [4, 3], [4, 5], [5, 5], [6, 6]],
      scp3: [[3, 2], [4, 2], [4, 4], [4, 6]],
      fill: '#aaa'
    },
    circlaTail1: {
      tailP: 0,
      tailSize: 0,
      OCSize1: 0,
      OCSize2: 0,
      OCColor1: '#aaa',
      OCColor2: '#6b6b6b'
    },
    circlaTail2: {
      tailP: 0,
      tailSize: 0,
      OCSize1: 0,
      OCSize2: 0,
      OCColor1: '#aaa',
      OCColor2: '#6b6b6b'
    },
    circlaTail3: {
      tailP: 0,
      tailSize: 0,
      OCSize1: 0,
      OCSize2: 0,
      OCColor1: '#aaa',
      OCColor2: '#6b6b6b'
    },
    // circlaTail4: { tailP: 0, tailSize: 0, OCSize1: 0, OCSize2: 0, OCColor1: '#aaa', OCColor2: '#6b6b6b' },
    circlaTail5: {
      tailP: 0,
      tailSize: 0,
      OCSize1: 0,
      OCSize2: 0,
      OCColor1: '#aaa',
      OCColor2: '#6b6b6b'
    },
    circlaTail6: {
      tailP: 0,
      tailSize: 0,
      OCSize1: 0,
      OCSize2: 0,
      OCColor1: '#aaa',
      OCColor2: '#6b6b6b'
    },
    wave1: {
      size: 10,
      fill: STORY.FFF1
    },
    wave2: {
      size: 10,
      fill: STORY.FFF1
    },
    wave3: {
      size: 10,
      fill: STORY.FFF1
    },
    wave4: {
      size: 10,
      fill: STORY.FFF1
    },
    wave5: {
      size: 10,
      fill: STORY.FFF1
    },
    tl: null,
    tlEvent: function tlEvent() {
      if (STORY.wW > 767) {
        this.colum = 385;
        this.row = 200;
        this.circle.size = 32;
      } else {
        this.colum = 75;
        this.row = 145;
        this.circle.size = 12;
      }
      this.circlaTail2.tailP = -this.colum;
      this.circlaTail3.tailP = this.colum * 2;
      this.circlaTail5.tailP = -(this.row * 2);
      this.circlaTail6.tailP = -(this.colum * 2);
      // feed 6
      var tails = [
      // el, move position, size, delay
      [this.circlaTail1, -this.row, this.row, 0], [this.circlaTail2, -(this.colum * 2), this.colum, 0], [this.circlaTail3, 0, this.colum * 2, 1], [this.circlaTail5, -this.row, this.row, 3], [this.circlaTail6, -this.colum, this.colum, 4]];
      var waves = [this.wave1, this.wave2, this.wave3, this.wave4, this.wave5];
      this.tl = new gsap.timeline();
      this.tl.pause();
      this.tl.to('.sticky-wrap.sticky6 .grid-wrap .row', 0, {
        opacity: 0
      }, 'reset');
      this.tl.to('.sticky-wrap.sticky6 .grid-wrap .row', 0.5, {
        opacity: 1,
        ease: Sine.easeInOut
      }, 'st1');
      if (STORY.wW > 767) {
        this.tl.to(this.smallCircle, 0.5, {
          size1: 12,
          ease: Back.easeOut.config(1.7)
        }, 'st1').to(this.smallCircle, 0.5, {
          size2: 12,
          ease: Back.easeOut.config(1.7)
        }, 'st2').to(this.smallCircle, 0.5, {
          size3: 12,
          ease: Back.easeOut.config(1.7)
        }, 'st3');
        if (!document.documentElement.classList.contains('en-page')) {
          this.tl.to(this.smallCircle, 0.5, {
            size4: 12,
            ease: Back.easeOut.config(1.7)
          }, 'st4');
        } else {
          this.tl.to(this.smallCircle, 0.5, {
            size4: 12,
            ease: Back.easeOut.config(1.7)
          }, 'st3+=.5');
        }
      } else {
        this.tl.to(this.smallCircle, 1.3, {
          size1: 6,
          ease: Back.easeOut.config(1.7)
        }, 'st1').to(this.smallCircle, 1.3, {
          size2: 6,
          ease: Back.easeOut.config(1.7)
        }, 'st2').to(this.smallCircle, 1.3, {
          size3: 6,
          ease: Back.easeOut.config(1.7)
        }, 'st3');
        if (!document.documentElement.classList.contains('en-page')) {
          this.tl.to(this.smallCircle, 1.3, {
            size4: 6,
            ease: Back.easeOut.config(1.7)
          }, 'st4');
        } else {
          this.tl.to(this.smallCircle, 1.3, {
            size4: 6,
            ease: Back.easeOut.config(1.7)
          }, 'st3+=1.3');
        }
      }
      if (!document.documentElement.classList.contains('en-page')) {
        // tails
        for (var i = 0; i < tails.length; i++) this.tailMotion(this.tl, tails[i][0], tails[i][1], tails[i][2], tails[i][3]);
        this.tl.to(this.smallCircle, 1, {
          fill: '#333',
          ease: Sine.easeInOut
        }, 'st5');
      }

      // waves
      if (STORY.wW > 767) {
        for (var _i = 0; _i < waves.length; _i++) this.waveMotion(this.tl, waves[_i], _i * 1, _i * 0.7 + 5); // feed 6
        this.tl.to(this.circle, 2, {
          size: 12,
          ease: Sine.easeInOut
        }, 'st7'); // feed 6
      } else {
        for (var _i2 = 0; _i2 < waves.length; _i2++) this.waveMotion(this.tl, waves[_i2], _i2 * 1, _i2 * 0.7 + 9); // feed 6
        this.tl.to(this.circle, 2, {
          size: 6,
          ease: Sine.easeInOut
        }, 'st7'); // feed 6
      }

      if (!document.documentElement.classList.contains('en-page')) {
        this.tl.to('.sticky-wrap.sticky6 .grid-wrap', 2, {
          opacity: 0,
          ease: Sine.easeInOut
        }, 'st7');
      } else {
        // tails
        for (var _i3 = 0; _i3 < tails.length; _i3++) this.tailMotion(this.tl, tails[_i3][0], tails[_i3][1], tails[_i3][2], tails[_i3][3]);
        this.tl.to(this.smallCircle, 1, {
          fill: '#333',
          ease: Sine.easeInOut
        }, 'st5');
        this.tl.to('.sticky-wrap.sticky6 .grid-wrap', 2, {
          opacity: 0,
          ease: Sine.easeInOut
        }, 'st5');
      }
    },
    init: function init() {
      this.tlEvent();
      motionArray.push(this);
    },
    tailMotion: function tailMotion(tl, el, position, size, delay) {
      // feed 6
      this.tl.to(el, 3, {
        tailP: position,
        tailSize: size,
        ease: Sine.easeInOut
      }, "st4+=".concat(delay));
      if (STORY.wW > 767) {
        this.tl.to(el, 3.5, {
          tailSize: 0,
          OCSize1: 0,
          OCSize2: 0,
          ease: Sine.easeInOut
        }, "st4+=".concat(delay + 3)).to(el, 3.5, {
          OCSize2: 128,
          ease: Sine.easeInOut
        }, "st4+=".concat(delay + 3.5)).to(el, 3.5, {
          OCSize1: 100,
          ease: Sine.easeInOut
        }, "st4+=".concat(delay + 3.65)).to(el, 3, {
          OCColor1: 'rgba(170, 170, 170 ,0)',
          OCColor2: 'rgba(107, 107, 107, 0)',
          ease: Sine.easeInOut
        }, "st4+=".concat(delay + 6.5));
      } else {
        this.tl.to(el, 3.5, {
          tailSize: 0,
          OCSize1: 0,
          OCSize2: 0,
          ease: Sine.easeInOut
        }, "st4+=".concat(delay + 3)).to(el, 3.5, {
          OCSize2: 66,
          ease: Sine.easeInOut
        }, "st4+=".concat(delay + 3.5)).to(el, 3.5, {
          OCSize1: 52,
          ease: Sine.easeInOut
        }, "st4+=".concat(delay + 3.65)).to(el, 3, {
          OCColor1: 'rgba(170, 170, 170 ,0)',
          OCColor2: 'rgba(107, 107, 107, 0)',
          ease: Sine.easeInOut
        }, "st4+=".concat(delay + 6.5));
      }
    },
    waveMotion: function waveMotion(tl, el, delay, duration) {
      this.tl.to(el, duration, {
        size: STORY.wW,
        fill: STORY.FFF0,
        ease: Sine.easeInOut
      }, "st6+=".concat(delay)); // feed 6
    },

    scroll: function scroll(percent) {
      var total = this.tl._tDur;
      if (STORY.wW > 767) {
        if (percent >= 0.03 && percent < 0.99) {
          STORY.headerEffectOff();
        } else {
          STORY.headerEffectOn();
        }
      }

      // feed 6
      if (percent >= 0.01 && percent <= 0.5) {
        document.querySelector('.sticky-wrap.sticky6 .message1').classList.add('txt-show');
      } else {
        document.querySelector('.sticky-wrap.sticky6 .message1').classList.remove('txt-show');
      }
      if (percent > 0.5) {
        document.querySelector('.sticky-wrap.sticky6 .message1').classList.add('txt-hide');
      } else {
        document.querySelector('.sticky-wrap.sticky6 .message1').classList.remove('txt-hide');
      }
      // feed 6
      if (STORY.wW > 767) {
        if (percent >= 0.55 && percent <= 0.9) {
          document.querySelector('.sticky-wrap.sticky6 .message2').classList.add('txt-show');
        } else {
          document.querySelector('.sticky-wrap.sticky6 .message2').classList.remove('txt-show');
        }
      } else {
        if (percent >= 0.52 && percent <= 0.9) {
          document.querySelector('.sticky-wrap.sticky6 .message2').classList.add('txt-show');
        } else {
          document.querySelector('.sticky-wrap.sticky6 .message2').classList.remove('txt-show');
        }
      }
      if (percent > 0.9) {
        document.querySelector('.sticky-wrap.sticky6 .message2').classList.add('txt-hide');
      } else {
        document.querySelector('.sticky-wrap.sticky6 .message2').classList.remove('txt-hide');
      }
      this.tl.seek(total * percent);
    },
    resize: function resize() {
      this.tl.seek(0).kill();
      this.tlEvent();
    }
  },
  sphereSinario: {
    colum: 385,
    row: 200,
    camera: {
      x: 0,
      y: 0,
      z: 1090,
      PY: 0,
      PZ: 0,
      bottomPY: 0,
      minusPY: 0,
      minusPZ: 0,
      sphereUpZ: 0,
      rotateX: 0,
      rotateY: 0
    },
    centerSphere: {
      size: 6,
      x: 0,
      z: 0,
      fill: STORY.FFF1,
      stick: 0,
      OS: 0,
      OSF: '',
      IS: 0,
      ISF: ''
    },
    sphere1: {
      size: 5,
      z: -500,
      fill: STORY.FFF0,
      rotate: 0,
      stick: 0,
      OS: 0,
      OSF: '',
      IS: 0,
      ISF: '',
      radius: 420,
      angle: -2
    },
    sphere2: {
      size: 5,
      z: -500,
      fill: STORY.FFF0,
      rotate: 0,
      stick: 0,
      OS: 0,
      OSF: '',
      IS: 0,
      ISF: '',
      radius: 420,
      angle: 4
    },
    sphere3: {
      size: 5,
      z: -500,
      fill: STORY.FFF0,
      rotate: 0,
      stick: 0,
      OS: 0,
      OSF: '',
      IS: 0,
      ISF: '',
      radius: 840,
      angle: -1
    },
    sphere4: {
      size: 5,
      z: -500,
      fill: STORY.FFF0,
      rotate: 0,
      stick: 0,
      OS: 0,
      OSF: '',
      IS: 0,
      ISF: '',
      radius: 840,
      angle: 4
    },
    sphere5: {
      size: 5,
      z: -500,
      fill: STORY.FFF0,
      rotate: 0,
      stick: 0,
      OS: 0,
      OSF: '',
      IS: 0,
      ISF: '',
      radius: 1260,
      angle: -1
    },
    sphere6: {
      size: 5,
      z: -500,
      fill: STORY.FFF0,
      rotate: 0,
      stick: 0,
      OS: 0,
      OSF: '',
      IS: 0,
      ISF: '',
      radius: 1260,
      angle: 1
    },
    sphere7: {
      size: 5,
      z: -500,
      fill: STORY.FFF0,
      rotate: 0,
      stick: 0,
      OS: 0,
      OSF: '',
      IS: 0,
      ISF: '',
      radius: 1680,
      angle: -3
    },
    sphere8: {
      size: 5,
      z: -500,
      fill: STORY.FFF0,
      rotate: 0,
      stick: 0,
      OS: 0,
      OSF: '',
      IS: 0,
      ISF: '',
      radius: 1680,
      angle: 5
    },
    sphere9: {
      size: 5,
      z: 0,
      fill: STORY.FFF0,
      rotate: 0,
      radius: 0,
      angle: 5
    },
    sphere10: {
      size: 5,
      z: 0,
      fill: STORY.FFF0,
      rotate: 0,
      radius: 0,
      angle: 5
    },
    sphere11: {
      size: 5,
      z: 0,
      fill: STORY.FFF0,
      rotate: 0,
      radius: 0,
      angle: 5
    },
    sphere12: {
      size: 5,
      z: 0,
      fill: STORY.FFF0,
      rotate: 0,
      radius: 0,
      angle: 5
    },
    track: {
      size: 500,
      fill: STORY.FFF0
    },
    wave1: {
      size: 0,
      fill: STORY.FFF1
    },
    wave2: {
      size: 0,
      fill: STORY.FFF1
    },
    wave3: {
      size: 0,
      fill: STORY.FFF1
    },
    wave4: {
      size: 0,
      fill: STORY.FFF1
    },
    wave5: {
      size: 0,
      fill: STORY.FFF1
    },
    wave6: {
      size: 0,
      fill: STORY.FFF1
    },
    smallBall: {
      size: 12,
      fill: 'rgba(255,255,255,0.5)'
    },
    dimmed: {
      fill: 'rgba(18,18,18,0)'
    },
    bgFill: {
      fill: 'rgba(0,0,0,0)'
    },
    tl: null,
    tlEvent: function tlEvent() {
      var spheres, spheres2;
      if (STORY.wW > 767) {
        this.colum = 385;
        this.row = 200;
        this.smallBall.size = 12;
        this.centerSphere.size = 6;
        this.track.size = 500;
        this.sphere1.radius = 420;
        this.sphere2.radius = 420;
        this.sphere3.radius = 840;
        this.sphere4.radius = 840;
        this.sphere5.radius = 1260;
        this.sphere6.radius = 1260;
        this.sphere7.radius = 1680;
        this.sphere8.radius = 1680;
        spheres = [
        // el, size, endsize, fill, angle, delay
        [this.sphere1, 20, 25, STORY.FFF1, -2, 1], [this.sphere2, 20, 25, 'rgba(255,255,255,.3)', 4, 1.3], [this.sphere3, 30, 25, '#d2d2d2', -1, 1], [this.sphere4, 30, 25, '#d2d2d2', 6, 1.5], [this.sphere5, 40, 25, '#b3b3b3', -3, 1.3], [this.sphere6, 40, 25, '#b3b3b3', 1, 1], [this.sphere7, 30, 25, '#767676', -4, 1], [this.sphere8, 30, 25, '#767676', 5, 1.5]];
        spheres2 = [
        // el, size, endsize, angle
        [this.sphere9, 20, 25, -5], [this.sphere10, 20, 25, 2], [this.sphere11, 20, 25, 3], [this.sphere12, 20, 25, 0]];
      } else {
        this.colum = 75;
        this.row = 145;
        this.smallBall.size = 6;
        this.centerSphere.size = 3;
        this.track.size = 250;
        this.sphere1.radius = 210;
        this.sphere2.radius = 210;
        this.sphere3.radius = 420;
        this.sphere4.radius = 420;
        this.sphere5.radius = 630;
        this.sphere6.radius = 630;
        this.sphere7.radius = 840;
        this.sphere8.radius = 840;
        // feed 7
        if (STORY.wW > 767) {
          spheres = [[this.sphere1, 12, 12, STORY.FFF1, -2, 0], [this.sphere2, 12, 12, 'rgba(255,255,255,.3)', 4, 0.3], [this.sphere3, 12, 12, '#d2d2d2', -1, 0], [this.sphere4, 12, 12, '#d2d2d2', 6, 0.5], [this.sphere5, 12, 12, '#b3b3b3', -3, 0.3], [this.sphere6, 12, 12, '#b3b3b3', 1, 0], [this.sphere7, 12, 12, '#767676', -4, 0], [this.sphere8, 12, 12, '#767676', 5, 0.5]];
        } else {
          spheres = [[this.sphere1, 12, 12, STORY.FFF1, -2, 2], [this.sphere2, 12, 12, 'rgba(255,255,255,.3)', 4, 2.3], [this.sphere3, 12, 12, '#d2d2d2', -1, 2], [this.sphere4, 12, 12, '#d2d2d2', 6, 2.5], [this.sphere5, 12, 12, '#b3b3b3', -3, 2.3], [this.sphere6, 12, 12, '#b3b3b3', 1, 2], [this.sphere7, 12, 12, '#767676', -4, 2], [this.sphere8, 12, 12, '#767676', 5, 2.5]];
        }
        spheres2 = [
        // el, size, endsize, angle
        [this.sphere9, 20, 12, -5], [this.sphere10, 20, 12, 2], [this.sphere11, 20, 12, 3], [this.sphere12, 20, 12, 0]];
      }
      var waves = [this.wave1, this.wave2, this.wave3, this.wave4];
      this.tl = new gsap.timeline();
      this.tl.pause();
      this.tl.to(this.camera, 0, {
        z: STORY.wH - STORY.wH / 8.5
      }, 'reset');
      if (STORY.wW > 767) {
        this.tl.to(this.camera, 3, {
          y: 1400,
          z: 400,
          PY: 700,
          ease: Sine.easeInOut
        }, 'st1') // feed 7
        .to(this.camera, 5, {
          bottomPY: -2000,
          sphereUpZ: 1400,
          minusPY: 700,
          minusPZ: 1500,
          ease: Sine.easeInOut
        }, 'st2'); // feed 7
      } else {
        this.tl.to(this.camera, 9, {
          y: 1400,
          z: 400,
          PY: 700,
          ease: Sine.easeInOut
        }, 'st1') // feed 7
        .to(this.camera, 11, {
          bottomPY: -2000,
          sphereUpZ: 1400,
          minusPY: 700,
          minusPZ: 1500,
          ease: Sine.easeInOut
        }, 'st2'); // feed 7
      }

      this.tl.to(this.smallBall, 5, {
        delay: 2,
        fill: 'rgba(255,255,255,0)'
      }, 'st3+=4').to(this.camera, 5, {
        rotateX: 0.5,
        ease: Sine.easeInOut
      }, 'st3+=9') // feed 7
      .to(this.track, 5, {
        fill: '#6B6B6B',
        ease: Sine.easeInOut
      }, 'st3+=9.5') // feed 7
      .to(this.camera, 5, {
        rotateX: 1.57,
        y: 0,
        z: 2600,
        ease: Sine.easeInOut
      }, 'st4').to(this.track, 3, {
        fill: STORY.FFF0,
        ease: Sine.easeInOut
      }, 'st5');
      this.tl.to(this.track, 0, {
        size: 0
      }, 'st6');
      for (var i = 0; i < waves.length; i++) this.waveMotion(this.tl, waves[i], i * .9, i * 0.7 + 7); // feed 7-2

      this.tl.to(this.camera, 13, {
        rotateX: 3.14,
        ease: Sine.easeInOut
      }, 'st7') // feed 7-3
      .to(this.dimmed, 0.5, {
        fill: 'rgba(18,18,18,.3)',
        ease: Sine.easeInOut
      }, 'st7').to('.sticky-wrap.sticky7 .page-dimmed', 0.5, {
        opacity: 1,
        ease: Sine.easeInOut
      }, 'st7').to(this.bgFill, 0.5, {
        fill: 'rgba(0,0,0,1)',
        ease: Sine.easeInOut
      }, 'st7').to(this.camera, 13, {
        z: 700,
        rotateY: -6.28,
        ease: Sine.easeInOut
      }, 'st7+=.5') // feed 7-3
      .to(this.dimmed, 0.5, {
        fill: 'rgba(18,18,18,0)',
        ease: Sine.easeInOut
      }, 'st7+=11') // feed 7-3
      .to(this.bgFill, 0.5, {
        fill: 'rgba(24,24,24,1)',
        ease: Sine.easeInOut
      }, 'st7+=12.5'); // feed 7-3

      for (var _i4 = 0; _i4 < spheres.length; _i4++) this.sphereMotion(this.tl, spheres[_i4][0], spheres[_i4][1], spheres[_i4][2], spheres[_i4][3], spheres[_i4][4], spheres[_i4][5]);
      for (var _i5 = 0; _i5 < spheres2.length; _i5++) this.sphereMotion2(this.tl, spheres2[_i5][0], spheres2[_i5][1], spheres2[_i5][2], spheres2[_i5][3]);
      this.centersphereMotion(this.tl, this.centerSphere, 1);
    },
    init: function init() {
      this.tlEvent();
      motionArray.push(this);
    },
    centersphereMotion: function centersphereMotion(tl, el, delay) {
      if (STORY.wW > 767) {
        this.tl.to(el, 5, {
          size: 50,
          z: 200,
          ease: Sine.easeInOut
        }, 'st2'); // feed 7
      } else {
        this.tl.to(el, 5, {
          size: 20,
          z: 200,
          ease: Sine.easeInOut
        }, 'st2'); // feed 7
      }

      this.tl.to(el, 5, {
        stick: 300,
        ease: Sine.easeInOut
      }, 'st2'); // feed 7
      this.tl.to(el, 5, {
        stick: 0,
        ease: Sine.easeInOut
      }, 'st2+=4'); // feed 7

      if (STORY.wW > 767) {
        this.tl.to(el, 5, {
          size: 80,
          ease: Sine.easeInOut
        }, 'st4');
      } else {
        this.tl.to(el, 5, {
          size: 40,
          ease: Sine.easeInOut
        }, 'st4');
      }
      this.tl.to(el, 1, {
        size: 0,
        ease: Sine.easeInOut
      }, 'st7') // feed 7-3
      .to(el, 0.5, {
        x: STORY.wW * 3,
        fill: STORY.FFF0,
        ease: Sine.easeInOut
      }, 'st7+=11') // feed 7-3
      .to(el, 0, {
        fill: STORY.FFF1,
        ease: Sine.easeInOut
      }, 'st7+=11.6') // feed 7-3
      .to(el, 2, {
        size: STORY.wH,
        x: 0,
        z: 0,
        ease: Sine.easeInOut
      }, 'st7+=11.6') // feed 7-3
      .to('.sticky-wrap.sticky7 .page-dimmed', .5, {
        'background-color': '#fff',
        ease: Sine.easeInOut
      }, 'st7+=12.6'); // feed 7-3
    },

    sphereMotion: function sphereMotion(tl, el, size, endSize, fill, angle, delay) {
      this.tl.to(el, 2, {
        size: size,
        z: 200,
        fill: fill,
        ease: Sine.easeInOut
      }, "st2+=".concat(delay)).to(el, 2, {
        stick: 300,
        ease: Sine.easeInOut
      }, "st2+=".concat(delay)) // feed 7
      .to(el, 2, {
        stick: 1,
        ease: Sine.easeInOut
      }, "st2+=".concat(delay + 5)).to(el, 3, {}, "st2+=".concat(delay + 7));
      if (STORY.wW > 767) {
        this.tl.to(el, 3, {
          size: endSize,
          fill: STORY.FFF1,
          radius: 1400,
          angle: angle,
          ease: Sine.easeInOut
        }, 'st5');
      } else {
        this.tl.to(el, 3, {
          size: endSize,
          fill: STORY.FFF1,
          radius: 700,
          angle: angle,
          ease: Sine.easeInOut
        }, 'st5');
      }
      this.tl.to(el, 3, {
        rotate: -0.58,
        ease: Sine.easeInOut
      }, 'st7');
    },
    sphereMotion2: function sphereMotion2(tl, el, size, endSize, angle) {
      this.tl.to(el, 1, {
        size: size,
        z: 200,
        ease: Sine.easeInOut
      }, 'st2');
      if (STORY.wW > 767) {
        this.tl.to(el, 3, {
          size: endSize,
          radius: 1400,
          angle: angle,
          ease: Sine.easeInOut
        }, 'st5');
      } else {
        this.tl.to(el, 3, {
          size: endSize,
          radius: 700,
          angle: angle,
          ease: Sine.easeInOut
        }, 'st5');
      }
      this.tl.to(el, 1, {
        fill: STORY.FFF1,
        ease: Sine.easeInOut
      }, 'st5+=1.5').to(el, 3, {
        rotate: -0.58,
        ease: Sine.easeInOut
      }, 'st7');
    },
    waveMotion: function waveMotion(tl, el, delay, duration) {
      if (STORY.wW > 767) {
        this.tl.to(el, duration, {
          size: STORY.wW,
          fill: STORY.FFF0,
          ease: Sine.easeInOut
        }, "st6+=".concat(delay)); // feed 7-2
      } else {
        this.tl.to(el, duration, {
          size: STORY.wH,
          fill: STORY.FFF0,
          ease: Sine.easeInOut
        }, "st6+=".concat(delay)); // feed 7-2
      }

      this.tl.to(el, 0, {
        size: 0
      }, "st6+=".concat(delay + 3));
    },
    scroll: function scroll(percent) {
      var total = this.tl._tDur;
      if (STORY.wW > 767) {
        if (percent >= 0.01 && percent <= 0.46) {
          document.querySelector('.sticky-wrap.sticky7 .message1').classList.add('txt-show');
        } else {
          document.querySelector('.sticky-wrap.sticky7 .message1').classList.remove('txt-show');
        }
        if (percent > 0.46) {
          document.querySelector('.sticky-wrap.sticky7 .message1').classList.add('txt-hide');
        } else {
          document.querySelector('.sticky-wrap.sticky7 .message1').classList.remove('txt-hide');
        }
      } else {
        if (percent >= 0.01 && percent <= 0.48) {
          document.querySelector('.sticky-wrap.sticky7 .message1').classList.add('txt-show');
        } else {
          document.querySelector('.sticky-wrap.sticky7 .message1').classList.remove('txt-show');
        }
        if (percent > 0.48) {
          document.querySelector('.sticky-wrap.sticky7 .message1').classList.add('txt-hide');
        } else {
          document.querySelector('.sticky-wrap.sticky7 .message1').classList.remove('txt-hide');
        }
      }
      if (percent >= 0.5 && percent <= 0.75) {
        document.querySelector('.sticky-wrap.sticky7 .message2').classList.add('txt-show');
      } else {
        document.querySelector('.sticky-wrap.sticky7 .message2').classList.remove('txt-show');
      }
      if (percent > 0.75) {
        document.querySelector('.sticky-wrap.sticky7 .message2').classList.add('txt-hide');
      } else {
        document.querySelector('.sticky-wrap.sticky7 .message2').classList.remove('txt-hide');
      }
      if (percent >= 0.8 && percent <= 0.99) {
        document.querySelector('.sticky-wrap.sticky7 .message3').classList.add('txt-show');
      } else {
        document.querySelector('.sticky-wrap.sticky7 .message3').classList.remove('txt-show');
      }
      if (percent > 0.99) {
        document.querySelector('.sticky-wrap.sticky7 .message3').classList.add('txt-hide');
      } else {
        document.querySelector('.sticky-wrap.sticky7 .message3').classList.remove('txt-hide');
      }
      this.tl.seek(total * percent);
    },
    resize: function resize() {
      this.tl.seek(0).kill();
      this.tlEvent();
    }
  },
  dotLineVideo: {
    line: {
      widthS: -30,
      heightS: -30,
      o: 1
    },
    video: {
      o: 0,
      btnO: 0,
      scale: 0.399,
      vH: STORY.wH / 2.8
    },
    tl: null,
    tlEvent: function tlEvent() {
      this.tl = new gsap.timeline();
      this.tl.pause();
      var minVideoScale;
      if (STORY.wW > 767) {
        minVideoScale = Math.floor(766 / window.innerWidth * 1000) / 1000;
      } else {
        minVideoScale = Math.floor(300 / window.innerWidth * 1000) / 1000;
      }
      this.video.scale = minVideoScale;
      this.tl.to('.sticky-wrap.sticky8 .grid-wrap', 0, {
        opacity: 0
      }, 'reset').to('.sticky-wrap.sticky8 .change-bg', 0, {
        opacity: 0
      }, 'reset').to('.sticky-wrap.sticky8 .grid-wrap', 0.5, {
        opacity: 1,
        ease: Sine.easeInOut
      }, 'st1');
      if (!window.STORYIE10) {
        this.tl.to(this.line, 1, {
          widthS: STORY.wW + 30,
          ease: Sine.easeInOut
        }, 'st1').to(this.video, 1, {
          o: 1,
          ease: Sine.easeInOut
        }, 'st1+=.5');
        if (STORY.wW > 767) {
          this.tl.to(this.line, 1, {
            heightS: STORY.wOH + 30,
            ease: Sine.easeInOut
          }, 'st1').to(this.video, .5, {
            scale: 1,
            ease: Sine.easeInOut
          }, 'st2');
        } else {
          this.tl.to(this.line, 1, {
            heightS: STORY.wOH + 150,
            ease: Sine.easeInOut
          }, 'st1').to(this.video, .5, {
            scale: 1,
            vH: STORY.wH + 150,
            ease: Sine.easeInOut
          }, 'st2');
        }
        this.tl.to(this.line, .5, {
          o: 0,
          ease: Sine.easeInOut
        }, 'st2').to(this.video, .3, {
          btnO: 1,
          ease: Sine.easeInOut
        }, 'st2+=.2').to('.sticky-wrap.sticky8 .change-bg', .5, {
          opacity: 1,
          ease: Sine.easeInOut
        }, 'st2+=.2').to(this.video, .8, {}, 'st2+=.5');
      } else {
        this.tl.to('.sticky-wrap.sticky8 .d-video-content', 1, {
          opacity: 1,
          ease: Sine.easeInOut
        }, 'st1+=.5');
        if (STORY.wW > 767) {
          this.tl.to('.sticky-wrap.sticky8 .d-video-content', .5, {
            scale: 1,
            ease: Sine.easeInOut
          }, 'st2');
        } else {
          this.tl.to('.sticky-wrap.sticky8 .d-video-content', .5, {
            scale: 1,
            vH: STORY.wH + 2,
            ease: Sine.easeInOut
          }, 'st2');
        }
        this.tl.to('.sticky-wrap.sticky8 .button-video-play', .3, {
          opacity: 1,
          ease: Sine.easeInOut
        }, 'st2+=.2').to('.sticky-wrap.sticky8 .d-video-content', .8, {}, 'st2+=.5');
      }
    },
    init: function init() {
      this.tlEvent();
      motionArray.push(this);
    },
    scroll: function scroll(percent, percent2) {
      var total = this.tl._tDur;
      this.tl.seek(total * percent);
      if (percent >= 0.01) {
        document.querySelector('.sticky-wrap.sticky8 .message1').classList.add('txt-show');
      } else {
        document.querySelector('.sticky-wrap.sticky8 .message1').classList.remove('txt-show');
      }

      // if (STORY.wW > 767) {
      // 	if (percent2 >= 0.53 && percent2 < 1) {
      // 		STORY.fakeHeaderShow(percent2, 0.53, 0, 0, false);
      // 	} else {
      // 		STORY.fakeHeaderHide();
      // 	}
      // } else {
      // 	if (percent2 >= 0.53 && percent2 < .98) {
      // 		STORY.fakeHeaderShow(percent2, 0.53, 0, 0, false);
      // 	} else {
      // 		STORY.fakeHeaderHide();
      // 	}
      // }
      if (percent2 >= 0.52 && percent2 < 1) {
        if (STORY.wW > 767) {
          STORY.fakeHeaderShow(percent2, 0.52, 14, 14, false);
        } else {
          STORY.fakeHeaderShow(percent2, 0.52, 10, 10, false);
        }
      } else {
        STORY.fakeHeaderHide();
      }
    },
    resize: function resize() {
      this.tl.seek(0).kill();
      this.tlEvent();
    }
  },
  fellowshipTextMotion: {
    tl: null,
    tlEvent: function tlEvent() {
      this.tl = new gsap.timeline();
      this.tl.pause();
      var stickyWrap = document.querySelector('.sticky-wrap.sticky9');
      this.tl
      // reset
      .to('.sticky-wrap.sticky9 .message1 .fade-tit', 0, {
        opacity: 0
      }, 'reset').to('.sticky-wrap.sticky9 .message2 .fade-tit', 0, {
        opacity: 0
      }, 'reset').to('.sticky9 .tm3', 3, {
        x: '-63%'
      }, 'reset').to('.sticky9 .t-row', 0, {
        y: 50
      }, 'reset').to('.sticky9 .t-box.not-ie rect', 0, {
        y: 50,
        height: 0
      }, 'reset').to('.sticky9 .txt-matter .top', 0, {
        y: 1
      }, 'reset');
      if (html.classList.contains('ie')) this.tl.to('.sticky9 .t-box.ie span', 0, {
        top: 0,
        height: 0
      }, 'reset');
      this.tl.to('.sticky9 .t-r1', 0.5, {
        y: 0,
        opacity: 1,
        ease: Sine.easeInOut
      }, 'st0+=1.5') // feed 9
      .to('.sticky9 .t-r2', 0.5, {
        y: 0,
        opacity: 1,
        ease: Sine.easeInOut
      }, 'st0+=1.8') // feed 9
      .to('.sticky9 .t-r3', 0.5, {
        y: 0,
        opacity: 1,
        ease: Sine.easeInOut
      }, 'st0+=2.1') // feed 9
      .to('.sticky9 .t-r4', 0.5, {
        y: 0,
        opacity: 1,
        ease: Sine.easeInOut
      }, 'st0+=2.4') // feed 9
      .to('.sticky-wrap.sticky9 .message1 .fade-tit', 2, {
        opacity: 1,
        ease: Sine.easeInOut
      }, 'st0+=2.4').to('.sticky9 .t-r4', 3, {}, 'st0+=2.9'); // feed 9

      if (STORY.wW > 767) {
        this.tl.to('.sticky9 .tm1 .t-mask', 1.5, {
          y: 0,
          ease: Sine.easeInOut
        }, 'st1').to('.sticky9 .tm1 svg', 0, {
          opacity: 0
        }, 'st1+=1.5').to('.sticky9 .tm1 .t-mask', 1.5, {
          y: '102%',
          ease: Sine.easeInOut
        }, 'st1+=1.5').to('.sticky9 .tm4 .t-mask', 1.5, {
          y: 0,
          ease: Sine.easeInOut
        }, 'st1').to('.sticky9 .tm4 svg', 0, {
          opacity: 0
        }, 'st1+=1.5').to('.sticky9 .tm4 .t-mask', 1.5, {
          y: '102%',
          ease: Sine.easeInOut
        }, 'st1+=1.5').to('.sticky9 .tm6 .t-mask', 1.5, {
          y: 0,
          ease: Sine.easeInOut
        }, 'st1').to('.sticky9 .tm6 svg', 0, {
          opacity: 0
        }, 'st1+=1.5').to('.sticky9 .tm6 .t-mask', 1.5, {
          y: '102%',
          ease: Sine.easeInOut
        }, 'st1+=1.5').to('.sticky9 .tm6 .t-mask', 3, {}, 'st1+=2');
      } else {
        this.tl.to('.sticky9 .tm1 .t-mask', 1.5, {
          y: 0,
          ease: Sine.easeInOut
        }, 'st1').to('.sticky9 .tm1 svg', 0, {
          opacity: 0
        }, 'st1+=1.5').to('.sticky9 .tm1 .t-mask', 1.5, {
          y: '102%',
          ease: Sine.easeInOut
        }, 'st1+=1.5').to('.sticky9 .tm4 .t-mask', 1.5, {
          y: 0,
          ease: Sine.easeInOut
        }, 'st1+=1.5').to('.sticky9 .tm4 svg', 0, {
          opacity: 0
        }, 'st1+=3').to('.sticky9 .tm4 .t-mask', 1.5, {
          y: '102%',
          ease: Sine.easeInOut
        }, 'st1+=3').to('.sticky9 .tm6 .t-mask', 1.5, {
          y: 0,
          ease: Sine.easeInOut
        }, 'st1+=2.5').to('.sticky9 .tm6 svg', 0, {
          opacity: 0
        }, 'st1+=4').to('.sticky9 .tm6 .t-mask', 1.5, {
          y: '102%',
          ease: Sine.easeInOut
        }, 'st1+=4').to('.sticky9 .tm6 .t-mask', 3, {}, 'st1+=4.5');
      }
      this.tl.to('.sticky9 .tm2 .t-mask', 1.5, {
        y: 0,
        ease: Sine.easeInOut
      }, 'st4').to('.sticky9 .tm2 svg', 0, {
        opacity: 1
      }, 'st4+=1.5').to('.sticky9 .tm2 .t-mask', 1.5, {
        y: '-102%',
        ease: Sine.easeInOut
      }, 'st4+=1.5');
      if (STORY.wW > 767) {
        this.tl.to('.sticky9 .tm3', 1.5, {
          x: '-50%',
          'margin-left': 5,
          ease: Sine.easeInOut
        }, 'st4').to('.sticky9 .tm3', 5.8, {}, 'st4+=.5');
      } else {
        this.tl.to('.sticky9 .tm3', 1.5, {
          x: '-50%',
          'margin-left': 1,
          ease: Sine.easeInOut
        }, 'st4').to('.sticky9 .tm3', 6.5, {}, 'st4+=.5');
      }
      this.tl.to('.sticky9 .tm2 .t-mask', 1.5, {
        y: 0,
        ease: Sine.easeInOut
      }, 'st5').to('.sticky9 .tm2 svg', 0, {
        opacity: 0
      }, 'st5+=1.5').to('.sticky9 .tm2 .t-mask', 1.5, {
        y: '102%',
        ease: Sine.easeInOut
      }, 'st5+=1.5').to('.sticky-wrap.sticky9 .message2 .fade-tit', 2, {
        opacity: 1,
        ease: Sine.easeInOut
      }, 'st5+=1');
      if (STORY.wW > 767) {
        if (html.classList.contains('ie')) {
          this.tl.to('.sticky9 .t-box.ie span', 1, {
            top: -50,
            height: 99
          }, 'st6');
        } else {
          this.tl.to('.sticky9 .t-box.not-ie rect', 1, {
            y: 0,
            height: 99
          }, 'st6');
        }
      } else {
        if (html.classList.contains('ie')) {
          this.tl.to('.sticky9 .t-box.ie span', 1, {
            top: -22,
            height: 44
          }, 'st6');
        } else {
          this.tl.to('.sticky9 .t-box.not-ie rect', 1, {
            y: 0,
            height: 103
          }, 'st6');
        }
      }
      this.tl.to('.sticky9 .txt-matter .top', 1, {
        y: 18
      }, 'st6').to('.sticky9 .txt-matter .top', 5, {}, 'st6+=1').to('.sticky9 .mask-wrap', 4, {
        height: 100 + '%',
        ease: Sine.easeInOut
      }, 'st7').to('.sticky9 .page-dimmed', 4, {
        height: 100 + '%',
        ease: Sine.easeInOut
      }, 'st7').to('.sticky9 .txt-con', 1, {
        height: 0,
        ease: Sine.easeInOut
      }, 'st8');
      if (STORY.wW > 767) {
        this.tl.to('.sticky9 .video-con', 1, {
          height: 96,
          ease: Sine.easeInOut
        }, 'st8');
      } else {
        this.tl.to('.sticky9 .video-con', 1, {
          height: 52,
          ease: Sine.easeInOut
        }, 'st8');
      }
      this.tl.to('.sticky9 .bottom-txt svg', 1, {
        opacity: 0,
        y: -100,
        ease: Sine.easeInOut
      }, 'st8').to('.sticky9 .video-con .bg-box', 1, {
        height: 100 + '%',
        ease: Sine.easeInOut
      }, 'st8');
    },
    init: function init() {
      this.tlEvent();
      motionArray.push(this);
    },
    scroll: function scroll(percent, percent2) {
      var total = this.tl._tDur;
      // feed 9
      if (percent >= 0.1 && percent <= 0.43) {
        document.querySelector('.sticky-wrap.sticky9 .message1').classList.add('txt-show');
      } else {
        document.querySelector('.sticky-wrap.sticky9 .message1').classList.remove('txt-show');
      }
      if (percent > 0.43) {
        document.querySelector('.sticky-wrap.sticky9 .message1').classList.add('txt-hide');
      } else {
        document.querySelector('.sticky-wrap.sticky9 .message1').classList.remove('txt-hide');
      }
      if (STORY.wW > 767) {
        if (percent >= 0.47) {
          document.querySelector('.sticky-wrap.sticky9 .message2').classList.add('txt-show');
        } else {
          document.querySelector('.sticky-wrap.sticky9 .message2').classList.remove('txt-show');
        }
      } else {
        if (percent >= 0.45) {
          document.querySelector('.sticky-wrap.sticky9 .message2').classList.add('txt-show');
        } else {
          document.querySelector('.sticky-wrap.sticky9 .message2').classList.remove('txt-show');
        }
      }
      this.tl.seek(total * percent);
      if (STORY.wW > 767) {
        if (percent2 >= 0.1 && percent2 < 1) STORY.fakeHeaderHide();
      } else {
        if (percent2 >= 0.5 && percent2 < 1) STORY.fakeHeaderHide();
      }
    },
    resize: function resize() {
      var tRow = document.querySelectorAll('.text-array-motion .t-row');
      tRow.forEach(function (i) {
        var txtSvgH = i.querySelector('.t-word svg').clientHeight;
        i.style.paddingTop = txtSvgH + 'px';
      });
      this.tl.seek(0).kill();
      this.tlEvent();
    }
  },
  fellowshipFilmMotion: {
    tl: null,
    tlEvent: function tlEvent() {
      var stickyWrap = document.querySelector('.sticky-wrap.fellowship-film');
      var _maskDot = stickyWrap.querySelector('.mask-dot');
      var _videoDoesText = stickyWrap.querySelector('.video-does-text');
      var _videoCon = _videoDoesText.querySelector('.video-con');
      var _DVideoCon = _videoDoesText.querySelector('.d-video-content');
      var _playBtn = _videoDoesText.querySelector('.button-video-play');
      this.tl = new gsap.timeline();
      this.tl.pause();
      var fslideTop = document.querySelector('.section-fslide .fslide-button').offsetTop + (STORYIPHONE || STORYANDROID ? STORY.wH : window.innerHeight) - $('.section-fslide .fslide-button').parent().height();
      var resizeSW, resizeEW, resizeMT, dotTop;
      if (STORY.wW > 767) {
        this.tl.to(_videoCon, 0, {
          maxWidth: 516,
          height: 127
        }, "reset").to(_maskDot, 0, {
          top: fslideTop
        }, "reset");
        resizeSW = 40;
        resizeEW = 48;
        resizeMT = 10;
        dotTop = (STORYIPHONE || STORYANDROID ? STORY.wH : window.innerHeight) / 2 - 10;
      } else {
        this.tl.to(_videoCon, 0, {
          maxWidth: 206,
          height: 51
        }, "reset").to(_maskDot, 0, {
          top: fslideTop
        }, "reset");
        resizeSW = 20;
        resizeEW = 22;
        resizeMT = 4;
        dotTop = (STORYIPHONE || STORYANDROID ? STORY.wH : window.innerHeight) / 2 - 4;
      }
      if (STORY.wW < 360) this.tl.to(_videoCon, 0, {
        maxWidth: 177,
        height: 43.8
      }, "reset");
      if (STORY.wW >= 768 && STORY.wW <= 1024) this.tl.to(_videoCon, 0, {
        maxWidth: 425,
        height: 100
      }, "reset");
      this.tl.to(_DVideoCon, 0, {
        width: 0,
        height: 0,
        marginTop: 0,
        "border-radius": "100%"
      }, "reset").to(_videoDoesText.querySelector(".video-wrap"), 0, {
        scale: 0.7
      }, "reset").to(stickyWrap.querySelector(".change-bg"), 0, {
        opacity: 0
      }, "reset").to(_videoDoesText, 0, {
        y: "-50%"
      }, "st1").to(_videoDoesText, 2, {
        scale: 1,
        ease: Sine.easeInOut
      }, "st1").to(_maskDot, 2, {
        top: dotTop,
        marginLeft: 1,
        ease: Sine.easeInOut
      }, "st1").to(_DVideoCon, 0, {
        width: resizeSW,
        height: resizeSW
      }, "st2").to(_maskDot, 0, {
        opacity: 0
      }, "st2").to(_DVideoCon, 1, {
        width: STORY.wH + 1,
        height: STORY.wH + 20,
        ease: Sine.easeInOut
      }, "st2+=.1").to(_videoDoesText.querySelector(".video-wrap"), 1, {
        scale: 1,
        ease: Sine.easeInOut
      }, "st2+=.1").to(_DVideoCon, 0.1, {
        width: STORY.wW + 1,
        "border-radius": 0
      }, "st2+=1.1");
      if (STORY.wW > 767) {
        this.tl.to(_videoCon, 2, {
          height: STORY.wH + 150,
          ease: Sine.easeInOut
        }, "st3").to(_videoCon, 1, {
          maxWidth: STORY.wW + 1,
          ease: Sine.easeInOut
        }, "st4");
      } else {
        this.tl.to(_videoCon, 4, {
          height: STORY.wH + 150,
          ease: Sine.easeInOut
        }, "st3").to(_videoCon, 2, {
          maxWidth: STORY.wW + 5,
          ease: Sine.easeInOut
        }, "st4");
      }
      if (STORY.wW > 767) {
        this.tl.to(stickyWrap.querySelector(".change-bg"), 1, {
          opacity: 1,
          ease: Sine.easeInOut
        }, "st4");
      } else {
        this.tl.to(stickyWrap.querySelector(".change-bg"), 1.5, {
          opacity: 1,
          ease: Sine.easeInOut
        }, "st4+=.5");
      }
      this.tl.to(_playBtn, 1, {
        opacity: 1,
        ease: Sine.easeInOut
      }, "st4").to(_playBtn, 5, {}, "st4+=1");
      if (STORY.wW > 767) {
        this.tl.to(_playBtn, 4, {
          opacity: 0,
          ease: Sine.easeInOut
        }, "st4+=6").to(_DVideoCon, 9, {
          width: resizeEW,
          height: resizeEW,
          ease: Sine.easeInOut
        }, "st5")
        // .to(stickyWrap.querySelector(".change-bg"), 4, { opacity: 0, ease: Sine.easeInOut, }, "st5")
        .to(stickyWrap.querySelector(".change-bg"), 3, {
          opacity: 0,
          ease: Sine.easeInOut
        }, "st5").to(_DVideoCon, 6, {
          "border-radius": "25%",
          ease: Sine.easeInOut
        }, "st5+=2.4").to(_DVideoCon, 3, {
          "border-radius": "50%",
          ease: Sine.easeInOut
        }, "st5+=8.4").to(_videoDoesText.querySelector(".video-wrap"), 3, {
          opacity: 0,
          ease: Sine.easeInOut
        }, "st5+=4.5")
        // .to(_videoDoesText.querySelector(".dimmed"), 3, { opacity: 1, ease: Sine.easeInOut }, "st5+=4.5");
        .to(_videoDoesText.querySelector(".dimmed"), 2, {
          opacity: 1,
          ease: Sine.easeInOut
        }, "st5");
      } else {
        this.tl.to(_playBtn, 2, {
          opacity: 0,
          ease: Sine.easeInOut
        }, "st4+=6").to(_DVideoCon, 4.5, {
          width: resizeEW,
          height: resizeEW,
          ease: Sine.easeInOut
        }, "st5").to(stickyWrap.querySelector(".change-bg"), 2, {
          opacity: 0,
          ease: Sine.easeInOut
        }, "st5").to(_DVideoCon, 3, {
          "border-radius": "25%",
          ease: Sine.easeInOut
        }, "st5+=1.3").to(_DVideoCon, 1.5, {
          "border-radius": "50%",
          ease: Sine.easeInOut
        }, "st5+=4.2").to(_videoDoesText.querySelector(".video-wrap"), 1.5, {
          opacity: 0,
          ease: Sine.easeInOut
        }, "st5+=2.2")
        // .to(_videoDoesText.querySelector(".dimmed"), 1.5, { opacity: 1, ease: Sine.easeInOut }, "st5+=2.2");
        .to(_videoDoesText.querySelector(".dimmed"), 1.5, {
          opacity: 1,
          ease: Sine.easeInOut
        }, "st5");
      }
    },
    init: function init() {
      var _this = this;
      _this.tlEvent();
      $(window).on('resize', function () {
        _this.resize();
      });
      motionArray.push(_this);
    },
    scroll: function scroll(percent, percent2) {
      var total = this.tl._tDur;
      this.tl.seek(total * percent);
      if (STORY.wW > 767) {
        if (percent > 0 && percent < 0.2) STORY.fakeHeaderHide();
        if (percent >= 0.2 && percent < 0.58) STORY.fakeHeaderShow(percent, 0.2, 13, 13, false);
        if (percent >= 0.58 && percent <= 0.7) STORY.fakeHeaderShow(percent, 0.58, 12, 12, true);
        if (percent > 0.7 && percent < 1) STORY.fakeHeaderHide();
      } else {
        if (percent > 0 && percent < 0.2) STORY.fakeHeaderHide();
        if (percent >= 0.4 && percent < 0.7) STORY.fakeHeaderShow(percent, 0.4, 10, 10, false);
        if (percent >= 0.7 && percent <= 0.8) STORY.fakeHeaderShow(percent, 0.7, 8, 8, true);
        if (percent > 0.8 && percent < 1) STORY.fakeHeaderHide();
      }
    },
    resize: function resize() {
      this.tl.seek(0).kill();
      this.tlEvent();
    }
  },
  fslideSinario: {
    fslide: {
      length: $('.fslide .fslide-slide').length,
      data: [],
      linebreak: [5, 10, 10],
      navOffset: 20,
      fboxHeight: 95,
      // desktop
      maxLine: 0,
      current: 0,
      index: 0,
      percent: 0
    },
    tl: null,
    tlEvent: function tlEvent() {
      var _this = this;
      _this.tl = new gsap.timeline();
      _this.tl.pause();
      var fbox = $('.fbox'),
        fslide = $('.fslide'),
        fmessage = $('.fmessage'),
        fakeText = $('.fslide .fms');

      // reset
      $('.fms, .fbs').html('');
      fbox.removeAttr('style');
      _this.loadMessage();
      _this.tl.to('.section-fslide .button-container', 0, {
        opacity: 0
      }, 'reset').to('.fbox-person', 0, {
        y: '-40%',
        ease: Sine.easeInOut
      }, 'reset');
      var fslideImage = fslide.find('figure img');
      fslideImage.removeAttr('style').css({
        width: fslideImage.width(),
        height: fslideImage.height()
      });

      // lines of fist text
      _this.fslide.maxLine = 0;
      fslide.find('.fslide-slide .fms').each(function (index, el) {
        _this.fslide.maxLine = Math.max($(el).find('.fmessage-box').length, _this.fslide.maxLine);
      });
      for (var i = 0; i < _this.fslide.maxLine; i++) {
        var fmg = fslide.find('.fslide-slide .fms').eq(0).find('.fmessage-box').eq(i);
        var fmgLine = $('<div class="fmessage-box"></div>').html(fmg.length ? fmg.html() : '<span>&nbsp;</span>');
        fmgLine.css('width', fmg.length && fmg.width());
        fmessage.find('.fms').append(fmgLine);
        if (fmg.length) {
          var fboxLine = $('<div class="fbox-box"></div>').html('<div class="fbox-cover">' + fmg.html() + '</div>');
          fboxLine.css('width', fmg.width());
          fbox.find('.fbs').append(fboxLine);
        }
      }

      // message load
      var fmgHeight = fakeText.eq(0).find('.fmessage-box').height(),
        fmgMarginBottom = parseInt(fakeText.eq(0).find('.fmessage-box').css('margin-bottom'));
      fbox.css('height', '');
      fbox.find('.fbs').css('height', fmgHeight);
      fbox.find('.fbox-person').html(_this.fslide.data[0][1]).css('bottom', '');
      fmessage.find('.fmessage-person').css('transform', 'translateY(0)').html(_this.fslide.data[0][1]);
      var firstParent = fakeText.eq(0).height();
      fbox.css('height', firstParent);
      fbox.find('.fbs').css('top', firstParent / 2 - fmgHeight / 2);

      // fbox
      $('.fbs .fbox-box').each(function (index, i) {
        _this.tl.to(i, 0, {
          width: $(i).parent().width(),
          ease: Sine.easeInOut
        }, 'reset');
        if (STORY.wW >= 767) {
          if (index == 0) _this.tl.to(i, 0, {
            y: -(_this.fslide.fboxHeight / 2 - i.offsetHeight / 2)
          }, 'reset');
          if (index == $('.fbs .fbox-box').length - 1) _this.tl.to(i, 0, {
            y: _this.fslide.fboxHeight / 2 - i.offsetHeight / 2
          }, 'reset');
        }
        _this.tl.to(i, 0.75, {
          y: _this.fboxGetMove(index, fmgHeight, fmgMarginBottom),
          ease: Sine.easeInOut
        }, 'fb0').to(i, 0.75, {
          width: fmessage.find('.fmessage-box').eq(index).width(),
          ease: Sine.easeInOut
        }, 'fb1').to(i.querySelector('.fbox-cover'), 1, {
          maxWidth: fmessage.find('.fmessage-box').eq(index).width(),
          ease: Sine.easeInOut
        }, 'fb2+=' + 0.2 * index);
      });
      _this.tl.to(fbox, 0.75, {
        width: fmessage.width(),
        marginLeft: 0,
        ease: Sine.easeInOut
      }, 'fb1').to('.fbox-person', 1, {
        y: 0,
        opacity: 1,
        ease: Sine.easeInOut
      }, 'fb2+=0.1');
      var fboxH = -fbox.height() / 2 - (fbox.offset().top - fmessage.offset().top);
      if (STORY.wW < 767) {
        if (!STORYIPHONE && !STORYANDROID) fboxH = (STORY.wH * (0.5 - 0.12) + parseInt(fbox.css('margin-top'))) * -1;
        _this.tl.to('.fbox', 0.75, {
          transform: "translate(-50%, ".concat(fboxH, "px)"),
          ease: Sine.easeInOut
        }, 'fb3').to('.fbox', 0, {
          opacity: 0,
          marginTop: '-100%'
        }, 'fb4');
      } else {
        _this.tl.to('.fbox', 0.75, {
          transform: "translate(-50%, ".concat(fboxH, "px)"),
          ease: Sine.easeInOut
        }, 'fb3').to('.fbox .fbs', 0.75, {
          top: fbox.find('.fbox-person').height(),
          ease: Sine.easeInOut
        }, 'fb3').to('.fbox .fbox-person', 0.75, {
          bottom: 0,
          ease: Sine.easeInOut
        }, 'fb3').to('.fbox', 0, {
          opacity: 0
        }, 'fb4');
      }
      _this.tl.to('.fslide-wrap', 0, {
        y: '100%'
      }, 'reset').to('.fslide-wrap', 0.5, {
        y: 0,
        ease: Sine.easeInOut
      }, 'fb3+=0.25').to(fmessage, 0, {
        opacity: 1
      }, 'fb4');

      // fslide
      var step = STORY.wW < 767 ? 4 : 2.5,
        stay = STORY.wW < 767 ? 3 : 1.7,
        miniStep = STORY.wW < 767 ? 1 / 3 : 0.8 / 3,
        width = fslide.find('.fslide-wrap').width() / _this.fslide.length;
      // CustomEase.create('wrapEase', 'M0,0 C0.564,0 0.661,0.176 0.7,0.4 0.712,0.47 0.766,0.972 1,1');

      fslide.find('.fslide-slide').each(function (index, el) {
        _this.tl.to(_this.fslide, 0, {
          current: index
        }, 'fs1+=' + (step * index - miniStep * 2));
        _this.tl.to(_this.fslide, 0, {
          index: index
        }, 'fs1+=' + step * index);

        // wrap
        if (index < _this.fslide.length - 1) {
          // _this.tl.to('.fslide-wrap', step , { x: -width * (index + 1), ease: 'wrapEase' }, 'fs1+=' + step * index);
          _this.tl.to('.fslide-wrap', step / 2, {
            x: -width * (index + 1),
            ease: Sine.easeInOut
          }, 'fs1+=' + (step * index + step / 2));
        } else {
          var x = -width * (_this.fslide.length - 1) + (STORY.wW < 767 ? -width : -width / 2) + -STORY.wW / 2;
          // _this.tl.to('.fslide-wrap', step, { x: x, ease: 'wrapEase' }, 'fs1+=' + step * index);
          _this.tl.to('.fslide-wrap', step / 2, {
            x: x,
            ease: 'wrapEase'
          }, 'fs1+=' + (step * index + step / 2));
        }

        // color image
        _this.tl.to($(el).find('figure.color'), miniStep, {
          opacity: 0
        }, 'fs1+=' + (step * index + stay)).to($(el).find('figure.color'), miniStep, {
          opacity: 1
        }, 'fs1+=' + (step * index - miniStep));

        // white button
        _this.tl.to('.fslide .button-container', miniStep, {
          opacity: 0
        }, 'fs1+=' + (step * index + stay / 2)).to('.fslide .button-container', miniStep, {
          opacity: 1
        }, index ? 'fs1+=' + (step * index - miniStep) : 'fs1-=' + miniStep);

        // message box
        var nextW = 0;
        fmessage.find('.fmessage-box').each(function (jndex, j) {
          var nowW = fslide.find('.fslide-slide').eq(index).find('.fmessage-box').eq(jndex).length ? fslide.find('.fslide-slide').eq(index).find('.fmessage-box').eq(jndex).width() : 0;
          if (index < _this.fslide.length - 1) {
            var nextFake = fslide.find('.fslide-slide').eq(index + 1).length && fslide.find('.fslide-slide').eq(index + 1).find('.fmessage-box');
            nextW = nextFake.eq(jndex).length && nextFake.eq(jndex).width();
          }
          if (index < _this.fslide.length - 1) {
            _this.tl.fromTo(j, {
              width: nowW
            }, {
              duration: miniStep,
              width: nextW
            }, 'fs1+=' + (step * index + stay + miniStep)).to('.fmessage .fmessage-person', miniStep, {
              opacity: 0,
              y: '-40%'
            }, 'fs1+=' + (step * index + stay));
          } else {
            _this.tl.fromTo(j, {
              width: nowW
            }, {
              duration: miniStep,
              width: nextW
            }, 'fs1+=' + (step * index + stay / 2 + miniStep)).to('.fmessage .fmessage-person', miniStep, {
              opacity: 0,
              y: '-40%'
            }, 'fs1+=' + (step * index + stay / 2 + miniStep));
          }
          $(j).find('span').length && _this.tl.to($(j).find('span'), miniStep, {
            opacity: 0
          }, 'fs1+=' + (step * index + stay));
          if (index < _this.fslide.length - 1) {
            $(j).find('span').length && _this.tl.to($(j).find('span'), miniStep, {
              opacity: 1
            }, 'fs1+=' + (step * (index + 1) - miniStep));
            _this.tl.to('.fmessage .fmessage-person', miniStep, {
              opacity: 1,
              y: 0
            }, 'fs1+=' + (step * (index + 1) - miniStep));
          }
        });
      });

      // resize message box
      fmessage.find('.fmessage-box').each(function (index, i) {
        $(i).css('width', fakeText.eq(0).find('.fmessage-box').eq(index).length && fakeText.eq(0).find('.fmessage-box').eq(index).width());
      });
      fmessage.find('.fmessage-person').css('top', fakeText.eq(0).find('.fmessage-box').length * (fmgHeight + fmgMarginBottom) - fmgMarginBottom);

      // ending
      _this.tl.to('.section-fslide .lastcut', STORY.wW < 767 ? 1.4 : 0.5, {
        opacity: 1,
        ease: Sine.easeInOut
      }, 'fs1+=' + (step * (_this.fslide.length - 1) + stay));
      STORY.wW < 767 && _this.tl.to('.section-fslide .lastcut', 1.8, {}, 'fs2');
    },
    init: function init() {
      var _this = this;
      _this.tlEvent();

      // navigation
      $('.section-fslide .fnav:enabled').on('click', function (e) {
        if (!$('.fslide').hasClass('moving') && !$(e.currentTarget).prop('disabled')) {
          $('.fslide').addClass('moving');
          var translateX = Math.round(_this.wrapX()),
            now = Math.round(!STORYIPHONE && !STORYANDROID ? window.pageYOffset : document.querySelector('#story-wrap').scrollTop),
            reset = Math.round(_this.fslide.percent * $('.section-fslide').height() * 0.933),
            each = $('.fslide-wrap').width() / $('.fslide-slide').length,
            next = 0;
          var sw = $('.section-fslide').height() / $('.fslide-slide').length * ($('.fslide-slide').length - 2) + STORY.wW;
          var block = sw / ($('.fslide-slide').length - 1) * 1.05;
          if (e.currentTarget.classList.contains('prev')) {
            next = block * _this.fslide.current;
            if (translateX - each * _this.fslide.current < _this.fslide.navOffset) next = block * (_this.fslide.current - 1);
            next = Math.max(0, next);
          } else {
            next = block * _this.fslide.current;
            if (each * _this.fslide.current - translateX < _this.fslide.navOffset) next = block * (_this.fslide.current + 1);
            next = Math.min(next, sw);
          }
          $(STORYIPHONE || STORYANDROID ? '#story-wrap' : 'html, body').animate({
            scrollTop: now - reset + Math.round(next)
          }, {
            duration: 500,
            complete: function complete() {
              $('.fslide').removeClass('moving');
            }
          });
        }
      });
      $(window).on('resize', function () {
        _this.resize();
      });
      motionArray.push(this);
    },
    scroll: function scroll(percent) {
      var total = this.tl._tDur;
      var _this = this;
      if ($('.section-fslide').hasClass('show')) {
        _this.tl.seek(total * percent);
        _this.fslide.percent = Math.max(0, percent - 0.142);

        // navigation
        var fslideNav = $('.fslide-nav');
        if (STORY.wW < 767) {
          if (percent > 0.142 && percent < 0.831) {
            !fslideNav.hasClass('show') && fslideNav.addClass('show');
            var translateX = _this.wrapX(),
              prev = fslideNav.find('.fnav.prev'),
              next = fslideNav.find('.fnav.next');
            if (translateX < _this.fslide.navOffset * 2) {
              !prev.attr('disabled') && prev.attr('disabled', 'true');
            } else {
              prev.attr('disabled') && prev.removeAttr('disabled');
            }
            if (translateX > $('.fslide-wrap').width() - $('.fslide-wrap').width() / $('.fslide-slide').length - _this.fslide.navOffset * 2) {
              !next.attr('disabled') && next.attr('disabled', 'true');
            } else {
              next.attr('disabled') && next.removeAttr('disabled');
            }
          } else {
            fslideNav.hasClass('show') && fslideNav.removeClass('show');
          }
        }

        // current section - change message and person
        var fakeText = $('.fslide .fms');
        if ($('.fmessage span').eq(0).html() != fakeText.eq(this.fslide.current).find('span').html()) {
          var box = $('.fmessage .fmessage-box');
          for (var i = 0; i < this.fslide.maxLine; i++) {
            var fm = fakeText.eq(this.fslide.current).find('.fmessage-box').eq(i) && fakeText.eq(this.fslide.current).find('.fmessage-box').eq(i).find('span').html();
            box.eq(i).find('span').html(fm || '&nbsp;');
          }
          var top = fakeText.eq(this.fslide.current).find('.fmessage-box').length * (fakeText.eq(0).find('.fmessage-box').height() + parseInt(fakeText.eq(0).find('.fmessage-box').css('margin-bottom')));
          $('.fmessage .fmessage-person').html($('.fslide .fmessage-person').eq(this.fslide.current).html()).css('top', top - parseInt(fakeText.eq(0).find('.fmessage-box').css('margin-bottom')));
        }
      }
    },
    resize: function resize() {
      this.tl.seek(0).kill();
      this.tlEvent();
    },
    wrapX: function wrapX() {
      function getStyle(el, prop) {
        if (window.getComputedStyle && window.getComputedStyle(el, null)) return window.getComputedStyle(el, null).getPropertyValue(prop);
        return el.style[prop];
      }
      var wrapStyle = getStyle($('.fslide-wrap')[0], 'transform'),
        numberPattern = /-?\d+\.?\d*/g;
      if ($('html').hasClass('ie')) {
        return Math.abs(parseInt(wrapStyle.match(numberPattern)[4]));
      }
      return Math.abs(new WebKitCSSMatrix(wrapStyle).m41);
    },
    loadMessage: function loadMessage() {
      var _this = this;
      $('.section-fslide .fslide .fslide-slide .fms').each(function (index, i) {
        var text = $('.fslide-slide').eq(index).find('.fms').data('message'),
          person = $('.fslide-slide').eq(index).find('.fms').data('person'),
          breakWord;
        if (STORY.wW > 767) {
          breakWord = $('.fslide-slide').eq(index).find('.fms').data('linebreak');
        } else {
          breakWord = $('.fslide-slide').eq(index).find('.fms').data('linebreak-mobile');
        }
        _this.fslide.data[index] = [text, person];
        var lines = _this.changeMessage(text, breakWord);
        lines.forEach(function (j, jndex) {
          var line = $('<div class="fmessage-box"></div>').html('<span>' + j + '</span>');
          $(i).append(line);
        });
        i.parentElement.querySelector('.fmessage-person').innerHTML = person;
      });
    },
    changeMessage: function changeMessage(text, breakWord) {
      var lines = [],
        maxWidth = $('.fmessage').width() * 0.95,
        width = 0,
        i = 0,
        j = 0;
      if (STORY.wW < 360) {
        while (text.length) {
          var testWidth = function testWidth(t) {
            var test = $('<span class="fmessage-box"></span>').html('<span>' + t + '</span>');
            $('.fmessage .fms').append(test);
            var span = $('.fmessage .fms .fmessage-box span').eq(0);
            var w = span.width() + parseInt(span.css('margin-bottom')) * 2;
            $('.fmessage .fms .fmessage-box').remove();
            return w;
          };
          for (i = text.length; testWidth(text.substr(0, i)) > maxWidth; i--) {}
          var result = text.substr(0, i);
          if (i !== text.length) for (j = 0; result.indexOf(' ', j) !== -1; j = result.indexOf(' ', j) + 1) {}
          lines.push(result.substr(0, j || result.length));
          width = Math.max(width, testWidth(lines[lines.length - 1]));
          text = text.substr(lines[lines.length - 1].length, text.length);
        }
      } else {
        var words = text.split(' ');
        while (words.length) {
          var line = '';

          // console.log(_this, text);
          for (i = 0; i < breakWord[j]; i++) {
            if (words.length) {
              line += words.shift() + ' ';
            }
          }
          lines.push(line.trim());
          j++;
        }
      }
      return lines;
    },
    fboxGetMove: function fboxGetMove(index, height, marginBottom) {
      var flength = $('.fbox .fbox-box').length,
        move = 0;
      if (flength % 2) {
        if (index != Math.floor(flength / 2)) {
          var nth = index - Math.floor(flength / 2);
          move = height + marginBottom;
          move *= nth;
        }
      } else {
        if (index >= flength / 2) {
          var nth = index - 1;
          move = height / 2 + height * (nth - 1) + marginBottom / 2 * nth + marginBottom / 2 * (nth - 1);
        } else {
          var nth = flength / 2 - index;
          move = height / 2 + height * (nth - 1) + marginBottom / 2 * nth + marginBottom / 2 * (nth - 1);
          move *= -1;
        }
        if (flength == 2 && index == 1) {
          move *= -1;
        }
      }
      return move;
    }
  },
  voiceSinario: {
    wave: [{
      scroll: 0,
      stroke: 'rgba(221,221,221,0)'
    }, {
      scroll: 0,
      stroke: 'rgba(221,221,221,0)'
    }, {
      scroll: 0,
      stroke: 'rgba(221,221,221,0)'
    }, {
      scroll: 0,
      stroke: 'rgba(221,221,221,0)'
    }, {
      scroll: 0,
      stroke: 'rgba(221,221,221,0)'
    }],
    tl: null,
    tlEvent: function tlEvent() {
      var _this = this;
      _this.tl = new gsap.timeline();
      _this.tl.pause();

      // does matter scale
      var scale = STORY.wW >= 767 && STORY.wH < 1000 ? STORY.wH / 1000 * 0.8 : 1;
      $('.section-voice.v1 .video-does-text, .section-voice.v2 .video-does-text').css('transform', 'translate(-50%, -50%) scale(' + scale + ')');
      $('.section-voice.v3 .video-does-text').css('transform', 'translateY(-50%) scale(' + scale + ')');
      _this.tl.to('.section-voice.v1 .voice-title', 0.4, {
        opacity: 0
      }, 'reset').to('.voice-canvas', 0.4, {
        opacity: 1
      }, 'reset');

      // wave
      _this.wave.forEach(function (i, index) {
        _this.tl.to(_this.wave[index], 0.6, {
          scroll: 1,
          ease: Sine.easeIn
        }, 'st1+=' + (0.1 + 0.1 * index)).to(_this.wave[index], 0.5, {
          stroke: 'rgba(221,221,221,1)',
          ease: CustomEase.create('easeWave', 'M0,0,C0,0.5,0.05,1,0.3,1,0.854,1,1,0.4,1,0')
        }, 'st1+=' + (0.1 + 0.1 * index));
      });

      // masking
      var maskSize = STORY.wW > STORY.wH ? Math.min(1920 * 1.3, STORY.wW * 1.3) : Math.min(1920 * 1.5, STORY.wH * 1.5);
      $('.voice-bg').css({
        marginTop: '',
        marginLeft: ''
      });
      if ($('html').hasClass('ie')) {
        _this.tl.to('.voice-bg', 0, {
          width: STORY.wW < 767 ? 22 : 48,
          height: STORY.wW < 767 ? 22 : 48
        }, 'reset').to('.voice-bg', STORY.wW < 767 ? 0.8 : 0.6, {
          width: Math.round(maskSize),
          height: Math.round(maskSize),
          opacity: 1,
          ease: Linear.easeNone
        }, 'st2-=0.3');
      } else {
        _this.tl.to('.voice-bg', 0, {
          clipPath: "circle(".concat(STORY.wW < 767 ? 10.8 : 24, "px)")
        }, 'reset').to('.voice-bg', STORY.wW < 767 ? 0.8 : 0.6, {
          clipPath: "circle(".concat(Math.round(maskSize), "px)"),
          opacity: 1,
          ease: Linear.easeNone
        }, 'st2-=0.3');
      }
      _this.tl.to('.section-voice.v1 .change-bg', 0.2, {
        opacity: 1,
        ease: Linear.easeNone
      }, STORY.wW < 767 ? 'st2+=0.2' : 'st2-=0.1').to('.voice-bg', 0.2, {
        marginTop: 0,
        marginLeft: 0
      }, 'st2-=0.3').to('.voice-filter', STORY.wW < 767 ? 0.35 : 0.2, {
        opacity: 0,
        ease: Sine.easeInOut
      }, 'st2-=0.3').to('.voice-canvas', 0.2, {
        opacity: 0,
        ease: Sine.easeInOut
      }, STORY.wW < 767 ? 'st2-=0.35' : 'st2-=0.3').to('.section-voice.v1 .voice-title', 0.4, {
        opacity: 1,
        ease: Sine.easeInOut
      }, 'st2').to('.section-voice.v1 .voice-title', 0.1, {}, 'st3');
    },
    init: function init() {
      var _this = this;
      _this.tlEvent();
      $(window).on('resize', function () {
        _this.resize();
      });
      motionArray.push(this);
    },
    scroll: function scroll(percent) {
      var total = this.tl._tDur;
      if ($('.section-voice.v1').hasClass('show')) {
        this.tl.seek(total * percent);
        var msg = $('.section-voice.v1 .message-txt');
        if (percent > 0.02 && percent <= 0.6) {
          !msg.hasClass('txt-show') && msg.addClass('txt-show');
        } else {
          msg.hasClass('txt-show') && msg.removeClass('txt-show');
        }
        if (percent > 0.6) {
          !msg.hasClass('txt-hide') && msg.addClass('txt-hide');
        } else {
          msg.hasClass('txt-hide') && msg.removeClass('txt-hide');
        }
        if (percent > 0 && percent < 0.66) STORY.fakeHeaderHide();
        if (percent >= 0.66 && percent < 1) STORY.fakeHeaderShow(percent, 0.66, 10, 10, false);
        if (percent > 0.1 && percent < 0.6) {
          if ($('.section-voice.v1 .vbg.clone video').length) {
            $('.section-voice.v1 .vbg.clone video')[0].pause();
            $('.section-voice.v1 .vbg.clone video')[0].currentTime = 0;
          }
          if (!$('.section-voice.v2').hasClass('novid')) {
            $('.section-voice.v2').addClass('novid');
            $('.voice-background').data('bg', -1);
            $('.section-voice.v2 video').each(function (index, i) {
              i.pause();
              i.currentTime = 0;
            });
          }
        }
      }
    },
    resize: function resize() {
      this.tl.seek(0).kill();
      this.tlEvent();
    }
  },
  voiceSinario2: {
    voice: {
      bgSet: 0,
      current: 0
    },
    tl: null,
    tlEvent: function tlEvent() {
      var _this = this;
      _this.tl = new gsap.timeline();
      _this.tl.pause();
      $('.section-voice .vbg').remove();
      var videoScale = 0,
        v1_bg = $('.section-voice.v1 .voice-bg'),
        v2_bg = $('.section-voice.v2 .voice-background');
      var bgSize = '110vw auto';
      var bgSize2 = 'auto 125vh';

      // load background
      _this.voice.bgSet.forEach(function (i, index) {
        var file = i.split('.');
        var newBg = $('<div class="vbg vbg-' + (index + 1) + '">');
        if (['webm', 'mp4'].includes(file[1])) {
          // var vidFile = STORY.wW < 767 ? file[0] + '-m.' + file[1] : i,
          var vidFile = i,
            vid = $('<video playsinline muted loop>'),
            src = $('<source src="' + vidFile + '" type="video/' + file[1] + '">');
          vid.append(src);
          newBg.append(vid);
          if (STORY.wW > 767) {
            vid.parents('.vbg').css({
              'background-image': 'url(' + file[0] + '-thumbnail-p.jpg)',
              'background-size': bgSize2
            });
          } else {
            vid.parents('.vbg').css({
              'background-image': 'url(' + file[0] + '-thumbnail.jpg)',
              'background-size': bgSize
            });
          }
          v2_bg.append(newBg.clone());
          var newVid = v2_bg.find(".vbg-".concat(index + 1, " video"));
          if (STORY.wW < 767 && STORY.wH / STORY.wW > 2.111) {
            if (!videoScale) {
              videoScale = STORY.wH / (STORY.wW * 2.11) * 1.01;
            }
            newVid.css('transform', 'translate(-50%, -50%) scale(' + videoScale + ')');
          } else if (STORY.wW >= 767 && STORY.wW / STORY.wH < 1.777) {
            if (!videoScale) {
              videoScale = STORY.wH / newVid.height() * 1.01;
            }
            newVid.css('transform', 'translate(-50%, -50%) scale(' + videoScale + ')');
          }
          if (!index) {
            newBg.addClass('clone');
            if (STORY.wW < 767 && STORY.wH / STORY.wW > 2.111) newBg.find('video').css('transform', 'translate(-50%, -50%) scale(' + videoScale + ')');else if (STORY.wW >= 767 && STORY.wW / STORY.wH < 1.777) newBg.find('video').css('transform', 'translate(-50%, -50%) scale(' + videoScale + ')');
            v1_bg.append(newBg);
          }
        } else if (['jpg', 'png', 'gif', 'jpeg'].includes(file[1])) {
          var imgFile = STORY.wW < 767 ? file[0] + '-m.' + file[1] : i;
          newBg.css('background-image', 'url(' + imgFile + ')');
          v2_bg.append(newBg.clone());
          if (!index) $('.section-voice.v1 .voice-bg').css('background-image', 'url(' + imgFile + ')');
        }
      });
      if (STORY.wW > 767) {
        $('.section-voice.v1 .voice-bg, .voice-background .vbg').css('background-size', bgSize2);
      } else {
        $('.section-voice.v1 .voice-bg, .voice-background .vbg').css('background-size', bgSize);
      }
      var bgLength = $('.section-voice.v2 .vbg').length - 1;
      var titleY;
      if (STORY.wW > 767) {
        titleY = STORY.wH * 0.33 / bgLength / 2;
      } else {
        titleY = 104 / bgLength / 2;
      }
      $('.section-voice.v1 .txt-does').css('transform', "translateY(".concat(titleY * -bgLength, "px)"));
      $('.section-voice.v1 .txt-matter').css('transform', "translateY(".concat(titleY * bgLength, "px)"));

      // background image section
      _this.tl.to('.section-voice.v2 .voice-title', 0, {
        opacity: 1
      }, 'reset');
      $('.voice-background .vbg').each(function (index, i) {
        var step = index ? index * 2 : index;
        _this.tl.to(_this.voice, 0, {
          current: index
        }, 'st3+=' + step ? step - 1 : step);
        if (index < bgLength) {
          _this.tl.fromTo('.section-voice.v2 .txt-does', {
            y: titleY * (index - bgLength)
          }, {
            duration: 1,
            y: titleY * (index + 1 - bgLength)
          }, 'st3+=' + step).fromTo('.section-voice.v2 .txt-matter', {
            y: titleY * (bgLength - index)
          }, {
            duration: 1,
            y: titleY * (bgLength - (index + 1))
          }, 'st3+=' + step);
        } else {
          _this.tl.to(i, 0, {
            opacity: 1
          }, 'reset').to(i, 1, {
            opacity: 0,
            ease: Sine.easeInOut
          }, 'st3+=' + step).to('.section-voice.v2 .voice-title', 1, {
            opacity: 0
          }, 'st3+=' + step).to('.section-voice.v2 .change-bg', 1, {
            opacity: 0,
            ease: Linear.easeNone
          }, 'st3+=' + step);
        }
      });
      $('.section-voice.v1 .txt-does, .section-voice.v2 .txt-does').css('transform', "translateY(".concat(titleY * -bgLength, "px)"));
      $('.section-voice.v1 .txt-matter, .section-voice.v2 .txt-matter').css('transform', "translateY(".concat(titleY * bgLength, "px)"));
    },
    init: function init() {
      var _this = this;

      // load background section
      $('.section-voice .vbg').remove();
      var bgData = $('.section-voice.v2 .voice-background').data('background');
      var random = Math.floor(Math.random() * bgData.length);
      _this.voice.bgSet = bgData[random];
      _this.tlEvent();
      $(window).on('resize', function () {
        _this.resize();
      });
      motionArray.push(this);
    },
    scroll: function scroll(percent) {
      var total = this.tl._tDur;
      var _this = this;
      if ($('.section-voice.v2').hasClass('show')) {
        _this.tl.seek(total * percent);
        $('.section-voice.v2').hasClass('novid') && $('.section-voice.v2').removeClass('novid');
        parseInt($('.voice-background').data('bg')) != _this.voice.current && _this.changeBg(_this.voice.current);
        if (percent < 0.98) _this.V3Reset();
        if (percent >= 0.9 && percent < 1) STORY.fakeHeaderShow(percent, 0.9, 10, 10, true);
        if (percent < 0.8) document.querySelector('#dsmtHeader').removeAttribute('data-color-type');
      }
    },
    V3Reset: function V3Reset() {
      if (!$('.section-voice.v3 .last-container').eq(0).hasClass('show') || $('.voice-mask .text-input').val() != '') {
        $('.section-voice.v3 .last-container').each(function (index, i) {
          if (index == 3) {
            if (!index) {
              $(i).addClass('show').removeAttr('aria-hidden');
            } else {
              $(i).removeClass('show').attr('aria-hidden', 'true');
            }
          } else {
            setTimeout(function () {
              if (!index) {
                $(i).addClass('show').removeAttr('aria-hidden');
              } else {
                $(i).removeClass('show').attr('aria-hidden', 'true');
              }
            }, 600);
          }
        });
        $('.voice-mask .text-input').val('').data('text', '').removeAttr('tabindex').css('height', STORY.wW < 767 ? 32 : 72).css('font-size', '').blur();
        $('.section-voice.v3 .share button').attr('tabindex', '-1');
        $('.section-voice.v3 .last-text').removeClass('active');
        $('.voice-mask .text-button.post-btn').removeAttr('tabindex').attr('aria-disabled', 'true');
        $('.section-voice .lc1').data('line', 1).removeClass('line-1 line-2 line-3');
        clearTimeout(window.v3SetTime1);
        clearTimeout(window.v3SetTime2);
        clearTimeout(window.v3SetTime3);
        clearTimeout(window.v3SetTime4);
      }
      voiceActive = false;
      STORY.topHide();
    },
    resize: function resize() {
      if (window.PREV_WIDTH_SIZE != window.CURRENT_WIDTH_SIZE) {
        this.tl.seek(0).kill();
        this.tlEvent();
      }
    },
    changeBg: function changeBg(current) {
      $('.voice-background').data('bg', current);
      $('.section-voice.v2 video').each(function (index, i) {
        if (current == index || current == index + 1) {
          if (!document.documentElement.classList.contains('vestibulopathy')) {
            i.play();
            if (index == 0) $('.section-voice.v1 .vbg.clone video')[0].play();
          }
        } else {
          i.pause();
          i.currentTime = 0;
          if (index == 0) {
            $('.section-voice.v1 .vbg.clone video')[0].pause();
            $('.section-voice.v1 .vbg.clone video')[0].currentTime = 0;
          }
        }
      });
      $('.voice-background .vbg').removeClass('hide');
      $('.voice-background .vbg').each(function (index, i) {
        if (index < current) i.classList.add('hide');
      });
    },
    voiceLastContainer: function voiceLastContainer(i) {
      $('.section-voice.v3 .last-container').removeClass('show').attr('aria-hidden', 'true');
      setTimeout(function () {
        $('.section-voice.v3 .last-container').eq(i).addClass('show').removeAttr('aria-hidden');
      }, 600);
    }
  },
  voiceSinario3: {
    input: {
      fontStep: 0,
      maxSize: 0,
      minSize: 0
    },
    tl: null,
    tlEvent: function tlEvent() {
      var _this = this;
      _this.tl = new gsap.timeline();
      _this.tl.pause();

      // input
      _this.input.maxSize = STORY.wW < 767 ? 32 : 84;
      _this.input.minSize = STORY.wW < 767 ? 18 : 32;
      _this.input.fontStep = STORY.wW < 767 ? 2.2 : STORY.wW < 1280 ? 4.4 : 3.6;

      // appear
      _this.tl.to('.section-voice.v3 .voice-mask', 0, {
        opacity: 0
      }, 'reset').to('.section-voice.v3 .voice-mask', 0.8, {
        opacity: 1
      }, 'st4').to('.section-voice.v3 .voice-mask', 2, {}, 'st4+=0.8');
    },
    init: function init() {
      var _this = this;
      _this.tlEvent();

      // lottie
      storyLottieAni4.addEventListener('DOMLoaded', function () {
        storyLottieAni4.resize();
        $('.voice-mask .text-button.post-btn').on('click', function (e) {
          if ($('.section-voice.v3 .last-text').hasClass('active')) {
            STORY.scrollHide();
            _this.voiceLastContainer(1);
            $('.voice-mask .text-input, .voice-mask .text-button.post-btn').attr('tabindex', '-1');
            window.v3SetTime1 = setTimeout(function () {
              _this.voiceLastContainer(2);
              window.v3SetTime2 = setTimeout(function () {
                _this.voiceLastContainer(3);
                window.v3SetTime3 = setTimeout(function () {
                  $('.section-voice.v3 .share button').removeAttr('tabindex');
                  if (!document.documentElement.classList.contains('vestibulopathy')) STORY.scrollShow();
                  storyLottieAni4.goToAndStop(0, true);
                  window.v3SetTime3 = setTimeout(function () {
                    storyLottieAni4.play();
                  }, 100);
                  voiceActive = true;
                  STORY.topShow();
                }, 600);
              }, 2000);
            }, 2000);
          }
          var resetBtn = document.querySelector('.voice-mask .text-button.reset-btn');
          resetBtn.addEventListener('click', function (e) {
            sinarioMotion.voiceSinario2.V3Reset();
          });
        });
      });

      // input
      $('.voice-mask .text-input').on('keydown', function (e) {
        if (e.keyCode == 13) e.preventDefault();
      });
      $('.voice-mask .text-input').on('keyup', function (e) {
        if (e.keyCode == 13) {
          $('.voice-mask .text-button.post-btn').click();
          $('.voice-mask .text-input').blur();
        } else {
          var val = this.value + '',
            input = $('.text-input'),
            fake = $('.fake-input');
          fake.text(val);
          if (fake.height() > parseInt(fake.css('min-height')) * 3) {
            fake.text(input.data('text'));
            input.val(input.data('text'));
          } else {
            if (input.height() != fake.height()) input.css('height', fake.height());
            input.data('text', val);
            var numLine = Math.floor(Math.min(3, input.height() / parseInt(fake.css('min-height'))));
            if (numLine != parseInt($('.section-voice .lc1').data('line'))) {
              $('.section-voice .lc1').removeClass('line-1 line-2 line-3').addClass('line-' + numLine).data('line', numLine);
            }
          }
          if (val.length > 0 && val.replace(/^\s+|\s+$/g, '') != "") {
            !$('.section-voice.v3 .last-text').hasClass('active') && $('.section-voice.v3 .last-text').addClass('active');
            $('.section-voice.v3 .text-button.post-btn').removeAttr('aria-disabled');
            $('.section-voice.v3 .text-info').eq(0).attr('aria-hidden', 'true');
            $('.section-voice.v3 .text-info').eq(1).removeAttr('aria-hidden');
          } else {
            $('.section-voice.v3 .last-text').hasClass('active') && $('.section-voice.v3 .last-text').removeClass('active');
            $('.section-voice.v3 .text-button.post-btn').attr('aria-disabled', 'true');
            $('.section-voice.v3 .text-info').eq(0).removeAttr('aria-hidden');
            $('.section-voice.v3 .text-info').eq(1).attr('aria-hidden', 'true');
          }
        }
      });
      $('.voice-mask .text-input').on('blur', function (e) {
        var val = this.value + '';
        if (val.length > 0) {
          !$('.section-voice.v3 .last-text').hasClass('active') && $('.section-voice.v3 .last-text').addClass('active');
          $('.section-voice.v3 .text-button.post-btn').removeAttr('aria-disabled');
        } else {
          $('.section-voice.v3 .last-text').hasClass('active') && $('.section-voice.v3 .last-text').removeClass('active');
          $('.section-voice.v3 .text-button.post-btn').attr('aria-disabled', 'true');
        }
      });
      motionArray.push(this);
    },
    scroll: function scroll(percent) {
      var total = this.tl._tDur;
      var _this = this;
      if ($('.section-voice.v3').hasClass('show')) {
        _this.tl.seek(total * percent);
      }
      if (percent > 0) STORY.fakeHeaderHide();
      if (percent > 0.3) {
        if (!document.documentElement.classList.contains('ie')) document.querySelector('#dsmtHeader').setAttribute('data-color-type', 'bright');
      } else {
        document.querySelector('#dsmtHeader').removeAttribute('data-color-type');
      }
    },
    resize: function resize() {
      if (!window.STORYMOBILE) {
        this.tl.seek(0).kill();
        this.tlEvent();

        // lottie
        storyLottieAni4.resize();
        var input = $('.text-input'),
          fake = $('.fake-input');
        if (input.val() != '') {
          if (input.height != fake.height()) input.css('height', fake.height());
          var numLine = Math.min(3, input.height() / parseInt(fake.css('min-height')));
          if (numLine != parseInt($('.section-voice .lc1').data('line'))) {
            $('.section-voice .lc1').removeClass('line-1 line-2 line-3').addClass('line-' + numLine).data('line', numLine);
          }
        }
      }
    },
    voiceLastContainer: function voiceLastContainer(i) {
      $('.section-voice.v3 .last-container').removeClass('show').attr('aria-hidden', 'true');
      setTimeout(function () {
        $('.section-voice.v3 .last-container').eq(i).addClass('show').removeAttr('aria-hidden');
      }, 600);
    }
  }
};
sinarioMotion.lottieSecondSinario.init();
sinarioMotion.videoMaskSinario.init();
sinarioMotion.rectsSinario.init();
sinarioMotion.lighthouseSinario.init();
sinarioMotion.shootingStarSinario.init();
sinarioMotion.sphereSinario.init();
sinarioMotion.dotLineVideo.init();
sinarioMotion.fellowshipTextMotion.init();
sinarioMotion.fslideSinario.init();
sinarioMotion.fellowshipFilmMotion.init();
sinarioMotion.voiceSinario.init();
sinarioMotion.voiceSinario2.init();
sinarioMotion.voiceSinario3.init();