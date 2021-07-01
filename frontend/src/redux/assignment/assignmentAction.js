import {
    ASSIGNMENT_CREATE_FAIL,
    ASSIGNMENT_CREATE_REQUEST,
    ASSIGNMENT_CREATE_SUCCESS,

    ASSIGNMENT_DELETE_FAIL,
    ASSIGNMENT_DELETE_REQUEST,
    ASSIGNMENT_DELETE_SUCCESS,

    ASSIGNMENT_UPDATE_REQUEST,
    ASSIGNMENT_UPDATE_SUCCESS,
    ASSIGNMENT_UPDATE_FAIL,

    ASSIGNMENT_GET_FAIL,
    ASSIGNMENT_GET_REQUEST,
    ASSIGNMENT_GET_SUCCESS
} from './assignmentTypes'


import api from '../../api/index'


  
  export const createAssignment = (title, quizes, dueDate) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: ASSIGNMENT_CREATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await api.post(
        `/assignment/create-assignment`,
        { title, quizes, dueDate },
        config
      );
  
      dispatch({
        type: ASSIGNMENT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ASSIGNMENT_CREATE_FAIL,
        payload: message,
      });
    }
  };
  
  
  export const listAssignments = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ASSIGNMENT_GET_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await api.get(`/assignment`, config);
  
      dispatch({
        type: ASSIGNMENT_GET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ASSIGNMENT_GET_FAIL,
        payload: message,
      });
    }
  };

  export const deleteAssignmentAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ASSIGNMENT_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      
  
      const { data } = await api.delete(`/assignment/${id}`, config);
  
      dispatch({
        type: ASSIGNMENT_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ASSIGNMENT_DELETE_FAIL,
        payload: message,
      });
    }
  };



  export const getAssignmentAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ASSIGNMENT_GET_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await api.get(`/assignment/${id}`, config);
  
      dispatch({
        type: ASSIGNMENT_GET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ASSIGNMENT_GET_FAIL,
        payload: message,
      });
    }
  };

  export const updateNoteAction = (id, title, quizes, dueDate) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: ASSIGNMENT_UPDATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await api.patch(
        `/assignment/update/${id}`,
        { title, quizes, dueDate },
        config
      );
  
      dispatch({
        type: ASSIGNMENT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ASSIGNMENT_UPDATE_FAIL,
        payload: message,
      });
    }
  };
  