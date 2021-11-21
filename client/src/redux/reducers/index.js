import {combineReducers} from "redux";

import auth from "./auth";
import alert from "./alert";
import chat from "./chat";

const rootReducer = combineReducers({auth, alert, chat})

export default rootReducer