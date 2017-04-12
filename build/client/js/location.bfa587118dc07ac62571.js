webpackJsonp([0],[
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* global window */


const path = window.location.pathname.split('/');
const LOCATION_ID = path[path.length - 1];
const API_ENDPOINT = '/places';

function findPlaces() {
  return new Promise((resolve, reject) => {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.ajax(API_ENDPOINT, {
      data: { location_id: LOCATION_ID },
    })
    .done(res => resolve(res))
    .fail((xhr) => {
      const message = JSON.parse(xhr.responseText).message;
      reject(message);
    });
  });
}

function createPlace({ name, description }) {
  return new Promise((resolve, reject) => {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.ajax(API_ENDPOINT, {
      data: { name, description, location: LOCATION_ID },
      method: 'POST',
    })
    .done(res => resolve(res))
    .fail((xhr) => {
      const message = JSON.parse(xhr.responseText).message;
      reject(message);
    });
  });
}

/* harmony default export */ __webpack_exports__["a"] = ({
  findPlaces,
  createPlace,
});


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DOM__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Places__ = __webpack_require__(18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__DOM__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__Places__["a"]; });






/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({});


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  progress: '.progress',
  placeAddBtn: '.place__add-btn',
  placeCancelBtn: '.place__cancel-btn',
  placeCreateBtn: '.place__create-btn',
  places: '.place__results',
  place: '.place__item',
});


/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controllers_UIController__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__controllers_APIController__ = __webpack_require__(5);
/* global google */
/* eslint global-require: 0, import/no-extraneous-dependencies: 0, import/no-unresolved: 0 */
/* eslint comma-dangle: ["error", "ignore"] */




class Place {
  constructor(place, id) {
    this.id = id;
    if (!place) {
      this.place = {
        name: 'Lorem ipsum dolor',
        description: `
        Lorem ipsum dolor sit amet
        Fusce eu nibh accumsan
        Integer eget diam tempor
        Praesent a lacus eu metus`,
      };
      this.$element = this.createElement();
      this.addOverlay();
    } else {
      this.place = place;
      this.$element = this.createElement();
      // this.createRating();
      this.map = null;
      this.marker = null;
    }
  }

  createPlace() {
    const name = this.$element.find('#name').val();
    const description = this.$element.find('#description').val();
    return __WEBPACK_IMPORTED_MODULE_2__controllers_APIController__["a" /* default */].createPlace({ name, description });
  }

  createMap() {
    if (!this.map) {
      const coords = new google.maps.LatLng(
        this.place.coords.lat,
        this.place.coords.lng // eslint-disable-line
      );
      const map = new google.maps.Map(this.$element.find('.map').get(0), {
        zoom: 15,
        center: coords,
      });
      const marker = new google.maps.Marker({
        position: coords,
        map,
      });
      this.map = map;
      this.marker = marker;

      google.maps.event.addListener(map, 'idle', () => {
        map.setCenter(coords);
      });
    }
  }

  createRating() {
    const currentRating = this.$element.find(__WEBPACK_IMPORTED_MODULE_1__controllers_UIController__["a" /* DOM */].placeRating).data('current-rating');
    this.$element.find(__WEBPACK_IMPORTED_MODULE_1__controllers_UIController__["a" /* DOM */].placeRating).barrating('show', {
      theme: 'fontawesome-stars-o',
      showSelectedRating: false,
      initialRating: currentRating / 2,
      readonly: true,
    });
  }

  createElement() {
    const html = `
      <div class="place__item col s12 m6" data-id="${this.id}">
        <div class="card">
          <div class="card-image">
            <img src="${__webpack_require__(27)}">
          </div>

          <div class="card-content">
            <div class="card-title">${this.place.name}</div>

            <blockquote>${this.place.description}</blockquote>
          </div>

          <div class="card-action"></div>
        </div>
      </div>
    `;

    return __WEBPACK_IMPORTED_MODULE_0_jquery___default()(html);
  }

  addOverlay() {
    this.$element.find('.card').append(`
      <div class="card__overlay">
        <a class="btn-floating btn-large ${__WEBPACK_IMPORTED_MODULE_1__controllers_UIController__["a" /* DOM */].placeAddBtn.slice(1)}">
          <i class="material-icons">add</i>
        </a>
      </div>
    `);
  }

  toForm() {
    this.$element.find('.card-title').replaceWith(`
      <div class="input-field card-title">
        <input id="name" type="text">
        <label for="name">Name</label>
      </div>
      <ul class="autocomplete-content dropdown-content"></ul>
    `);

    this.$element.find('blockquote').replaceWith(`
      <div class="input-field">
        <blockquote>
          <textarea id="description" class="materialize-textarea"></textarea>
          <label for="description">Description</label>
        </blockquote>
      </div>
    `);

    this.$element.find('.card-action').append(`
      <a class="${__WEBPACK_IMPORTED_MODULE_1__controllers_UIController__["a" /* DOM */].placeCancelBtn.slice(1)} btn-floating btn-large waves-effect waves-light red">
        <i class="material-icons">close</i>
      </a>
    `, `
      <a class="${__WEBPACK_IMPORTED_MODULE_1__controllers_UIController__["a" /* DOM */].placeCreateBtn.slice(1)} btn-floating btn-large right waves-effect waves-light green accent-3">
        <i class="material-icons">check</i>
      </a>
    `);

    this.$element.find('.card__overlay').hide();
  }

