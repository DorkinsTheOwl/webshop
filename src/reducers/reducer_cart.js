import { ADD_ITEM_TO_CART, ORDER_MADE, REMOVE_ITEM_FROM_CART } from "../actions";

export default (state = [], action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            return [
                ...state,
                action.payload
            ];
        case REMOVE_ITEM_FROM_CART:
            const modifiedState = state.filter(item => item.id !== action.payload.id);
            return [
                ...modifiedState
            ];
        case ORDER_MADE:
            return [];
        default:
            return state;
    }
}