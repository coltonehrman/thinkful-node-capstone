webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var DOM = {
  screens: '.screen',
  homeScreen: '.home.screen',
  placeScreen: '.place.screen',
  placeSearch: '.place-search',
  backButton: '.back-btn',
  searchResults: '.results__list',
  searchResult: '.results__item',
  progressBar: '.progress',
  categoryContainer: '.place__categories',
  categories: '.place__category',
  googleMapActivator: '.activator',
  place: '.place__item',
  placeName: '.place__name',
  placeResults: '.place__results',
  placeRating: '.place__rating'
};

exports.default = DOM;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOM = undefined;

var _DOM = __webpack_require__(0);

var _DOM2 = _interopRequireDefault(_DOM);

var _Screen = __webpack_require__(11);

var _Screen2 = _interopRequireDefault(_Screen);

var _Search = __webpack_require__(12);

var _Search2 = _interopRequireDefault(_Search);

var _Place = __webpack_require__(10);

var _Place2 = _interopRequireDefault(_Place);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global $ */
exports.DOM = _DOM2.default;
exports.default = {
  Screen: _Screen2.default,
  Search: _Search2.default,
  Place: _Place2.default
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global google document */
var autocomplete = new google.maps.places.AutocompleteService();
var service = new google.maps.places.PlacesService(document.createElement('div'));

exports.autocomplete = autocomplete;
exports.service = service;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _attractions = __webpack_require__(14);

function parseIcon(size, icon) {
  return icon.prefix + 'bg_' + size + icon.suffix;
}

function parsePhoto(size, photo) {
  return '' + photo.prefix + size + photo.suffix;
}

function parseCategory(iconUrl) {
  var category = iconUrl.split('/').slice(-2, -1)[0];
  return category.split('_').map(function (cat) {
    return '' + cat[0].toUpperCase() + cat.slice(1);
  }).join(' ');
}

function parsePlace(place) {
  var data = {};

  data.name = place.venue.name;

  place.venue.categories.forEach(function (category) {
    data.icon = parseIcon(32, category.icon);
    data.category = parseCategory(data.icon);
  });

  if (typeof place.venue.hours !== 'undefined') {
    data.open = place.venue.hours.isOpen;
    data.hours = place.venue.hours.status;
  }

  if (typeof place.venue.location !== 'undefined') {
    data.address = place.venue.location.formattedAddress.join(', ');
    data.coords = {
      lat: place.venue.location.lat,
      lng: place.venue.location.lng
    };
  }

  if (place.venue.photos.count !== 0) {
    data.photo = parsePhoto('500x300', place.venue.photos.groups[0].items[0]);
  }

  if (typeof place.venue.price !== 'undefined') {
    data.price = place.venue.price.currency.repeat(place.venue.price.tier);
  }

  if (typeof place.venue.rating !== 'undefined') {
    data.rating = place.venue.rating;
  }

  return data;
}

exports.default = {
  findAttractions: function findAttractions(coords) {
    return new Promise(function (resolve) {
      (0, _attractions.getAttractions)(coords).then(function (res) {
        var places = [];

        res.groups.forEach(function (group) {
          group.items.forEach(function (place) {
            places.push(parsePlace(place));
          });
        });

        resolve(places);
      });
    });
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _autocomplete = __webpack_require__(15);

Object.defineProperty(exports, 'autocomplete', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_autocomplete).default;
  }
});

var _getLatLong = __webpack_require__(16);

Object.defineProperty(exports, 'getLatLong', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getLatLong).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(19)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./styles.sass", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./styles.sass");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(7);

var _google = __webpack_require__(5);

var _UIController = __webpack_require__(2);

var _UIController2 = _interopRequireDefault(_UIController);

var _AttractionsController = __webpack_require__(4);

