import { SAVE_USER } from "../actions";

export default (state = {}, action) => {
    switch (action.type) {
        case SAVE_USER:
            return {
                ...state,
                level: !!action.payload ? action.payload.level : null,
                email: !!action.payload ? action.payload.email : null
            };
        default:
            return state;
    }
}