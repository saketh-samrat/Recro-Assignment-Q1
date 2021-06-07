import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE
} from './Types'

const initialState = {
  loading: false,
  posts: [],
  error: ''
}


// action is dispatched post api call with response/resolution
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true
      }

      // from previous phase where we dispatched data within 
      // the action payload is provided by reduces to state
    case FETCH_POSTS_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
        error: ''
      }
      // same case as above but here reducer provides response/resolve to provider component with error value.
    case FETCH_POSTS_FAILURE:
      return {
        loading: false,
        posts: [],
        error: action.payload
      }
    default: return state
  }
}

export default reducer
