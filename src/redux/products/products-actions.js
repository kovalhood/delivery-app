import { createAction } from '@reduxjs/toolkit';

const addProduct = createAction('products/Add', (shopId, productId, price, quantity) => ({
    payload: {
        shopId,
        productId,
        price,
        quantity
    },
}));

const deleteProductById = createAction('products/DeleteById');
const deleteAll = createAction('products/DeleteAll');

export default { addProduct, deleteProductById, deleteAll };