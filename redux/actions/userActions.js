import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
  ADMIN_USERS_FAIL,
  ADMIN_USERS_REQUEST,
  ADMIN_USERS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from "../constants/userConstants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//register user
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });

    const { data } = await axios.post("/api/auth/register", userData, config);

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });

    const { data } = await axios.get("/api/user/me");

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//update user profile
export const updateUserProfile = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
    });

    const { data } = await axios.put("/api/user/update", userData, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//forgot password action
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });

    const { data } = await axios.post("/api/user/forgot", email, config);

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//reset password action
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });

    const { data } = await axios.put(
      `/api/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

/** admin route */
//get all user data
export const getAllUsersAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_USERS_REQUEST,
    });

    const { data } = await axios.get(`/api/admin/users`);

    dispatch({
      type: ADMIN_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get single user details
export const getUserDetailsAdmin = (req, id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    //appending cookie is essential when getServerProps is being used
    const { cookie } = req.headers;
    const { origin } = absoluteUrl(req);
    const config = {
      headers: {
        cookie,
      },
    };

    const { data } = await axios.get(`${origin}/api/admin/users/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//update user
export const updateUserDetailsAdmin = (id, user) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });

    const { data } = await axios.put(`/api/admin/users/${id}`, user, config);

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//delete user
export const deleteUserAdmin = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_USER_REQUEST,
    });

    const { data } = await axios.delete(`/api/admin/users/${id}`);

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
