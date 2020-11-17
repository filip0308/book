export const userReducer = (state = { user: null, books: [], row: null }, action) => {
    switch (action.type) {
        case "LOGGED_IN_USER": 
        return { ...state, user: action.payload };
        case "LOGOUT": 
        return action.payload;
        case "BOOKS": 
        return { ...state, books: action.payload.books };
        case "BOOK_DELETED": 
        return { ...state, books: state.books.filter(x => x.id !== action.payload.book.id) };
        case "BOOK_UPDATED": 
        return { ...state, books: state.books.map(
            (content, i) => content.id === action.payload.book.id ? action.payload.book : content) };
        case "BOOK_SAVE": 
        return { ...state, books: state.books.map(
            (content, i) => content.id === action.payload.book.id ? action.payload.book : content) };
        case "ROW": 
        return { ...state, row: action.payload.row };
        default:
            return state;
    }
};