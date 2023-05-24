import { createAction, nanoid } from '@reduxjs/toolkit';

const addProduct = createAction('products/Add', (shopId, shopName, name, productId, price, quantity, image) => ({
    payload: {
        shopId,
        shopName,
        name,
        productId,
        price,
        quantity,
        image
    },
}));

const quantityAdd = createAction('products/AddById');
const quantityRemove = createAction('products/RemoveById');
const deleteProductById = createAction('products/DeleteById');
const deleteAll = createAction('products/DeleteAll');

export default { addProduct, deleteProductById, deleteAll, quantityAdd, quantityRemove };