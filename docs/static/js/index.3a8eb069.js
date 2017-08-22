/*! @author 1832064870@qq.com */
webpackJsonp([0],{

/***/ "./app/index.js":
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/*! exports provided:  */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_static_css_index_scss__ = __webpack_require__(/*! static/css/index.scss */ "./static/css/index.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_static_css_index_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_static_css_index_scss__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var PI2 = Math.PI * 2;
var random = function random(min, max) {
  return Math.random() * (max - min + 1) + min | 0;
};

var Birthday = function () {
  function Birthday() {
    _classCallCheck(this, Birthday);

    this.resize();

    // create a lovely place to store the firework
    this.fireworks = [];
    this.counter = 0;
  }

  _createClass(Birthday, [{
    key: 'resize',
    value: function resize() {
      this.width = canvas.width = window.innerWidth;
      var center = this.width / 2 | 0;
      this.spawnA = center - center / 4 | 0;
      this.spawnB = center + center / 4 | 0;

      this.height = canvas.height = window.innerHeight;
      this.spawnC = this.height * .1;
      this.spawnD = this.height * .5;
    }
  }, {
    key: 'onClick',
    value: function onClick(evt) {
      var x = evt.clientX || evt.touches && evt.touches[0].pageX;
      var y = evt.clientY || evt.touches && evt.touches[0].pageY;

      var count = random(3, 5);
      for (var i = 0; i < count; i++) {
        this.fireworks.push(new Firework(random(this.spawnA, this.spawnB), this.height, x, y, random(300, 450), random(30, 110)));
      }

      this.counter = -30;
    }
  }, {
    key: 'update',
    value: function update() {
      ctx.globalCompositeOperation = 'hard-light';
      ctx.fillStyle = 'rgba(20,20,20,0.15)';
      ctx.fillRect(0, 0, this.width, this.height);

      ctx.globalCompositeOperation = 'lighter';
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.fireworks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var firework = _step.value;

          firework.update();
        }

        // if enough time passed... create new new firework
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (++this.counter === 15) {
        this.fireworks.push(new Firework(random(this.spawnA, this.spawnB), this.height, random(0, this.width), random(this.spawnC, this.spawnD), random(300, 450), random(30, 110)));
        this.counter = 0;
      }

      // remove the dead fireworks
      if (this.fireworks.length > 1000) {
        this.fireworks = this.fireworks.filter(function (firework) {
          return !firework.dead;
        });
      }
    }
  }]);

  return Birthday;
}();

var Firework = function () {
  function Firework(x, y, targetX, targetY, shade, offsprings) {
    _classCallCheck(this, Firework);

    this.dead = false;
    this.offsprings = offsprings;

    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;

    this.shade = shade;
    this.history = [];
  }

  _createClass(Firework, [{
    key: 'update',
    value: function update() {
      if (this.dead) {
        return;
      }

      var xDiff = this.targetX - this.x;
      var yDiff = this.targetY - this.y;
      if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) {
        // is still moving
        this.x += xDiff / 20;
        this.y += yDiff / 20;

        this.history.push({
          x: this.x,
          y: this.y
        });

        if (this.history.length > 20) {
          this.history.shift();
        }
      } else {
        if (this.offsprings && !this.madeChilds) {
          var babies = this.offsprings / 2;
          for (var i = 0; i < babies; i++) {
            var targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0;
            var targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0;

            birthday.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0));
          }
        }
        this.madeChilds = true;
        this.history.shift();
      }

      if (this.history.length === 0) {
        this.dead = true;
      } else if (this.offsprings) {
        for (var _i = 0; this.history.length > _i; _i++) {
          var point = this.history[_i];
          ctx.beginPath();
          ctx.fillStyle = 'hsl(' + this.shade + ',100%,' + _i + '%)';
          ctx.arc(point.x, point.y, 1, 0, PI2, false);
          ctx.fill();
        }
      } else {
        ctx.beginPath();
        ctx.fillStyle = 'hsl(' + this.shade + ',100%,50%)';
        ctx.arc(this.x, this.y, 1, 0, PI2, false);
        ctx.fill();
      }
    }
  }]);

  return Firework;
}();

var canvas = document.getElementById('birthday');
var ctx = canvas.getContext('2d');

var birthday = new Birthday();
window.onresize = function () {
  return birthday.resize();
};
document.onclick = function (evt) {
  return birthday.onClick(evt);
};
document.ontouchstart = function (evt) {
  return birthday.onClick(evt);
};(function update() {
  requestAnimationFrame(update);
  birthday.update();
})();

/***/ }),

/***/ "./node_modules/_css-loader@0.28.4@css-loader/index.js?{\"importLoaders\":2}!./node_modules/_postcss-loader@2.0.6@postcss-loader/lib/index.js?{\"ident\":\"postcss\"}!./node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./static/css/index.scss":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_css-loader@0.28.4@css-loader?{"importLoaders":2}!./node_modules/_postcss-loader@2.0.6@postcss-loader/lib?{"ident":"postcss"}!./node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./static/css/index.scss ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/_css-loader@0.28.4@css-loader/lib/css-base.js */ "./node_modules/_css-loader@0.28.4@css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "body {\n  margin: 0;\n  background: #020202;\n  cursor: crosshair; }\n\ncanvas {\n  display: block; }\n\nh1 {\n  position: absolute;\n  top: 20%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n      -ms-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  color: #fff;\n  font-family: \"Source Sans Pro\";\n  font-size: 5em;\n  font-weight: 900;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n   -ms-user-select: none;\n       user-select: none; }\n", ""]);

// exports


/***/ }),

/***/ "./static/css/index.scss":
/*!*******************************!*\
  !*** ./static/css/index.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/_css-loader@0.28.4@css-loader??ref--5-1!../../node_modules/_postcss-loader@2.0.6@postcss-loader/lib??postcss!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./index.scss */ "./node_modules/_css-loader@0.28.4@css-loader/index.js?{\"importLoaders\":2}!./node_modules/_postcss-loader@2.0.6@postcss-loader/lib/index.js?{\"ident\":\"postcss\"}!./node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./static/css/index.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../node_modules/_style-loader@0.18.2@style-loader/lib/addStyles.js */ "./node_modules/_style-loader@0.18.2@style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(/*! !../../node_modules/_css-loader@0.28.4@css-loader??ref--5-1!../../node_modules/_postcss-loader@2.0.6@postcss-loader/lib??postcss!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./index.scss */ "./node_modules/_css-loader@0.28.4@css-loader/index.js?{\"importLoaders\":2}!./node_modules/_postcss-loader@2.0.6@postcss-loader/lib/index.js?{\"ident\":\"postcss\"}!./node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./static/css/index.scss", function() {
			var newContent = __webpack_require__(/*! !../../node_modules/_css-loader@0.28.4@css-loader??ref--5-1!../../node_modules/_postcss-loader@2.0.6@postcss-loader/lib??postcss!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./index.scss */ "./node_modules/_css-loader@0.28.4@css-loader/index.js?{\"importLoaders\":2}!./node_modules/_postcss-loader@2.0.6@postcss-loader/lib/index.js?{\"ident\":\"postcss\"}!./node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./static/css/index.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

},["./app/index.js"]);
//# sourceMappingURL=index.3a8eb069.js.map