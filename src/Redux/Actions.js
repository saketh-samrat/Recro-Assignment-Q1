import axios from 'axios'
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE
} from './Types'

// Actual Api call is heppening here triggered on user action
export const fetchPosts = (start) => {
  return (dispatch) => {
    dispatch(fetchPostsRequest())
    // using axios to make api call
    // parameters start is to fetch from certain point of posts and 
    // limit is to get limited number of posts
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=10`)
      .then(response => {
        // response.data is the posts
        const posts = response.data
        dispatch(fetchPostsSuccess(posts))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchPostsFailure(error.message))
      })
  }
}

export const fetchPostsRequest = () => {
  return {
    type: FETCH_POSTS_REQUEST
  }
}

// on successful api call with returned data above is dispatched to the reducer in type form
export const fetchPostsSuccess = posts => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts
  }
}

// on unsuccessful api call with returned error above is dispatched to the reducer in type form
export const fetchPostsFailure = error => {
  return {
    type: FETCH_POSTS_FAILURE,
    payload: error
  }
}
