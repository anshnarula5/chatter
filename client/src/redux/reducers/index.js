import {combineReducers} from "redux";

import auth from "./auth";
import alert from "./alert";
import chat from "./chat";
import toggle from "./toggle";

const rootReducer = combineReducers({auth, alert, chat, toggle})

export default rootReducer