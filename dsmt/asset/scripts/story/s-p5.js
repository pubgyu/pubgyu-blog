if (!STORYIE10) {
  // voice
  var p5VoiceWave = function p5VoiceWave(p) {
    var prop = {
      maxSize: STORY.wH > STORY.wW ? STORY.wH * 2 : STORY.wW * 2,
      minSize: STORY.wW < 767 ? 22 : 48,
      center: {
        x: STORY.wW / 2,
        y: STORY.wH / 2
      },
      strokeWidth: STORY.wW < 767 ? 1 : 2
    };
    p.setup = function () {
      p.createCanvas(STORY.wW, STORY.wH);
      p.noFill();
    };
    p.draw = function () {
      if (document.querySelector('.section-voice').classList.contains('show')) {
        p.clear();
        for (var i = 0; i < sinarioMotion.voiceSinario.wave.length; i++) drawCircle(sinarioMotion.voiceSinario.wave[i].scroll, sinarioMotion.voiceSinario.wave[i].stroke);
      }
    };
    p.windowResized = function () {
      setTimeout(function () {
        prop.maxSize = STORY.wH > STORY.wW ? STORY.wH * 2 : STORY.wW * 2;
        prop.minSize = STORY.wW < 767 ? 22 : 48;
        prop.center = {
          x: STORY.wW / 2,
          y: STORY.wH / 2
        };
        prop.strokeWidth = STORY.wW < 767 ? 1 : 2;
        p.resizeCanvas(STORY.wW, STORY.wH);
      }, 100);
    };
    function easeOutExpo(x) {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }
    function drawCircle(percent, stroke) {
      var size = prop.minSize + prop.maxSize * percent / 2;
      // const strokeThin = 20 * Math.sin(Math.PI * Math.min(1, percent * 3));
      // const strokeThick = 1 * easeOutExpo(percent);
      p.push();
      p.stroke(stroke);
      p.strokeWeight(prop.strokeWidth);
      STORY.polygon(p, prop.center.x, prop.center.y, size / 2 - prop.strokeWidth / 2, 100);
      // STORY.polygon(p, prop.center.x, prop.center.y, size / 2 - strokeThick / 2, 100);
      // p.stroke(thin);
      // p.strokeWeight(strokeThin);
      // STORY.polygon(p, prop.center.x, prop.center.y, size / 2 - strokeThin / 2, 100);
      p.pop();
    }
  };
  var canvasRectMotion = document.querySelector('#canvas-rect-motion .content-wrap');
  var canvasLighthouseMotion = document.querySelector('#canvas-lighthouse-motion .content-wrap');
  var canvasDotMotion = document.querySelector('#canvas-dot-motion .content-wrap');
  var canvasSphereMotion = document.querySelector('#canvas-sphere-motion .content-wrap');
  var canvasDottedMotion = document.querySelector('#canvas-dotted-motion .content-wrap');
  var fr = !STORYMOBILE ? 50 : 50;
  window.addEventListener('load', function () {
    sinarioMotion.fellowshipTextMotion.resize();
  });
  window.addEventListener('resize', function () {
    sinarioMotion.fellowshipTextMotion.resize();
  });

  // p5
  var p5RectsMotion = function p5RectsMotion(p) {
    var rs = sinarioMotion.rectsSinario,
      _rect = rs.rect,
      _rects = rs.rects,
      _circle = rs.circle,
      _rectColor = rs.rectColor,
      _colum = rs.colum,
      _row = rs.row,
      _rectsSize = rs.rectsSize,
      _margin = rs.margin;
    var tlX, tlY, circleX, circleY;
    var autoFill = {
      fill1: 'rgba(68,68,68,1)',
      fill2: 'rgba(51,51,51,1)',
      fill3: 'rgba(43,43,43,1)',
      fill4: 'rgba(51,51,51,1)'
    };
    p.setup = function () {
      p.createCanvas(STORY.wW, STORY.wH);
      p.noStroke();
      rectResize();
      p.frameRate(fr);
    };
    p.draw = function () {
      if (canvasRectMotion.closest('.sticky-wrap').classList.contains('show')) {
        p.clear();
        for (var i = 0; i < _colum; i++) {
          for (var j = 0; j < _row; j++) {
            if (i != 3 || j != 0) rect(p, i, j);
          }
        }
        p.push();
        p.fill('#202020');
        p.ellipse(circleX, circleY + _circle.y, _circle.size, _circle.size);
        p.pop();

        // move rect
        if (STORY.wW > 767) {
          rect(p, 3, 0);
        } else {
          rect(p, 1, 0);
        }
      }
    };
    function rectResize() {
      _rect = rs.rect;
      _rects = rs.rects;
      _circle = rs.circle;
      _colum = rs.colum;
      _row = rs.row;
      _rectsSize = rs.rectsSize;
      _margin = rs.margin;
      tlX = STORY.wW / 2 - _margin * _colum / 2 + (_margin - _rectsSize) / 2;
      tlY = STORY.wH / 2 - _margin * _row / 2 + (_margin - _rectsSize) / 2;
      circleX = STORY.wW / 2;
      circleY = STORY.wH / 2;
    }
    function rect(p, i, j) {
      p.push();
      var st;
      if (STORY.wW > 767) {
        st = 3;
      } else {
        st = 1;
      }
      if (i == st && j == 0) {
        // move rect
        p.fill(_rect.fill);
        p.translate(tlX, tlY);
        p.rect(_margin * i + _rect.x, _margin * j + _rect.y, _rect.size, _rect.size, _rect.r);
      } else {
        if (j == 0) p.fill(autoFill.fill1);
        if (j == 1) p.fill(autoFill.fill2);
        if (j == 2) p.fill(autoFill.fill3);
        if (j == 3) p.fill(autoFill.fill4);
        if (i != st || j != 1 && j != 2 && j != 3) p.translate(tlX, tlY + _rects.y);
        if (i == st && j == 1) p.translate(tlX + _rect.etcRectX1, tlY + _rects.y);
        if (i == st && j == 2) p.translate(tlX + _rect.etcRectX2, tlY + _rects.y);
        if (i == st && j == 3) p.translate(tlX + _rect.etcRectX3, tlY + _rects.y);
        p.rect(_margin * i, _margin * j, _rectsSize, _rectsSize);
      }
      p.pop();
    }
    p.windowResized = function () {
      setTimeout(function () {
        rectResize();
        p.resizeCanvas(STORY.wW, STORY.wH);
      }, 100);
    };
  };
  var p5LighthouseMotion = function p5LighthouseMotion(p) {
    var ls = sinarioMotion.lighthouseSinario,
      _circle = ls.circle,
      _smallCircle = ls.smallCircle,
      _cone = ls.cone;
    p.setup = function () {
      p.createCanvas(STORY.wW, STORY.wH, p.WEBGL);
      p.noStroke();
      p.frameRate(fr);
    };
    p.draw = function () {
      if (canvasLighthouseMotion.closest('.sticky-wrap').classList.contains('show')) {
        p.clear();
        p.rotate(_cone.rotate);
        p.push();
        p.fill('#202020');
        STORY.polygon(p, 0, 0, _circle.size / 2, 100);
        p.pop();
        p.push();
        p.fill('#fff');
        p.ellipse(0, 0, _smallCircle.size, _smallCircle.size);
        p.pop();
        p.push();
        p.stroke(_circle.circleStroke);
        p.noFill();
        STORY.polygon(p, 0, 0, (_circle.circleSize1 - _circle.circleSizeMargin1) / 2, 100);
        p.pop();
        p.push();
        p.stroke(_circle.circleStroke2);
        p.noFill();
        STORY.polygon(p, 0, -(_circle.circleSize2 / 2), (_circle.circleSize2 - _circle.circleSizeMargin2) / 2, 100);
        p.pop();
        p.push();
        p.translate(0, -500 - _smallCircle.size / 2);
        p.fill('#F4F4F4');
        p.cone(_cone.size, 1000, 100, 100);
        p.pop();
      }
    };
    p.windowResized = function () {
      setTimeout(function () {
        p.resizeCanvas(STORY.wW, STORY.wH);
      }, 100);
    };
  };
  var p5DotMotion = function p5DotMotion(p) {
    var stss = sinarioMotion.shootingStarSinario,
      _circle = stss.circle,
      _smallCircle = stss.smallCircle,
      _colum = stss.colum,
      _row = stss.row;
    var sc = p.color('rgba(255,255,255,.3)'),
      ec = p.color('rgba(255,255,255,0)');
    var bigWaves = [stss.wave1, stss.wave2, stss.wave3, stss.wave4, stss.wave5];
    var gradientDivision = 3;
    var autoFill = {
      fill: '#fff'
    };
    var autoFill2 = {
      fill: '#aaa'
    };
    var autoFill3 = {
      fill: '#aaa'
    };
    var autoFill4 = {
      fill: '#aaa'
    };
    var autoFill5 = {
      fill: '#aaa'
    };
    var tl = gsap.to(autoFill, 2, {
      fill: '#666',
      repeat: -1,
      yoyo: true
    });
    var tl2 = gsap.to(autoFill2, 1, {
      fill: '#333',
      repeat: -1,
      yoyo: true
    });
    var tl3 = gsap.to(autoFill3, 1.5, {
      fill: '#333',
      repeat: -1,
      yoyo: true
    });
    var tl4 = gsap.to(autoFill4, 1, {
      fill: '#333',
      repeat: -1,
      yoyo: true
    });
    var tl5 = gsap.to(autoFill5, 2, {
      fill: '#333',
      repeat: -1,
      yoyo: true
    });
    p.setup = function () {
      p.createCanvas(STORY.wW, STORY.wH);
      p.noStroke();
      p.frameRate(fr);
    };
    p.draw = function () {
      if (canvasDotMotion.closest('.sticky-wrap').classList.contains('show')) {
        p.clear();
        p.translate(STORY.wW / 2, STORY.wH / 2);

        // tail
        if (STORY.wW >= 1920) {
          setGradient(p, _colum * 2 - 2, stss.circlaTail1.tailP, 2, stss.circlaTail1.tailSize, sc, ec, 2, true);
          setGradient(p, -2, stss.circlaTail5.tailP, 2, stss.circlaTail5.tailSize, sc, ec, 2, false);
        } else {
          setGradient(p, _colum * 2 - 1, stss.circlaTail1.tailP, 2, stss.circlaTail1.tailSize, sc, ec, 2, true);
          setGradient(p, -1, stss.circlaTail5.tailP, 2, stss.circlaTail5.tailSize, sc, ec, 2, false);
        }
        setGradient(p, stss.circlaTail2.tailP, _row * 2, stss.circlaTail2.tailSize, 2, sc, ec, 1, true);
        setGradient(p, stss.circlaTail3.tailP, _row, stss.circlaTail3.tailSize, 2, sc, ec, 1, true);
        setGradient(p, stss.circlaTail6.tailP, 0, stss.circlaTail6.tailSize, 2, sc, ec, 1, false);
        var smallFill2 = stss.wave1.size < 15 ? autoFill2.fill : _smallCircle.fill;
        var smallFill3 = stss.wave1.size < 15 ? autoFill3.fill : _smallCircle.fill;
        var smallFill4 = stss.wave1.size < 15 ? autoFill4.fill : _smallCircle.fill;
        var smallFill5 = stss.wave1.size < 15 ? autoFill5.fill : _smallCircle.fill;
        var _loop = function _loop(i) {
          var _loop2 = function _loop2(j) {
            p.push();
            p.translate(-_colum * 4, -_row * 4);
            p.push();
            p.fill(smallFill5);
            p.ellipse(_colum * i, _row * j, _smallCircle.size4, _smallCircle.size4);
            p.pop();
            _smallCircle.scp1.map(function (a) {
              if (a[0] == j && a[1] == i) {
                p.push();
                p.fill(smallFill2);
                p.ellipse(_colum * i, _row * j, _smallCircle.size1, _smallCircle.size1);
                p.pop();
              }
            });
            _smallCircle.scp2.map(function (a) {
              if (a[0] == j && a[1] == i) {
                p.push();
                p.fill(smallFill3);
                p.ellipse(_colum * i, _row * j, _smallCircle.size2, _smallCircle.size2);
                p.pop();
              }
            });
            _smallCircle.scp3.map(function (a) {
              if (a[0] == j && a[1] == i) {
                p.push();
                p.fill(smallFill4);
                p.ellipse(_colum * i, _row * j, _smallCircle.size3, _smallCircle.size3);
                p.pop();
              }
            });
            p.pop();
          };
          for (var j = 0; j < 9; j++) {
            _loop2(j);
          }
        };
        for (var i = 0; i < 9; i++) {
          _loop(i);
        }
        smallWaveDraw(p, _colum * 2, -_row, _colum * 2, -_row, stss.circlaTail1);
        smallWaveDraw(p, -(_colum * 2), _row * 2, -(_colum * 2), _row * 2, stss.circlaTail2);
        smallWaveDraw(p, 0, _row, 0, _row, stss.circlaTail3);
        // smallWaveDraw(p, _colum, _row * 2, _colum, _row * 2, stss.circlaTail4);
        smallWaveDraw(p, 0, -_row, 0, -_row, stss.circlaTail5);
        smallWaveDraw(p, -_colum, 0, -_colum, 0, stss.circlaTail6);

        // big wave
        for (var _i = 0; _i < bigWaves.length; _i++) bigWaveDraw(p, bigWaves[_i]);
        p.push();
        p.fill(autoFill.fill);
        p.ellipse(0, 0, _circle.size, _circle.size);
        p.pop();
      }
    };
    p.windowResized = function () {
      setTimeout(function () {
        _circle = stss.circle;
        _smallCircle = stss.smallCircle;
        _colum = stss.colum;
        _row = stss.row;
        p.resizeCanvas(STORY.wW, STORY.wH);
      }, 100);
    };
    function setGradient(p, x, y, w, h, c1, c2, axis, reverse) {
      // gradient
      p.push();
      p.noFill();
      // r -> l
      if (axis == 1) {
        for (var i = x; i <= x + w; i += gradientDivision) {
          var inter = p.map(i, x, x + w, 0, 1);
          var c = p.lerpColor(c1, c2, inter);
          if (i > x) {
            p.fill(c);
          } else {
            p.fill('#181818');
          }
          if (reverse) {
            p.rect(i, y, gradientDivision, h);
          } else {
            p.rect(x + (x - i), y, gradientDivision, h);
          }
        }
      }
      // b -> t
      if (axis == 2) {
        for (var _i2 = y; _i2 <= y + h; _i2 += gradientDivision) {
          var _inter = p.map(_i2, y, y + h, 0, 1);
          var _c = p.lerpColor(c1, c2, _inter);
          if (_i2 > y) {
            p.fill(_c);
          } else {
            p.fill('#181818');
          }
          if (reverse) {
            p.rect(x, _i2, w, gradientDivision);
          } else {
            p.rect(x, y + (y - _i2), w, gradientDivision);
          }
        }
      }
      p.pop();
    }
    // small wave
    function smallWaveDraw(p, x1, y1, x2, y2, el) {
      // 파동 circle
      p.push();
      p.translate(x1, y1);
      p.noFill();
      p.push();
      p.stroke(el.OCColor2);
      STORY.polygon(p, 0, 0, el.OCSize2 / 2, 100);
      p.pop();
      p.push();
      p.stroke(el.OCColor1);
      STORY.polygon(p, 0, 0, el.OCSize1 / 2, 100);
      p.pop();
      p.pop();
    }
    // big wave
    function bigWaveDraw(p, el) {
      p.push();
      p.noFill();
      p.stroke(el.fill);
      STORY.polygon(p, 0, 0, el.size / 2, 100);
      p.pop();
    }
  };
  var p5SphereMotion = function p5SphereMotion(p) {
    var sps = sinarioMotion.sphereSinario,
      _camera = sps.camera,
      _colum = sps.colum,
      _row = sps.row;
    var cam;
    var autoRotateX = 0;
    var autoRotateY = 0;
    var trackSpheres = [sps.sphere1, sps.sphere2, sps.sphere3, sps.sphere4, sps.sphere5, sps.sphere6, sps.sphere7, sps.sphere8, sps.sphere9, sps.sphere10, sps.sphere11, sps.sphere12];
    var waves = [sps.wave1, sps.wave2, sps.wave3, sps.wave4];
    p.setup = function () {
      p.createCanvas(STORY.wW, STORY.wH, p.WEBGL);
      p.noStroke();
      p.frameRate(fr);
    };
    p.draw = function () {
      if (canvasSphereMotion.closest('.sticky-wrap').classList.contains('show') && !canvasDottedMotion.closest('.sticky-wrap').classList.contains('show')) {
        p.clear();
        p.background(sps.bgFill.fill);

        // small ball ground
        p.push();
        p.translate(0, _camera.PY, _camera.PZ + _camera.bottomPY);
        for (var i = 0; i < 13; i++) {
          for (var j = 0; j < 13; j++) {
            p.push();
            p.translate(-_colum * 6, -_row * 5);
            p.fill(sps.smallBall.fill);
            p.ellipse(_colum * i, _row * j, sps.smallBall.size, sps.smallBall.size);
            p.pop();
          }
        }
        p.pop();

        // rotate
        if (!document.documentElement.classList.contains('vestibulopathy')) {
          if (_camera.rotateX >= 0.2) {
            autoRotateX = autoRotateX >= 6.28 ? 0 : autoRotateX += 0.0005;
          } else {
            autoRotateX = Math.max(0, autoRotateX -= 0.1);
          }
          if (sps.sphere1.rotate <= -0.2 && sps.sphere1.rotate >= -0.58) {
            autoRotateY = autoRotateY <= -6.28 ? 0 : autoRotateY -= 0.0005;
          } else {
            autoRotateY = Math.min(0, autoRotateY += 0.1);
          }
        }
        p.rotate(_camera.rotateX + autoRotateX);
        p.rotateY(_camera.rotateY + autoRotateY);

        // center ball
        centerSphere(p);

        // trackSphere
        for (var _i3 = 0; _i3 < trackSpheres.length; _i3++) {
          trackSphere(p, trackSpheres[_i3], trackSpheres[_i3].size, trackSpheres[_i3].radius, trackSpheres[_i3].angle, trackSpheres[_i3].rotate);
        }

        // track
        for (var _i4 = 0; _i4 < 5; _i4++) {
          p.push();
          p.translate(0, 0, _camera.PZ - _camera.minusPZ);
          p.push();
          p.noFill();
          p.stroke(sps.track.fill);
          p.strokeWeight(2);
          p.translate(0, 0, sps.centerSphere.z + _camera.sphereUpZ);
          STORY.polygon(p, 0, 0, sps.track.size * _i4 / 2, 100);
          p.pop();
          p.pop();
        }

        // wave
        for (var _i5 = 0; _i5 < waves.length; _i5++) waveDraw(p, waves[_i5]);
        p.camera(_camera.x, _camera.y, _camera.z);

        // dimmed
        p.push();
        p.fill(sps.dimmed.fill);
        if (STORY.wW > 767) {
          p.rect(-(STORY.wW * 2), -(STORY.wH * 2), STORY.wW * 4, STORY.wH * 4);
        } else {
          p.rect(-(STORY.wW * 3), -(STORY.wH * 3), STORY.wW * 6, STORY.wH * 6);
        }
        p.pop();
      }
    };
    p.windowResized = function () {
      setTimeout(function () {
        _camera = sps.camera;
        _colum = sps.colum;
        _row = sps.row;
        p.resizeCanvas(STORY.wW, STORY.wH);
      }, 100);
    };
    function centerSphere(p) {
      p.push();
      p.translate(0, _camera.PY - _camera.minusPY, _camera.PZ - _camera.minusPZ);
      p.push();
      p.fill(sps.centerSphere.fill);
      p.translate(sps.centerSphere.x, 0, sps.centerSphere.z + _camera.sphereUpZ);
      p.sphere(sps.centerSphere.size, 50);
      p.pop();
      p.pop();
      sphereStick(p, sps.centerSphere, 0, _camera.PY - _camera.minusPY, _camera.PZ - _camera.minusPZ, sps.centerSphere.x, 0, sps.centerSphere.z + _camera.sphereUpZ, sps.centerSphere.size);
    }
    function trackSphere(p, el, size, radius, pt, rotate) {
      var lon = p.map(2, 0, 5, -p.PI, p.PI);
      var lat = p.map(pt, 0, 6, -p.HALF_PI, p.HALF_PI);
      var x = radius * p.sin(lon) * p.cos(lat);
      var y = radius * p.sin(lon) * p.sin(lat);
      var row = el == sps.sphere4 || el == sps.sphere12 ? 1 : 6;
      for (var i = 0; i < row; i++) {
        p.push();
        p.rotateY(rotate * i);
        p.translate(0, 0, _camera.PZ - _camera.minusPZ);
        p.push();
        p.fill(el.fill);
        p.translate(x, y, el.z + _camera.sphereUpZ);
        p.sphere(size, 50);
        p.pop();
        p.pop();
      }
      if (el.stick) {
        sphereStick(p, el, 0, 0, _camera.PZ - _camera.minusPZ, x, y, el.z + _camera.sphereUpZ, size);
      }
    }
    function sphereStick(p, el, x1, y1, z1, x2, y2, z2, size) {
      // 막대
      p.push();
      p.translate(x1, y1, z1);
      p.push();
      p.translate(x2, y2, z2);
      p.rotateX(-p.PI / 2);
      for (var i = 0; i <= el.stick; i += 5) {
        var inter = p.map(i, 0, 300, 0, 1);
        var c = p.lerpColor(p.color(STORY.FFF1), p.color(STORY.FFF0), inter);
        p.fill(c);
        p.rect(0, i, 2, 5);
      }
      p.pop();
      p.pop();

      // circle
      p.push();
      p.translate(x1, y1, z1);
      p.push();
      p.translate(x2, y2, z2);
      p.rotateX(-p.PI / 2);
      p.push();
      p.noFill();
      p.stroke(el.OSF);
      STORY.polygon(p, 0, 0, el.OS, 100);
      p.pop();
      p.push();
      p.fill(el.ISF);
      STORY.polygon(p, 0, 0, el.IS, 100);
      p.pop();
      p.pop();
      p.pop();
    }
    // wave
    function waveDraw(p, el) {
      p.push();
      p.push();
      p.noFill();
      p.stroke(el.fill);
      p.strokeWeight(3);
      STORY.polygon(p, 0, 0, el.size / 2, 100);
      p.pop();
      p.pop();
    }
  };
  var p5DottedMotion = function p5DottedMotion(p) {
    var _videoCon = canvasDottedMotion.querySelector('.d-video-content');
    var _video = _videoCon.querySelector('.d-video');
    var _playBtn = _videoCon.querySelector('.button-video-play');
    var _lineRL = canvasDottedMotion.querySelectorAll('.dotted-line.rl');
    var _lineT = canvasDottedMotion.querySelector('.dotted-line.t');
    var _lineB = canvasDottedMotion.querySelector('.dotted-line.b');
    var _lineL = canvasDottedMotion.querySelector('.dotted-line.l');
    var _lineR = canvasDottedMotion.querySelector('.dotted-line.r');
    var VCRect, contentWrap;
    var vMask = {};
    var _dLV = sinarioMotion.dotLineVideo;
    var sb, lb;
    p.setup = function () {
      p.createCanvas(STORY.wW, STORY.wH);
      p.noStroke();
      p.frameRate(fr);
    };
    p.draw = function () {
      if (canvasDottedMotion.closest('.sticky-wrap').classList.contains('show')) {
        p.clear();
        dottedResize();
        _videoCon.style.opacity = _dLV.video.o;
        _playBtn.style.opacity = _dLV.video.btnO;
        _videoCon.style.transform = "translate(-50%,-50%) scale(".concat(_dLV.video.scale, ")");
        if (STORY.wW > 767) {
          _videoCon.style.height = STORY.wH + 'px';
        } else {
          _videoCon.style.height = _dLV.video.vH + 'px';
        }
      }
    };
    p.windowResized = function () {
      setTimeout(function () {
        p.resizeCanvas(STORY.wW, STORY.wH);
      }, 100);
    };
    function dottedResize() {
      VCRect = _videoCon.getBoundingClientRect();
      contentWrap = _videoCon.closest('.content-wrap').getBoundingClientRect();
      vMask.top = VCRect.top;
      vMask.left = VCRect.left - contentWrap.left;
      vMask.right = VCRect.right - contentWrap.left;
      vMask.bottom = VCRect.bottom;
      if (STORY.wW > 767) {
        lb = 11;
        sb = 9;
      } else {
        lb = 7;
        sb = 4;
      }
      _lineT.style.transform = "translateY(".concat(vMask.top - 11, "px)");
      _lineT.style.width = STORY.wW;
      _lineT.setAttribute('viewBox', "0 0 ".concat(STORY.wW, " 22"));
      _lineT.querySelector('line').setAttribute('x2', _dLV.line.widthS);
      _lineT.querySelector('circle').setAttribute('r', lb);
      _lineT.querySelector('circle').setAttribute('cx', -5 + _dLV.line.widthS);
      _lineB.style.transform = "translateY(".concat(vMask.bottom - 11, "px)");
      _lineB.style.width = STORY.wW;
      _lineB.setAttribute('viewBox', "0 0 ".concat(STORY.wW, " 22"));
      _lineB.querySelector('line').setAttribute('x1', STORY.wW - _dLV.line.widthS);
      _lineB.querySelector('line').setAttribute('x2', STORY.wW);
      _lineB.querySelector('circle').setAttribute('r', lb);
      _lineB.querySelector('circle').setAttribute('cx', 5 + (STORY.wW - _dLV.line.widthS));
      _lineL.style.transform = "translateX(".concat(vMask.left - 11, "px)");
      _lineL.style.height = STORY.wH;
      _lineL.setAttribute('viewBox', "0 0 22 ".concat(STORY.wH));
      _lineL.querySelector('line').setAttribute('y2', _dLV.line.heightS);
      _lineL.querySelector('circle').setAttribute('r', sb);
      _lineL.querySelector('circle').setAttribute('cy', -5 + _dLV.line.heightS);
      _lineR.style.transform = "translateX(".concat(vMask.right - 11, "px)");
      _lineR.style.height = STORY.wH;
      _lineR.setAttribute('viewBox', "0 0 22 ".concat(STORY.wH));
      _lineR.querySelector('line').setAttribute('y1', STORY.wH - _dLV.line.heightS);
      _lineR.querySelector('line').setAttribute('y2', STORY.wH);
      _lineR.querySelector('circle').setAttribute('r', sb);
      _lineR.querySelector('circle').setAttribute('cy', 5 + (STORY.wH - _dLV.line.heightS));
      canvasDottedMotion.querySelectorAll('.dotted-line').forEach(function (_this) {
        _this.style.opacity = _dLV.line.o;
      });
    }
    function dottedBall(x2, y2, type, reverse) {
      var w = 4,
        h = 1,
        margin = 40;
      if (STORY.wW > 767) {
        sb = 18;
        lb = 22;
      } else {
        sb = 8;
        lb = 14;
      }
      p.push();
      if (type == 'type1') {
        p.fill('#6b6b6b');
        if (reverse) {
          p.ellipse(x2, y2, sb, sb);
        } else {
          p.ellipse(x2, y2, sb, sb);
        }
      } else {
        p.fill('#2b2b2b');
        p.ellipse(x2, y2, lb, lb);
      }
      p.pop();
    }
  };
  var _moveX = 0,
    _moveY = 0;
  var getMousePos = function getMousePos(evt) {
    var pos = evt.currentTarget.getBoundingClientRect();
    return {
      x: evt.clientX - pos.left,
      y: evt.clientY - pos.top
    };
  };
  if (!STORYMOBILE) {
    document.querySelector('#story-wrap').addEventListener('mousemove', function (evt) {
      var mPos = getMousePos(evt);
      var mouseSensitivity = STORY.wW >= 1920 ? 0.75 : 1;
      _moveX = mPos.x * mouseSensitivity;
      _moveY = mPos.y * mouseSensitivity;
    });
  } else {
    window.addEventListener('deviceorientation', function (event) {
      _moveX = Math.floor(event.gamma) * 5;
      _moveY = Math.floor(event.beta) * 5;
    });
  }

  // intro lottie
  var introLottie = function introLottie(node, ani, s) {
    var motion = function motion(p) {
      var motionSvg = node.querySelector('svg').getBoundingClientRect();
      var motionG = node.querySelectorAll('svg > g > g');
      var gMinIdx,
        gMaxIdx,
        sensitive = 15;
      var totalFrame = ani.totalFrames - 1;
      var autoMove = {
        y: 0
      };
      var tl = !STORYMOBILE ? gsap.to(autoMove, 5, {
        y: 300,
        repeat: -1,
        yoyo: true
      }) : null;
      var increaseF = 0;
      p.setup = function () {
        p.createCanvas(STORY.wW, STORY.wH);
        gMinIdx = node.closest('.sticky-con').getAttribute('id') == 'story-lottie1' ? 19 : 0;
        gMaxIdx = node.closest('.sticky-con').getAttribute('id') == 'story-lottie1' ? 26 : 7;
        p.frameRate(fr);
        mouseMove(p);
      };
      p.draw = function () {
        if (node.closest('.sticky-wrap').classList.contains('show')) mouseMove(p);
      };
      function mouseMove(p) {
        if (increaseF <= 46) increaseF++;
        var frame = node.closest('.sticky-con').getAttribute('id') == 'story-lottie1' ? increaseF : Math.max(0, 46 - s.canvas.frame);
        motionG.forEach(function (_this, idx) {
          if (idx >= gMinIdx && idx <= gMaxIdx) {
            var cIdx = gMaxIdx - idx;
            var mX = (_moveX - STORY.wW / 2) * (cIdx / sensitive) * (frame / 100);
            var mY = (_moveY + autoMove.y - STORY.wH / 2) * (cIdx / sensitive) * (frame / 100);
            if (!document.documentElement.classList.contains('vestibulopathy')) {
              $(_this).find('g').attr('style', "transform: translate(".concat(mX, "px, ").concat(mY, "px); "));
            } else {
              $(_this).find('g').attr('style', "transform: translate(".concat(0, "px, ", 0, "px); "));
            }
          }
        });
      }
      p.windowResized = function () {
        setTimeout(function () {
          p.resizeCanvas(STORY.wW, STORY.wH);
        }, 100);
      };
    };
    return new p5(motion, node);
  };
  new p5(p5RectsMotion, canvasRectMotion);
  new p5(p5LighthouseMotion, canvasLighthouseMotion);
  new p5(p5DotMotion, canvasDotMotion);
  new p5(p5SphereMotion, canvasSphereMotion);
  new p5(p5DottedMotion, canvasDottedMotion);
  new p5(p5VoiceWave, document.querySelector('.voice-canvas'));
  storyLottieAni2.addEventListener('DOMLoaded', function () {
    introLottie(storyLottie1, storyLottieAni1, sinarioMotion.lottieFirstSinario);
    introLottie(storyLottie2, storyLottieAni2, sinarioMotion.lottieSecondSinario);
  });
}