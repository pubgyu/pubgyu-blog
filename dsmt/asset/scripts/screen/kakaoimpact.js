$(function () {
  var kakaoImpactIntro = function () {
    var _timeLine = function _timeLine() {
      if (!$('html').hasClass('ie10')) {
        _visionTimeLine();
      }
      _missionTimeLine();
      _peopleTimeLine();
      setPartnersHeight();
      _partnersTimeLine();
    };
    var _visionTimeLine = function _visionTimeLine() {
      var visionFactor = function visionFactor() {
        var visionFactorTl = gsap.timeline();
        visionFactorTl.to('.vision-factor', {
          scrollTrigger: {
            trigger: '.vision-title',
            toggleClass: {
              targets: '.vision-factor',
              className: 'on'
            },
            once: true,
            start: function start() {
              return window.innerWidth >= 768 ? 'top center' : 'bottom 70%';
            }
          }
        });
      };
      ScrollTrigger.saveStyles('.vision-header .header-arrow, .vision-message.step2, .vision-message.step3');
      visionFactor();
      ScrollTrigger.matchMedia({
        // mobile
        '(max-width:767px)': function maxWidth767px() {
          $('.vision-message').each(function (i) {
            num = i + 1;
            gsap.to('.vision-message.step' + num, {
              scrollTrigger: {
                trigger: '.vision-message.step' + num,
                toggleClass: 'mobile-on',
                once: true,
                start: function start() {
                  return num == 1 ? 'top 90%' : 'top 70%';
                }
              }
            });
          });
          gsap.to('.vision-title', {
            scrollTrigger: {
              trigger: '.vision-title',
              toggleClass: 'on',
              once: true,
              start: 'top 70%'
            }
          });
        },
        // min tablet
        '(min-width:768px)': function minWidth768px() {
          var visionHeaderTl = gsap.timeline();
          visionHeaderTl.to('.vision-header', {
            scrollTrigger: {
              trigger: '.vision-header',
              endTrigger: '.vision-title',
              start: 'top 25%',
              end: 'top 25%',
              pin: true
            }
          }, 'header');
          var visionArrowControl = function () {
            var arrowOtion = {
              initPos: 0,
              initRotate: 0,
              show: 1,
              hide: 0,
              plusPos: '50%',
              minusPos: '-50%',
              rb: 45,
              ru: 315,
              lb: 225,
              lu: 315
            };
            var arrowStep1 = {
              pcOption: {
                arrowStep1End: 'top 0',
                arrowStep1Start: 'top 5%'
              },
              tabOption: {
                arrowStep1End: 'top 15%',
                arrowStep1Start: 'top 25%'
              }
            };
            var arrowStep2_2 = {
              pcOption: {
                arrowStep2_2End: 'top 28%',
                arrowStep2_2Start: 'top 44.1%'
              },
              tabOption: {
                arrowStep2_2End: 'top 24%',
                arrowStep2_2Start: 'top 34%'
              }
            };
            var arrowStep3 = {
              pcOption: {
                arrowStep3End: 'top 5%',
                arrowStep3Start: 'top 10.1%'
              },
              tabOption: {
                arrowStep3End: 'top 14%',
                arrowStep3Start: 'top 24%'
              }
            };
            var arrowStep4_2 = {
              pcOption: {
                arrowStep4_2End: 'top 38%',
                arrowStep4_2Start: 'top 48%'
              },
              tabOption: {
                arrowStep4_2End: 'top 24%',
                arrowStep4_2Start: 'top 34%'
              }
            };
            var arrowStep5 = {
              pcOption: {
                arrowStep5End: 'top 5%',
                arrowStep5Start: 'top 10.1%'
              },
              tabOption: {
                arrowStep5End: 'top 19%',
                arrowStep5Start: 'top 24%'
              }
            };

            // let visionArrowTl = gsap.timeline();
            // visionArrowTl
            // 	.set('.vision-header .header-arrow', {
            // 		x: arrowOtion.initPos,
            // 		y: arrowOtion.initPos,
            // 		rotation: arrowOtion.initRotate,
            // 		opacity: arrowOtion.show,
            // 	})
            // 	.fromTo(
            // 		'.vision-header .header-arrow',
            // 		{
            // 			x: arrowOtion.initPos,
            // 			y: arrowOtion.initPos,
            // 			rotation: arrowOtion.initRotate,
            // 			opacity: arrowOtion.show,
            // 		},
            // 		{
            // 			// arrowStep1
            // 			x: arrowOtion.initPos,
            // 			y: arrowOtion.initPos,
            // 			rotation: arrowOtion.initRotate,
            // 			opacity: arrowOtion.hide,
            // 			scrollTrigger: {
            // 				trigger: '.vision-timeline.timeline1',
            // 				end: () => (window.innerWidth > 1280 ? arrowStep1.pcOption.arrowStep1End : arrowStep1.tabOption.arrowStep1End),
            // 				start: () => (window.innerWidth > 1280 ? arrowStep1.pcOption.arrowStep1Start : arrowStep1.tabOption.arrowStep1Start),
            // 				scrub: 0.5,
            // 			},
            // 		},
            // 		'step1',
            // 	)
            // 	.fromTo(
            // 		'.vision-header .header-arrow',
            // 		{
            // 			// arrowStep2
            // 			x: arrowOtion.minusPos,
            // 			y: arrowOtion.minusPos,
            // 			rotation: arrowOtion.rb,
            // 			opacity: arrowOtion.hide,
            // 		},
            // 		{
            // 			// arrowStep2_2
            // 			x: arrowOtion.initPos,
            // 			y: arrowOtion.initPos,
            // 			rotation: arrowOtion.rb,
            // 			opacity: arrowOtion.show,
            // 			scrollTrigger: {
            // 				trigger: '.vision-timeline.timeline2',
            // 				end: () => (window.innerWidth > 1280 ? arrowStep2_2.pcOption.arrowStep2_2End : arrowStep2_2.tabOption.arrowStep2_2End),
            // 				start: () => (window.innerWidth > 1280 ? arrowStep2_2.pcOption.arrowStep2_2Start : arrowStep2_2.tabOption.arrowStep2_2Start),
            // 				scrub: 0.5,
            // 			},
            // 		},
            // 		'step2',
            // 	)
            // 	.fromTo(
            // 		'.vision-header .header-arrow',
            // 		{
            // 			// arrowStep3
            // 			x: arrowOtion.initPos,
            // 			y: arrowOtion.initPos,
            // 			rotation: arrowOtion.rb,
            // 			opacity: arrowOtion.show,
            // 		},
            // 		{
            // 			// arrowStep3
            // 			x: arrowOtion.initPos,
            // 			y: arrowOtion.initPos,
            // 			rotation: arrowOtion.rb,
            // 			opacity: arrowOtion.hide,
            // 			scrollTrigger: {
            // 				trigger: '.vision-timeline.timeline2',
            // 				end: () => (window.innerWidth > 1280 ? arrowStep3.pcOption.arrowStep3End : arrowStep3.tabOption.arrowStep3End),
            // 				start: () => (window.innerWidth > 1280 ? arrowStep3.pcOption.arrowStep3Start : arrowStep3.tabOption.arrowStep3Start),
            // 				scrub: 0.5,
            // 			},
            // 		},
            // 		'step3',
            // 	)
            // 	.fromTo(
            // 		'.vision-header .header-arrow',
            // 		{
            // 			// arrowStep4
            // 			x: arrowOtion.minusPos,
            // 			y: arrowOtion.plusPos,
            // 			rotation: arrowOtion.ru,
            // 			opacity: arrowOtion.hide,
            // 		},
            // 		{
            // 			// arrowStep4_2
            // 			x: arrowOtion.initPos,
            // 			y: arrowOtion.initPos,
            // 			rotation: arrowOtion.ru,
            // 			opacity: arrowOtion.show,
            // 			scrollTrigger: {
            // 				trigger: '.vision-timeline.timeline3',
            // 				end: () => (window.innerWidth > 1280 ? arrowStep4_2.pcOption.arrowStep4_2End : arrowStep4_2.tabOption.arrowStep4_2End),
            // 				start: () => (window.innerWidth > 1280 ? arrowStep4_2.pcOption.arrowStep4_2Start : arrowStep4_2.tabOption.arrowStep4_2Start),
            // 				scrub: 0.5,
            // 			},
            // 		},
            // 		'step4',
            // 	)
            // 	.fromTo(
            // 		'.vision-header .header-arrow',
            // 		{
            // 			// arrowStep5
            // 			x: arrowOtion.initPos,
            // 			y: arrowOtion.initPos,
            // 			rotation: arrowOtion.ru,
            // 			opacity: arrowOtion.show,
            // 		},
            // 		{
            // 			// arrowStep5
            // 			x: arrowOtion.initPos,
            // 			y: arrowOtion.initPos,
            // 			rotation: arrowOtion.ru,
            // 			opacity: arrowOtion.hide,
            // 			scrollTrigger: {
            // 				trigger: '.vision-timeline.timeline3',
            // 				end: () => (window.innerWidth > 1280 ? arrowStep5.pcOption.arrowStep5End : arrowStep5.tabOption.arrowStep5End),
            // 				start: () => (window.innerWidth > 1280 ? arrowStep5.pcOption.arrowStep5Start : arrowStep5.tabOption.arrowStep5Start),
            // 				scrub: 0.5,
            // 			},
            // 		},
            // 		'step5',
            // 	)
            // 	.set('.vision-header .header-arrow', {
            // 		x: arrowOtion.initPos,
            // 		y: arrowOtion.initPos,
            // 		rotation: arrowOtion.initRotate,
            // 		opacity: arrowOtion.show,
            // 	});
          }();
        },

        // only pc
        '(min-width:1281px)': function minWidth1281px() {
          var visionTextControl = function () {
            var messageStep2 = {
              startVal: 'top 12%',
              endVal: 'top 35%',
              posY: '40%'
            };
            var messageStep3 = {
              startVal: 'top 22%',
              endVal: 'top 45%',
              posY: '40%'
            };
            var visionTl = gsap.timeline();
            visionTl.fromTo('.vision-message.step2', {
              y: messageStep2.posY
            }, {
              y: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: '.vision-timeline.timeline1',
                endTrigger: '.vision-timeline.timeline2',
                start: messageStep2.startVal,
                end: messageStep2.endVal,
                scrub: 0.5
              }
            }).fromTo('.vision-message.step3', {
              y: messageStep3.posY
            }, {
              y: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: '.vision-timeline.timeline2',
                endTrigger: '.vision-timeline.timeline3',
                start: messageStep3.startVal,
                end: messageStep3.endVal,
                scrub: 0.5
              }
            });
          }();
        }
      });
    };
    var _missionTimeLine = function _missionTimeLine() {
      missionArrowTl = gsap.timeline();
      missionArrowTl.to('.mission-header .header-arrow', {
        className: 'header-arrow rb',
        scrollTrigger: {
          trigger: '.mission-header',
          start: 'top 70%'
        }
      });
    };
    var _peopleTimeLine = function _peopleTimeLine() {
      var peopleArrowTl = gsap.timeline();
      peopleArrowTl.to('.people-header .header-arrow', {
        className: 'header-arrow rb',
        scrollTrigger: {
          trigger: '.people-header',
          start: 'top 70%'
        }
      });
    };
    var _partnersTimeLine = function _partnersTimeLine() {
      var ptOptions = {
        pc: 'top 18%',
        mobile: 'top 68'
      };
      gsap.fromTo('.partners-header .header-arrow', {
        className: 'header-arrow'
      }, {
        className: 'header-arrow rb',
        scrollTrigger: {
          trigger: '.partners-timeline.timeline1',
          start: function start() {
            return window.innerWidth >= 768 ? ptOptions.pc : ptOptions.mobile;
          }
        }
      });
      gsap.to('.kakaoimpact-partners .sticky-wrap', {
        scrollTrigger: {
          trigger: '.kakaoimpact-partners .sticky-wrap',
          pin: true,
          scrub: 0.5,
          start: function start() {
            return window.innerWidth >= 768 ? ptOptions.pc : ptOptions.mobile;
          },
          end: '+=450%'
        }
      });
      var partnerStep1 = gsap.timeline();
      function step1Active() {
        document.querySelector('.partners-wrap.step1').classList.add('active');
      }
      function step1NoActive() {
        document.querySelector('.partners-wrap.step1').classList.remove('active');
      }
      ScrollTrigger.create({
        animation: partnerStep1,
        trigger: '.partners-timeline.timeline1',
        scrub: 0.5,
        start: function start() {
          return window.innerWidth >= 768 ? 'top 30%' : ptOptions.mobile;
        },
        end: '+=120%',
        onEnter: function onEnter() {
          step1Active();
        },
        onEnterBack: function onEnterBack() {
          step1Active();
        },
        onLeave: function onLeave() {
          step1NoActive();
        },
        onLeaveBack: function onLeaveBack() {
          step1NoActive();
        }
      });
      partnerStep1.fromTo('.partners-wrap.step1 span, .partners-wrap.step1 .partners-list', {
        opacity: 0,
        y: 100
      }, {
        opacity: 1,
        y: 0
      }, 'p_step1-show').to('.partners-wrap.step1 span, .partners-wrap.step1 .partners-list', {}, 'p_step1-visible').to('.partners-wrap.step1 span, .partners-wrap.step1 .partners-list', {
        opacity: 0,
        y: -100
      }, 'p_step1-hide');
      var partnerStep2 = gsap.timeline();
      function step2Active() {
        document.querySelector('.partners-wrap.step2').classList.add('active');
      }
      function step2NoActive() {
        document.querySelector('.partners-wrap.step2').classList.remove('active');
      }
      ScrollTrigger.create({
        animation: partnerStep2,
        trigger: '.partners-timeline.timeline2',
        scrub: 0.5,
        start: function start() {
          return window.innerWidth >= 768 ? 'top 50%' : ptOptions.mobile;
        },
        end: '+=120%',
        onEnter: function onEnter() {
          step2Active();
        },
        onEnterBack: function onEnterBack() {
          step2Active();
        },
        onLeave: function onLeave() {
          step2NoActive();
        },
        onLeaveBack: function onLeaveBack() {
          step2NoActive();
        }
      });
      partnerStep2.fromTo('.partners-wrap.step2 span, .partners-wrap.step2 .partners-list', {
        opacity: 0,
        y: 100
      }, {
        opacity: 1,
        y: 0
      }, 'p_step2-show').to('.partners-wrap.step2 span, .partners-wrap.step2 .partners-list', {}, 'p_step2-visible').to('.partners-wrap.step2 span, .partners-wrap.step2 .partners-list', {
        opacity: 0,
        y: -100
      }, 'p_step2-hide');
      var partnerStep3 = gsap.timeline();
      function step3Active() {
        document.querySelector('.partners-wrap.step3').classList.add('active');
      }
      function step3NoActive() {
        document.querySelector('.partners-wrap.step3').classList.remove('active');
      }
      ScrollTrigger.create({
        animation: partnerStep3,
        trigger: '.partners-timeline.timeline3',
        scrub: 0.5,
        start: function start() {
          return window.innerWidth >= 768 ? 'top 50%' : ptOptions.mobile;
        },
        end: '+=100%',
        onEnter: function onEnter() {
          step3Active();
        },
        onEnterBack: function onEnterBack() {
          step3Active();
        },
        onLeaveBack: function onLeaveBack() {
          step3NoActive();
        }
      });
      partnerStep3.fromTo('.partners-wrap.step3 span, .partners-wrap.step3 .partners-list', {
        opacity: 0,
        y: 100
      }, {
        opacity: 1,
        y: 0
      }, 'p_step3-show');
    };
    return {
      timeLine: _timeLine,
      visionTimeLine: _visionTimeLine,
      missionTimeLine: _missionTimeLine,
      peopleTimeLine: _peopleTimeLine,
      partnersTimeLine: _partnersTimeLine
    };
  }();
  function setPartnersHeight() {
    if (window.innerWidth < 768) {
      var ptH = $('.partners-header').outerHeight() + $('.partners-wrap.step3').outerHeight() + 20;
      $('.kakaoimpact-partners .sticky-inner').css('height', ptH);
    } else {
      $('.kakaoimpact-partners .sticky-inner').removeAttr('style');
    }
  }
  var resizeTimeOut = setTimeout(function () {
    clearTimeout(resizeTimeOut);
    setPartnersHeight();
  }, 200);
  $(window).resize(setPartnersHeight);
  kakaoImpactIntro.timeLine();
});