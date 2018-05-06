module.exports.LOCATION_CHANGE = "@@router/LOCATION_CHANGE"

const initialState = {
  location: null,
  action: null
}

module.exports.routerReducer = function routerReducer(state = initialState, { type, payload } = {}) {
  if (type === LOCATION_CHANGE) {
    const { location, action } = payload || {}

    return { ...state, location, action }
  }

  return state
}
