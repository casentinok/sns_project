import { createAction, handleActions } from "redux-actions";

import { Map } from "immutable";
//import { pender } from "redux-pender";

// actionType
const SHOW_MODAL = "modals/SHOW_MODAL";
const HIDE_MODAL = "modals/HIDE_MODAL";
const MESSAGE = "modals/MESSAGE";
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);
export const message = createAction(MESSAGE);

const initialState = Map({
  message : "",
  login: false,
  join: false,
  ask :false,
  signin : false,
  postcode:false
});

export default handleActions(
  {
    [SHOW_MODAL]: (state, action) => {
      const { payload: modaltype } = action;
      return state.set(modaltype, true);
    },
    [HIDE_MODAL]: (state, action) => {
      const { payload: modaltype } = action;
      return state.set(modaltype , false);
    },
    [MESSAGE] :(state, action )=>{
      const { payload : message } = action;
      
      return state.set("message", message);
    }
  },
  initialState
);
