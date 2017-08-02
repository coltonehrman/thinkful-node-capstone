webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _autocomplete = __webpack_require__(4);

Object.defineProperty(exports, 'autocomplete', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_autocomplete).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global google document */
var autocomplete = new google.maps.places.AutocompleteService();

exports.autocomplete = autocomplete; // eslint-disable-line

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apis = __webpack_require__(3);

function getPredictions(types, text) {
  return new Promise(function (resolve, reject) {
    _apis.autocomplete.getPlacePredictions({
      input: text,
      types: types
    }, function (data) {
      if (data !== null) {
        var results = data.map(function (place) {
          return {
            name: place.description,
            id: place.place_id
          };
        });
        resolve(results);
      } else {
        reject();
      }
    });
  });
}

exports.default = {
  cities: getPredictions.bind(null, ['(cities)']),
  addresses: getPredictions.bind(null, ['geocode'])
};

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const DOM = {
  locationSearch: '.search__input',
  searchResults: '.results__list',
  searchResult: '.results__item',
  progressBar: '.progress',
  googleMapActivator: '.activator',
  placeAddBtn: '.place__add',
  placeName: '.place__name',
  placeResults: '.place__results',
  place: '.place__item',
  placeRating: '.place__rating',
};

/* harmony default export */ __webpack_exports__["a"] = (DOM);


/***/ }),
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);


const API_ENDPOINT = '/locations';

function findLocation(name) {
  return new Promise((resolve, reject) => {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.ajax(`${API_ENDPOINT}`, {
      data: { name },
    })
    .done((res) => {
      resolve(res);
    })
    .fail((xhr) => {
      const message = JSON.parse(xhr.responseText).message;
      reject(message);
    });
  });
}

function createLocation(name) {
  return new Promise((resolve, reject) => {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.ajax(`${API_ENDPOINT}`, {
      data: { name },
      method: 'POST',
    })
    .done((res) => {
      resolve(res);
    })
    .fail((xhr) => {
      const message = JSON.parse(xhr.responseText).message;
      reject(message);
    });
  });
}

/* harmony default export */ __webpack_exports__["a"] = ({
  findLocation,
  createLocation,
});


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Search__ = __webpack_require__(22);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__Search__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DOM__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__DOM__["a"]; });




/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DOM__ = __webpack_require__(10);
/* eslint comma-dangle: ["error", "ignore"] */



function hideResults() {
  __WEBPACK_IMPORTED_MODULE_0_jquery___default()(__WEBPACK_IMPORTED_MODULE_1__DOM__["a" /* default */].searchResults).hide();
}

function clearResults() {
  __WEBPACK_IMPORTED_MODULE_0_jquery___default()(__WEBPACK_IMPORTED_MODULE_1__DOM__["a" /* default */].searchResults).empty();
}

/* harmony default export */ __webpack_exports__["a"] = ({
  hideResults,
  clearResults,
  focus() {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(__WEBPACK_IMPORTED_MODULE_1__DOM__["a" /* default */].locationSearch).focus();
  },
  displayResults(results) {
    const $searchResults = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(__WEBPACK_IMPORTED_MODULE_1__DOM__["a" /* default */].searchResults);
    $searchResults.empty();

    results.forEach((result) => {
      $searchResults.append(
        `<li class="${__WEBPACK_IMPORTED_MODULE_1__DOM__["a" /* default */].searchResult.slice(1)}">
          <span>${result.name}</span>
        </li>`
      );
    });

    $searchResults.show();
  },
  clear() {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(__WEBPACK_IMPORTED_MODULE_1__DOM__["a" /* default */].locationSearch).val('');
    clearResults();
    hideResults();
  },
});


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_styles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_google__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_google___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_google__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controllers_UIController__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__controllers_APIController__ = __webpack_require__(13);
/* global window google document */
/* eslint comma-dangle: ["error", "ignore"] */
 // eslint-disable-line

 // eslint-disable-line



function getSearchResults() {
  const $locationSearch = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(__WEBPACK_IMPORTED_MODULE_3__controllers_UIController__["a" /* DOM */].locationSearch);
  const search = $locationSearch.val().trim();

  if (search === '') {
    __WEBPACK_IMPORTED_MODULE_3__controllers_UIController__["b" /* Search */].hideResults();
  } else {
    __WEBPACK_IMPORTED_MODULE_3__controllers_UIController__["b" /* Search */].clearResults();
    __WEBPACK_IMPORTED_MODULE_2_google__["autocomplete"].cities(search)
      .then(__WEBPACK_IMPORTED_MODULE_3__controllers_UIController__["b" /* Search */].displayResults)
      .catch(__WEBPACK_IMPORTED_MODULE_3__controllers_UIController__["b" /* Search */].hideResults);
  }
}

function setupEventListeners() {
  const $locationSearch = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(__WEBPACK_IMPORTED_MODULE_3__controllers_UIController__["a" /* DOM */].locationSearch);

  $locationSearch.on('keyup', getSearchResults);

  __WEBPACK_IMPORTED_MODULE_1_jquery___default()(document).on('click', __WEBPACK_IMPORTED_MODULE_3__controllers_UIController__["a" /* DOM */].searchResult, (e) => {
    const $place = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(e.target).parents(__WEBPACK_IMPORTED_MODULE_3__controllers_UIController__["a" /* DOM */].searchResult);
    const name = $place.text().trim();

    __WEBPACK_IMPORTED_MODULE_3__controllers_UIController__["b" /* Search */].clear();

    __WEBPACK_IMPORTED_MODULE_4__controllers_APIController__["a" /* default */].findLocation(name)
      .then((location) => {
        if (!location) {
          return __WEBPACK_IMPORTED_MODULE_4__controllers_APIController__["a" /* default */].createLocation(name);
        }
        return location;
      })
      .then((location) => {
        window.location.replace(`/locations/${location.id}`);
      })
      .catch(err => console.log(err));
  });
}

function init() {
  setupEventListeners();
}

__WEBPACK_IMPORTED_MODULE_1_jquery___default()(init);


/***/ })
],[23]);
//# sourceMappingURL=main.3c40ebb8d41673f43f67.js.map