import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

//Actions Creators

const getAccountUserPending = "account/getUser/pending";
const getAccountUserFulfilled = "account/getUser/fulfilled";
const getAccountUserRejected = "account/getUser/rejected";

//Store
const store = createStore(
  combineReducers({
    amount: amountReducer,
    bonus: bonusReducer,
  }),
  applyMiddleware(logger.default, thunk.default)
);



//Amount Reducer
function amountReducer(state = { amount: 0 }, action) {
  if (action.type === "increment") {
    return { amount: state.amount + 1 };
  }

  if (action.type === "incrementByAmount") {
    return { amount: state.amount + action.payload };
  }

  if (action.type === getAccountUserPending) {
    return { ...state, pending: true };
  }

  if (action.type === getAccountUserFulfilled) {
    return { ...state, amount: action.payload, pending: false };
  }

  if (action.type === getAccountUserRejected) {
    return { ...state, error: action.error, pending: false };
  }

  return state;
}

function bonusReducer(state={points:0},action){

    if(action.type==='incrementByAmount'){
        if(action.payload>100)
        {
            return {points:state.points+1}
        }
    }
    if(action.type==='incrementBonus'){
        return {points:state.points+10}
    }

    return state;
}

function getUser(id) {
  return async (dispatch, getState) => {
    try {
      
      dispatch({type:getAccountUserPending})
      const response = await fetch(`http://localhost:3000/account/${id}`);
      const data = await response.json();
      dispatch({ type:getAccountUserFulfilled, payload: data.amount });
    } catch (error) {
        dispatch({ type:getAccountUserRejected, error: error.message });
    }
  };
}

//To run Codes
setInterval(() => {
  store.dispatch(getUser(1));
}, 3000);
