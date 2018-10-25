function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports.LOCATION_CHANGE = "@@router/LOCATION_CHANGE";
const initialState = {
  location: null,
  action: null
};

module.exports.routerReducer = function routerReducer(state = initialState, {
  type,
  payload
} = {}) {
  if (type === LOCATION_CHANGE) {
    const {
      location,
      action
    } = payload || {};
    return _objectSpread({}, state, {
      location,
      action
    });
  }

  return state;
};