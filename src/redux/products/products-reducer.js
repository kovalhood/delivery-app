import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from './products-actions';

const items = createReducer([], {
    [actions.addProduct]: (state, action) => [action.payload, ...state],
    [actions.deleteProductById]: (state, action) => state.filter(product => product.productId !== action.payload),
    [actions.deleteAll]: (state, action) => []
})

export default combineReducers({
    items
})