var _AttractionsController2 = _interopRequireDefault(_AttractionsController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global window google $ document */
function setupEventListeners() {
  var $placeSearch = $(_UIController.DOM.placeSearch);

  $placeSearch.on('keyup', function () {
    var search = $placeSearch.val().trim();
    if (search === '') {
      _UIController2.default.Search.hideResults();
    } else {
      _UIController2.default.Search.clearResults();
      (0, _google.autocomplete)(search).then(function (results) {
        return _UIController2.default.Search.displayResults(results);
      }).catch(function () {
        return _UIController2.default.Search.hideResults();
      });
    }
  });

  $(document).on('click', _UIController.DOM.searchResult, function (e) {
    var $place = $(e.target).parents(_UIController.DOM.searchResult);
    var name = $place.text().trim();
    var placeId = $place.data('place-id').trim();

    _UIController2.default.Search.clear();
    _UIController2.default.Place.setPlaceName(name);
    _UIController2.default.Screen.goTo(_UIController.DOM.placeScreen);

    (0, _google.getLatLong)(placeId).then(function (loc) {
      _AttractionsController2.default.findAttractions(loc).then(function (attractions) {
        _UIController2.default.Place.toggleProgress();
        _UIController2.default.Place.displayPlaces(attractions);
      });
    });
  });

  $(document).on('click', _UIController.DOM.categories, function (e) {
    var $categories = $(_UIController.DOM.categories);
    var $target = $(e.target);
    var category = $target.text();

    $categories.addClass('btn-flat');
    $target.removeClass('btn-flat');
    _UIController2.default.Place.displayPlacesByFilter(category);
  });

  $(_UIController.DOM.backButton).on('click', function () {
    _UIController2.default.Screen.goTo(_UIController.DOM.homeScreen);
    _UIController2.default.Search.focus();
    _UIController2.default.Place.reset();
  });

  $(document).on('click', _UIController.DOM.googleMapActivator, function (e) {
    var $place = $(e.target).parents(_UIController.DOM.place);
    _UIController2.default.Place.showMap($place);
    window.currentMap = _UIController2.default.Place.getMap($place);
  });
}

function init() {
  _UIController2.default.Screen.goTo(_UIController.DOM.homeScreen);
  _UIController2.default.Search.focus();
  setupEventListeners();
}

$(init);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global google $ */


var _UIController = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Place = function () {
  function Place(place) {
    _classCallCheck(this, Place);

    this.place = place;
    this.$element = this.createElement();
    this.createRating();
    this.map = null;
    this.marker = null;
  }

  _createClass(Place, [{
    key: 'createMap',
    value: function createMap() {
      if (!this.map) {
        var coords = new google.maps.LatLng(this.place.coords.lat, this.place.coords.lng);
        var map = new google.maps.Map(this.$element.find('.map').get(0), {
          zoom: 15,
          center: coords
        });
        var marker = new google.maps.Marker({
          position: coords,
          map: map
        });
        this.map = map;
        this.marker = marker;

        google.maps.event.addListener(map, 'idle', function () {
          map.setCenter(coords);
        });
      }
    }
  }, {
    key: 'createRating',
    value: function createRating() {
      var currentRating = this.$element.find(_UIController.DOM.placeRating).data('current-rating');
      this.$element.find(_UIController.DOM.placeRating).barrating('show', {
        theme: 'fontawesome-stars-o',
        showSelectedRating: false,
        initialRating: currentRating / 2,
        readonly: true
      });
    }
  }, {
    key: 'createElement',
    value: function createElement() {
      var html = '\n      <div class="place__item col s12 m6">\n        <div class="card">';
      if (typeof this.place.photo !== 'undefined') {
        html += '\n          <div class="card-image waves-effect waves-block waves-light">\n            <img class="activator" src="' + this.place.photo + '">\n          </div>';
      }
      html += '\n          <div class="card-content grey-text">\n            <div class="card-title">\n              <i class="activator material-icons small right">location_on</i></span>\n              <div class="chip right">\n                <img src="' + this.place.icon + '" alt="Contact Person">\n                ' + this.place.category + '\n              </div>\n              ' + this.place.name;
      if (typeof this.place.hours !== 'undefined') {
        html += '\n              <p class="place__hours">' + this.place.hours + '</p>';
      }
      html += '\n            </div>\n            <blockquote>' + this.place.address.split(', ').join('<br>') + '</blockquote>';

      html += '\n            </div>\n            <div class="card-reveal">\n              <span class="card-title grey-text">' + this.place.name + '<i class="material-icons right">close</i></span>\n              <div class="map"></div>\n            </div>';
      if (typeof this.place.price !== 'undefined' || typeof this.place.rating !== 'undefined') {
        html += '\n          <div class="card-action">';
        if (typeof this.place.price !== 'undefined') {
          html += '\n              <p class="place__price place__price--' + this.place.price.length + ' right btn-floating red">' + this.place.price + '</p>';
        }
        if (typeof this.place.rating !== 'undefined') {
          html += '\n              <select class="place__rating" name="rating" data-current-rating="' + this.place.rating + '">\n                <option value="1">1</option>\n                <option value="2">2</option>\n                <option value="3">3</option>\n                <option value="4">4</option>\n                <option value="5">5</option>\n              </select>';
        }
        html += '\n          </div>';
      }
      html += '\n        </div>\n      </div>';

      return $(html);
    }
  }]);

  return Place;
}();

exports.default = Place;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(17);

var _state2 = _interopRequireDefault(_state);

var _DOM = __webpack_require__(0);

var _DOM2 = _interopRequireDefault(_DOM);

var _Place = __webpack_require__(9);

var _Place2 = _interopRequireDefault(_Place);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var progressVisible = true; /* global $ */


function toggleProgress() {
  if (progressVisible) {
    progressVisible = false;
    $(_DOM2.default.progressBar).hide();
  } else {
    progressVisible = true;
    $(_DOM2.default.progressBar).show();
  }
}

function setPlaceName(name) {
  $(_DOM2.default.placeName).text(name);
}

function appendPlaces(places) {
  var $placeResults = $(_DOM2.default.placeResults);
  places.forEach(function (place, i) {
    if (i % 2 === 0) {
      var $row = $('<div class="row"></div>');
      $row.append(place.$element);
      $placeResults.append($row);
    } else {
      $placeResults.find('.row').last().append(place.$element);
    }
  });
}

function clearCategories() {
  $(_DOM2.default.categories).remove();
}

function clearPlaces() {
  $(_DOM2.default.placeResults).empty();
}

exports.default = {
  setPlaceName: setPlaceName,
  toggleProgress: toggleProgress,
  displayPlaces: function displayPlaces(places) {
    var placeCategories = places.map(function (place) {
      return place.category;
    });
    var categories = placeCategories.filter(function (cat, i) {
      return placeCategories.indexOf(cat) === i;
    });

    clearCategories();

    categories.forEach(function (cat) {
      return $(_DOM2.default.categoryContainer).append('<a class="' + _DOM2.default.categories.slice(1) + ' waves-effect btn-flat btn">' + cat + '</a>');
    });

    _state2.default.places = places.map(function (place) {
      return new _Place2.default(place);
    }).sort(function (a, b) {
      if (typeof a.place.photo !== 'undefined') {
        if (typeof b.place.photo !== 'undefined') {
          return 0;
        }
        return -1;
      }
      return 1;
    });

    appendPlaces(_state2.default.places);
  },
  displayPlacesByFilter: function displayPlacesByFilter(category) {
    var $placeResults = $(_DOM2.default.placeResults);
    var placesToShow = _state2.default.places.filter(function (place) {
      return place.place.category === category;
    });

    if ($placeResults.children().length >= 1) {
      $placeResults.empty();
    }

    appendPlaces(placesToShow);
  },
  getMap: function getMap($place) {
    return _state2.default.places.find(function (place) {
      return place.$element.is($place);
    }).map;
  },
  showMap: function showMap($place) {
    _state2.default.places.find(function (place) {
      return place.$element.is($place);
    }).createMap();
  },
  reset: function reset() {
    toggleProgress();
    clearCategories();
    clearPlaces();
  }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DOM = __webpack_require__(0);

var _DOM2 = _interopRequireDefault(_DOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function showScreen(selector) {
  $(_DOM2.default.screens).hide();
  $(selector).show();
} /* global $ */
exports.default = {
  goTo: function goTo(screen) {
    showScreen(screen);
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DOM = __webpack_require__(0);

var _DOM2 = _interopRequireDefault(_DOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hideResults() {
  $(_DOM2.default.searchResults).hide();
} /* global $ */


function clearResults() {
  $(_DOM2.default.searchResults).empty();
}

exports.default = {
  hideResults: hideResults,
  clearResults: clearResults,
  focus: function focus() {
    $(_DOM2.default.placeSearch).focus();
  },
  displayResults: function displayResults(results) {
    var $searchResults = $(_DOM2.default.searchResults);
    $searchResults.empty();

    results.forEach(function (result) {
      $searchResults.append('<li class="' + _DOM2.default.searchResult.slice(1) + '" data-place-id="' + result.id + '">\n          <span>' + result.name + '</span>\n        </li>');
    });

    $searchResults.show();
  },
  clear: function clear() {
    $(_DOM2.default.placeSearch).val('');
    clearResults();
    hideResults();
  }
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = __webpack_require__(1);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var lat = _ref.lat,
      lng = _ref.lng;
  return new Promise(function (resolve) {
    _jquery2.default.ajax('https://api.foursquare.com/v2/venues/explore', {
      data: {
        client_id: 'HIRHIF3ESK5TAJTKTU0HQDMY3KABRJSFN3EA1SSOE2ULSCWH',
        client_secret: 'GACVTXG4OQ5KKICSQBNNHM5DPBGZGCLR0D0JG5LEX5TWMIOL',
        ll: lat + ',' + lng,
        m: 'foursquare',
        v: 20170101,
        limit: 50,
        venuePhotos: 1
      }
    }).done(function (data) {
      resolve(data.response);
    });
  });
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getAttractions = __webpack_require__(13);

Object.defineProperty(exports, 'getAttractions', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getAttractions).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apis = __webpack_require__(3);

exports.default = function (text) {
  return new Promise(function (resolve, reject) {
    _apis.autocomplete.getPlacePredictions({
      input: text,
      types: ['(cities)']
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
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apis = __webpack_require__(3);

exports.default = function (placeId) {
  return new Promise(function (resolve) {
    _apis.service.getDetails({
      placeId: placeId
    }, function (place) {
      var _place$geometry$locat = place.geometry.location,
          lat = _place$geometry$locat.lat,
          lng = _place$geometry$locat.lng;

      resolve({
        lat: lat(),
        lng: lng()
      });
    });
  });
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  places: []
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

throw new Error("Module build failed: \n.screen {\n        ^\n      Invalid CSS after \".screen {\": expected \"}\", was \"{\"\n      in /Users/coltonje/Documents/Projects/Thinkful/node_capstone/src/client/sass/modules/_screen.sass (line 1, column 10)");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(20);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 20 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
],[8]);