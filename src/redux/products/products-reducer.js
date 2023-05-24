import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from './products-actions';

const items = createReducer([], {
    [actions.addProduct]: (state, action) => [...state, action.payload],
    [actions.deleteProductById]: (state, action) => state.filter(product => product.productId !== action.payload),
    [actions.quantityAdd]: (state, action) => {
        const item = state.find((product) => product.productId === action.payload);
        console.log(action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    [actions.quantityRemove]: (state, action) => {
      const item = state.find((product) => product.productId === action.payload);

      if (item) {
        item.quantity -= 1;
      }
    },
    [actions.deleteAll]: (state, action) => []
})

export default combineReducers({
    items
});