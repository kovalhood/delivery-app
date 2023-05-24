import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from './order-actions';

const items = createReducer([], {
    [actions.addOrder]: (state, action) => [action.payload, ...state],
    [actions.deleteOrderById]: (state, action) => state.filter(product => product.productId !== action.payload),
    [actions.deleteAll]: (state, action) => []
})

export default combineReducers({
    items
});