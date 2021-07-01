import {
    ASSIGNMENT_UPDATE_REQUEST,
    ASSIGNMENT_UPDATE_SUCCESS,
    ASSIGNMENT_UPDATE_FAIL,
    ASSIGNMENT_CREATE_FAIL,
    ASSIGNMENT_CREATE_REQUEST,
    ASSIGNMENT_CREATE_SUCCESS,
    ASSIGNMENT_DELETE_FAIL,
    ASSIGNMENT_DELETE_REQUEST,
    ASSIGNMENT_DELETE_SUCCESS,
    ASSIGNMENT_GET_FAIL,
    ASSIGNMENT_GET_REQUEST,
    ASSIGNMENT_GET_SUCCESS,
} from './assignmentTypes'


export const assignmentListReducer = (state = { assignments: [] }, action) => {
    switch (action.type) {
      case ASSIGNMENT_GET_REQUEST:
        return { loading: true };
      case ASSIGNMENT_GET_SUCCESS:
        return { loading: false, assignments: action.payload };
      case ASSIGNMENT_GET_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };



  export const assignmentReducer = (state = {}, action) => {
    switch (action.type) {
      case ASSIGNMENT_GET_REQUEST:
        return { loading: true };
      case ASSIGNMENT_GET_SUCCESS:
        return { loading: false, state: action.payload };
      case ASSIGNMENT_GET_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const assignmentCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case ASSIGNMENT_CREATE_REQUEST:
        return { loading: true };
      case ASSIGNMENT_CREATE_SUCCESS:
        return { loading: false, success: true };
      case ASSIGNMENT_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const assignmentDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case ASSIGNMENT_DELETE_REQUEST:
        return { loading: true };
      case ASSIGNMENT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case ASSIGNMENT_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  
  export const assignmentUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case ASSIGNMENT_UPDATE_REQUEST:
        return { loading: true };
      case ASSIGNMENT_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case ASSIGNMENT_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  