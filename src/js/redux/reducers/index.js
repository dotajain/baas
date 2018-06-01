import { combineReducers } from "redux";
import sendEmail from "./sendEmailReducer";
import retailReducer from "./retailReducer";
import wtts from "./WatsonReduser";
import getTemprature from './iotReducer';

const rootReducer = combineReducers({
  sendEmail,
  retailReducer,
  wtts,
  getTemprature
})

export default rootReducer;