import { combineReducers } from "redux";
import { userReducer } from "./userReducer";


 combineReducers({
    user: userReducer.user,
    books: userReducer.books,
    row: userReducer.row,
    delete: userReducer.delete,
})

export default userReducer;