  displayResults(results) {
    const $searchResults = this.$element.find('.autocomplete-content');
    $searchResults.empty();

    results.forEach((result) => {
      $searchResults.append(`
        <li><span>${result.name}</span></li>`
      );
    });

    $searchResults.show();
  }

  hideResults() {
    this.$element.find('.autocomplete-content').hide();
  }

  clearResults() {
    this.$element.find('.autocomplete-content').empty();
  }

  cancelForm() {
    this.$element.find('.card-title').replaceWith(`
      <div class="card-title">Lorem ipsum dolor</div>
    `);

    this.$element.find('blockquote').parents('.input-field').replaceWith(`
      <blockquote>
        Lorem ipsum dolor sit amet
        Fusce eu nibh accumsan
        Integer eget diam tempor
        Praesent a lacus eu metus
      </blockquote>
    `);

    this.$element.find('.card-action').empty();
    this.$element.find('.card__overlay').show();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Place;



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DOM__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Place__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__state__ = __webpack_require__(7);





function hideProgress() {
  __WEBPACK_IMPORTED_MODULE_0_jquery___default()(__WEBPACK_IMPORTED_MODULE_1__DOM__["a" /* default */].progress).hide();
}

function appendPlace(place, id) {
  if (id % 2 === 0) {
    const $newRow = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div class="row"></div>');
    $newRow.append(place.$element);
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(__WEBPACK_IMPORTED_MODULE_1__DOM__["a" /* default */].places).append($newRow);
  } else {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(__WEBPACK_IMPORTED_MODULE_1__DOM__["a" /* default */].places).find('.row').last().append(place.$element);
  }
}

function display(places) {
  places.unshift(null);
  if (places.length === 0) {
    // show no places
  }
  __WEBPACK_IMPORTED_MODULE_3__state__["a" /* default */].places = places.map((place, i) => new __WEBPACK_IMPORTED_MODULE_2__components_Place__["a" /* default */](place, i));
  __WEBPACK_IMPORTED_MODULE_3__state__["a" /* default */].places.forEach(appendPlace);
}

function add(place) {
  const id = __WEBPACK_IMPORTED_MODULE_3__state__["a" /* default */].places.length;
  const newPlace = new __WEBPACK_IMPORTED_MODULE_2__components_Place__["a" /* default */](place, id);
  __WEBPACK_IMPORTED_MODULE_3__state__["a" /* default */].places.push(newPlace);
  appendPlace(newPlace, id);
}

/* harmony default export */ __webpack_exports__["a"] = ({
  hideProgress,
  display,
  add,
});


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_styles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_google__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_google___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_google__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controllers_APIController__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__controllers_UIController__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__state__ = __webpack_require__(7);
/* global google document */
/* eslint func-names: 0 */
 // eslint-disable-line

 // eslint-disable-line




function setupEventListeners() {
  __WEBPACK_IMPORTED_MODULE_1_jquery___default()(__WEBPACK_IMPORTED_MODULE_4__controllers_UIController__["a" /* DOM */].places).on('click', __WEBPACK_IMPORTED_MODULE_4__controllers_UIController__["a" /* DOM */].placeAddBtn, function () {
    const $place = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this).parents(__WEBPACK_IMPORTED_MODULE_4__controllers_UIController__["a" /* DOM */].place);
    const id = $place.data('id');
    __WEBPACK_IMPORTED_MODULE_5__state__["a" /* default */].places[id].toForm();
  });

  __WEBPACK_IMPORTED_MODULE_1_jquery___default()(__WEBPACK_IMPORTED_MODULE_4__controllers_UIController__["a" /* DOM */].places).on('click', __WEBPACK_IMPORTED_MODULE_4__controllers_UIController__["a" /* DOM */].placeCancelBtn, function () {
    const $place = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this).parents(__WEBPACK_IMPORTED_MODULE_4__controllers_UIController__["a" /* DOM */].place);
    const id = $place.data('id');
    __WEBPACK_IMPORTED_MODULE_5__state__["a" /* default */].places[id].cancelForm();
  });

