webpackJsonp([3],{

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DOM__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__DOM__["a"]; });


 // eslint-disable-line


/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const DOM = {
  form: 'form',
  errorMessage: '.error-message',
  errorCloseBtn: '.error-close',
  demoMenu: '#demo-menu',
  demoInfo: '.demo-info',
};

/* harmony default export */ __webpack_exports__["a"] = (DOM);


/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styles__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_styles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__controllers_UIController__ = __webpack_require__(17);
/* global window */
 // eslint-disable-line



function setupEventListeners() {
  const $form = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(__WEBPACK_IMPORTED_MODULE_2__controllers_UIController__["a" /* DOM */].form);
  const $errorMessage = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(__WEBPACK_IMPORTED_MODULE_2__controllers_UIController__["a" /* DOM */].errorMessage);
  const $demoMenu = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(__WEBPACK_IMPORTED_MODULE_2__controllers_UIController__["a" /* DOM */].demoMenu);
  const $demoInfo = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(__WEBPACK_IMPORTED_MODULE_2__controllers_UIController__["a" /* DOM */].demoInfo);

  $demoMenu.on('click', () => {
    $demoInfo.tapTarget('open');
  });

  $form.on('submit', (e) => {
    const data = {};
    e.preventDefault();

    $form.serializeArray().forEach((field) => {
      data[field.name] = field.value;
    });

    __WEBPACK_IMPORTED_MODULE_1_jquery___default.a.ajax('/login', {
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
      const message = JSON.parse(xhr.responseText).message;

      if (xhr.status === 401) {
        $err.html(`${message}<i class="${__WEBPACK_IMPORTED_MODULE_2__controllers_UIController__["a" /* DOM */].errorCloseBtn.slice(1)} material-icons right">close</i>`).removeClass('hide');
      } else if (xhr.status === 500) {
        // server error
      }
    });
  });

  $errorMessage.on('click', __WEBPACK_IMPORTED_MODULE_2__controllers_UIController__["a" /* DOM */].errorCloseBtn, () => {
    $errorMessage.html('').addClass('hide');
  });
}

function init() {
  setupEventListeners();
  __WEBPACK_IMPORTED_MODULE_1_jquery___default()(__WEBPACK_IMPORTED_MODULE_2__controllers_UIController__["a" /* DOM */].demoInfo).tapTarget('open');
}

__WEBPACK_IMPORTED_MODULE_1_jquery___default()(init);


/***/ })

},[24]);
//# sourceMappingURL=login.62bb2f75c82d401cfff1.js.map