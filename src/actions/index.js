import axios from 'axios';

export const FETCH_ALL_ITEMS = 'fetch_all_items';
export const ITEM_ADDED = 'item_added';
export const REGISTERED = 'registered';
export const SAVE_USER = 'save_user';
export const ADD_ITEM_TO_CART = 'add_item_to_cart';
export const REMOVE_ITEM_FROM_CART = 'remove_item_to_cart';
export const ORDER_MADE = 'order_made';
export const INITIAL_VALUES = 'initial_values';
export const FILTER_ITEMS = 'filter_items';

const ROOT_URL = 'http://localhost:3000';

export function fetchAllItems() {
    let request = axios.get(`${ROOT_URL}/items`);

    return {
        type: FETCH_ALL_ITEMS,
        payload: request
    }
}

export function afterItemAdded() {
    return {
        type: ITEM_ADDED,
        payload: null
    }
}

export function onSuccessfulRegistration() {
    return {
        type: REGISTERED,
        payload: null
    }
}

export function saveUser(payload) {
    return {
        type: SAVE_USER,
        payload
    }
}

export function addItemToCard(payload) {
    return {
        type: ADD_ITEM_TO_CART,
        payload
    }
}

export function removeItemFromCart(payload) {
    return {
        type: REMOVE_ITEM_FROM_CART,
        payload
    }
}

export function onOrderMade() {
    return {
        type: ORDER_MADE,
        payload: null
    }
}

export function initialFormValues(payload) {
    return {
        type: INITIAL_VALUES,
        payload
    }
}

export function filterItems(payload) {
    return {
        type: FILTER_ITEMS,
        payload
    }
}