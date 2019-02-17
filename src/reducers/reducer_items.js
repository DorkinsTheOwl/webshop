import { FETCH_ALL_ITEMS, FILTER_ITEMS } from "../actions";

const initialState = {
    allItems: [],
    filteredItems: [],
    filteredTerm: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_ITEMS:
            return {
                ...state,
                allItems: action.payload.data.items
            };
        case FILTER_ITEMS:
            const filteredItems = state.allItems.filter(item =>
                item.name.toLowerCase().includes(action.payload.toLowerCase()));
            return {
                ...state,
                filteredItems,
                filteredTerm: action.payload
            };
        default:
            return state;
    }
}