  __WEBPACK_IMPORTED_MODULE_1_jquery___default()(__WEBPACK_IMPORTED_MODULE_4__controllers_UIController__["a" /* DOM */].places).on('click', __WEBPACK_IMPORTED_MODULE_4__controllers_UIController__["a" /* DOM */].placeCreateBtn, function () {
    const $place = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this).parents(__WEBPACK_IMPORTED_MODULE_4__controllers_UIController__["a" /* DOM */].place);
    const id = $place.data('id');
    __WEBPACK_IMPORTED_MODULE_5__state__["a" /* default */].places[id].createPlace()
      .then((place) => {
        __WEBPACK_IMPORTED_MODULE_5__state__["a" /* default */].places[id].cancelForm();
        __WEBPACK_IMPORTED_MODULE_4__controllers_UIController__["b" /* Places */].add(place);
      })
      .catch(err => console.log(err));
  });

  __WEBPACK_IMPORTED_MODULE_1_jquery___default()(__WEBPACK_IMPORTED_MODULE_4__controllers_UIController__["a" /* DOM */].places).on('keyup', '#name', function () {
    const value = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this).val();
    const id = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this).parents(__WEBPACK_IMPORTED_MODULE_4__controllers_UIController__["a" /* DOM */].place).data('id');
    const place = __WEBPACK_IMPORTED_MODULE_5__state__["a" /* default */].places[id];

    if (value === '') {
      place.hideResults();
    } else {
      place.clearResults();
      __WEBPACK_IMPORTED_MODULE_2_google__["autocomplete"].addresses(value)
      .then(res => place.displayResults(res))
      .catch(() => place.hideResults());
    }
  });
}

function init() {
  setupEventListeners();
  __WEBPACK_IMPORTED_MODULE_3__controllers_APIController__["a" /* default */].findPlaces()
    .then((places) => {
      __WEBPACK_IMPORTED_MODULE_4__controllers_UIController__["b" /* Places */].hideProgress();
      __WEBPACK_IMPORTED_MODULE_4__controllers_UIController__["b" /* Places */].display(places || []);
    })
    .catch(err => console.log(err));
}

__WEBPACK_IMPORTED_MODULE_1_jquery___default()(init);


/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAvcAAAH0CAMAAACO3fK6AAAAn1BMVEX////T09PNzc339/f+/v7MzMzOzs7Ly8vn5+fR0dH5+fn9/f3V1dXu7u7X19fc3NzS0tLq6ura2tr4+PjY2Njt7e3p6en8/PzPz8/Z2dnm5ubW1tbh4eH7+/vQ0NDi4uLl5eXd3d3j4+Px8fHw8PDz8/Pb29vk5OT09PT6+vr19fXf39/29vbs7Ozo6Ojy8vLr6+vg4ODe3t7U1NTv7+/lc22AAAAEWElEQVR42u3dWW/iSBSA0YbYrrBDEggEsm+9bzP//7dNt1ojjWYmYFtqq6pyzlsefB+uPkUmwa43bwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPil2PsjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKPTszK8rJweWREZ2oT9plZEhgYHuh9YEboH3YPuQfege4jC6GF1/FN1oPvquKXVw8iWiUtx3A+/Xf+isGliyn4WOjETPhG5CR25sWuiMSy76r4c2jaxeA6debZtYrHtrvutbROLqrvu17ZNLEKHbBvdg+4h6u4Hm93F58Xq4vpkrnteRff926///CP85eTbWvdk3n1vcf6fy4s/z3RPxt33Ji9MeDzTPZl2v/f7lMsr3ZNj9+P9r865PNE9+XV/e/CxkQvdk1v3dzXmfC11T1bd39UaNCl1T0bdf685aaF78un+rPbzgde6J5fur97VHlVsdU8m3U8azDrq654sun9qNOxZ9+TQfdnsqIfRQPdk0P2HhtNWuieD7j82nDZa657ku29+sM+d7km++0XjcR91T/LdXzaf19M9iXc/bjHvWvck3v11i3kT3ZN4959azDvVPYl3/7bNwL7uSbv7yzYDe7on7e5bDZzqnqS7r1oNPNE9utc9iXXf1z2v8f6+1QmEW92TdvetDmIb6J60u79vMW/k/1Yk3v2qxbz3uifx7m9bzFvonsS7v2ox71b3JN59eN94XFHpntS7v2s87sHzViTf/aDxuJnuSb77Rm9L++m01D3pd9/0ScMP3p9DBt2HZaNhR6XuyaH7wXmTYRvvxySL7sOuwaxP3gNOJt2Hh/p3OZXuyaX79WnNSedj552QTfdhXu/Ek+LwseW2TTrdhz/qhF/MnONJVt2H3uFbndHGuc1k1n24+nLoI+046J7cug/lzd5nbZdV0D35df/jXuflX/lHm5ozbJvUug/h6f9flznclUH3ZNt9CNPFv7+1UEyeyvrX2zYpdv/jPn96c//320XO334+qRpdbduk2f2v96jNx9vxfN38QtsmFmXojm0Ti0F32Q9sm1jMuut+ZtvEYtld90vbJhZFr6vse4VtE43Hjj7Zlo92TUTuqy6yr+5tmqgMd/Pf/Du/nO+G9gwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC8On8BNxSx67AIOEUAAAAASUVORK5CYII="

/***/ })
],[19]);
//# sourceMappingURL=location.bfa587118dc07ac62571.js.map