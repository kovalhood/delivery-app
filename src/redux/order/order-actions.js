import { createAction, nanoid } from '@reduxjs/toolkit';

const addOrder = createAction('order/AddOrder', (order) => ({
    payload: {
        id: nanoid(6),
        order
    },
}));

const deleteOrderById = createAction('order/DeleteById');
const deleteAllOrders = createAction('order/DeleteAll');

export default { addOrder, deleteOrderById, deleteAllOrders };