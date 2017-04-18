webpackJsonp([2],{

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DOM__ = __webpack_require__(24);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__DOM__["a"]; });


 // eslint-disable-line


/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const DOM = {
  form: 'form',
  errorMessage: '.error-message',
  errorCloseBtn: '.error-close',
};

/* harmony default export */ __webpack_exports__["a"] = (DOM);


/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_styles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__controllers_UIController__ = __webpack_require__(14);
/* global window */
 // eslint-disable-line



function setupEventListeners() {
  const $form = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(__WEBPACK_IMPORTED_MODULE_2__controllers_UIController__["a" /* DOM */].form);
  const $errorMessage = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(__WEBPACK_IMPORTED_MODULE_2__controllers_UIController__["a" /* DOM */].errorMessage);

  $form.on('submit', (e) => {
    const data = {};
    e.preventDefault();

    $form.serializeArray().forEach((field) => {
      data[field.name] = field.value;
    });

    __WEBPACK_IMPORTED_MODULE_1_jquery___default.a.ajax('/users', {
      data,
      method: 'POST',
    })
    .done((res) => {
      if (res.redirect) {
        window.location.replace(res.redirect);
      } else {
        console.log(res);
      }
    })
    .fail((xhr) => {
      const $err = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(__WEBPACK_IMPORTED_MODULE_2__controllers_UIController__["a" /* DOM */].errorMessage);
      let message = JSON.parse(xhr.responseText).message;

      if (message.match(/duplicate/) && message.match(/email/)) {
        message = 'Email already in use.';
      }

      if (message.match(/duplicate/) && message.match(/username/)) {
        message = 'Username not available.';
      }

      if (xhr.status === 401 || xhr.status === 500) {
        $err.html(`${message}<i class="${__WEBPACK_IMPORTED_MODULE_2__controllers_UIController__["a" /* DOM */].errorCloseBtn.slice(1)} material-icons right">close</i>`).removeClass('hide');
      }
    });
  });

  $errorMessage.on('click', __WEBPACK_IMPORTED_MODULE_2__controllers_UIController__["a" /* DOM */].errorCloseBtn, () => {
    $errorMessage.html('').addClass('hide');
  });
}

function init() {
  setupEventListeners();
}

__WEBPACK_IMPORTED_MODULE_1_jquery___default()(init);


/***/ })

},[25]);
//# sourceMappingURL=signup.d76f3ea865b0004ce99e.js.map