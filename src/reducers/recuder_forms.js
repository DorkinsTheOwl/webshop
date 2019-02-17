import { reducer as formReducer } from "redux-form";
import { INITIAL_VALUES, ITEM_ADDED, ORDER_MADE, REGISTERED } from "../actions";

export const myFormReducer = formReducer.plugin({
    PrecesPievienosanasForma: (state, action) => {
        switch (action.type) {
            case ITEM_ADDED:
                return undefined;
            default:
                return state;
        }
    },
    RegistracijasForma: (state, action) => {
        switch (action.type) {
            case REGISTERED:
                return undefined;
            default:
                return state;
        }
    },
    PasutijumaForma: (state, action) => {
        switch (action.type) {
            case ORDER_MADE:
                return undefined;
            case INITIAL_VALUES:
                return {
                    ...state,
                    values: {
                        ...state.values,
                        email: action.payload
                    }
                };
            default:
                return state;
        }
    }
});
