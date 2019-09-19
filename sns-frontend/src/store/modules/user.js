'use strict';
import { createAction, handleActions } from "redux-actions";

import { Map, fromJS } from "immutable";
import { pender } from "redux-pender";

import * as api from "lib/api";

//actionTypes
const LOGIN = "user/LOGIN";
const JOIN = "user/JOIN";
const LOGOUT = "user/LOGOUT";
const UINFO = "user/UINFO";
const UPDATE = "user/UPDATE";
const CHANGE_USER_INPUT = "user/CHANGE_USER_INPUT";
const CHECK = "user/CHECK";
const SET_POSTCODE = "user/SET_POSTCODE";
const SET_FILE = 'user/SET_FILE';
const SET_ERROR = 'user/SET_ERROR';
const CHECK_OVERLAP = 'user/CHECK_OVERLAP';
//action creators
export const join = createAction(JOIN, api.join);
export const login = createAction(LOGIN, api.login);
export const logout = createAction(LOGOUT, api.logout);
export const uinfo = createAction(UINFO, api.uinfo);
export const update = createAction(UPDATE, api.update);
export const changeUserInput = createAction(CHANGE_USER_INPUT);
export const check = createAction(CHECK, api.check);
export const setPostcode = createAction(SET_POSTCODE);
export const setFile = createAction(SET_FILE);
export const setError = createAction(SET_ERROR);
export const checkOverlap = createAction(CHECK_OVERLAP, api.checkOverlap);

const initialState = Map({
  logininfo: Map({
    userid: "",
    password: "",
    error: false
  }),
  userinfo: Map({}),
  signininfo: Map({
    userid: "",
    name: "",
    password: "",
    password_confirm: "",
    email : '',
    phone: '',
    error : false,
    file : null
  }),
  userinfoinput: Map({
    password: "",
    password_confirm: ""
  }),
  result: Map({})
});

export default handleActions(
  {
    [CHANGE_USER_INPUT]: (state, action) => {
      const { type, name, value } = action.payload;
      return state.setIn([type, name], value);
    },
    [SET_POSTCODE]: (state, action) => {
      const { payload: address } = action;
      return state.setIn(["signininfo", "address"], address);
    },
    [SET_FILE] : (state, action)=>{
      const{payload : file} = action;   
      console.log(action.payload);
      return state.setIn(["signininfo","file"],file);
    },
    [SET_ERROR] : (state, action)=>{
      console.log(action);
      const {type,error} = action.payload;
      return state.setIn([type,'error'],error);
    },
    ...pender({
      type: LOGIN,
      onSuccess: (state, action) => {
        const { success } = action.payload.data;
        return state
          .setIn(["logininfo","error"],!success)
          .set("result", Map(action.payload.data));
      },
      onError: (state, action) => {
        const { error } = action;
        return state.setIn(["logininfo", "error"], error);
      }
    }),
    ...pender({
      type: LOGOUT,
      onSuccess: (state, action) => {
        return state
          .set("logininfo", initialState.get("logininfo"))
          .set("result", initialState.get("result"));
      }
    }),
    ...pender({
      type: UINFO,
      onSuccess: (state, action) => {
        const { data: userinfo } = action.payload;
        return state.set("userinfo", fromJS(userinfo));
      }
    }),
    ...pender({
      type: CHECK,
      onSuccess: (state, action) => {
        return state.set("result", Map(action.payload.data));
      }
    }),
    ...pender({
      type :CHECK_OVERLAP,
      onSuccess : (state, action)=>{
        const { error } = action.payload.data;
        console.log(error);
        return state.setIn(['signininfo','error'],error);
      }
    }),
    ...pender({
      type : JOIN,
      onSuccess: (state, action)=>{
        console.log(action);
        return state.set('signininfo',initialState.get('signininfo'));
      },
      onError: (state,action)=>{
        console.log(action);
      }
    })
  },
  initialState
);
