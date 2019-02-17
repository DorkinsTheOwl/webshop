import { combineReducers } from 'redux';
import ItemsReducer from './reducer_items';
import { myFormReducer } from './recuder_forms';
import userReducer from './reducer_user';
import cartReducer from './reducer_cart';

const rootReducer = combineReducers({
    items: ItemsReducer,
    form: myFormReducer,
    user: userReducer,
    cart: cartReducer
});

export default rootReducer;
