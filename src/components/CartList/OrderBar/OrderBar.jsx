import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../redux/products/products-selectors';
import { toast } from 'react-toastify';
import { Link, useLocation } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css'
import actions from '../../../redux/products/products-actions';
import OrderInputForm from './OrderInputForm/OrderInputForm';
import s from './OrderBar.module.scss';

const OrderBar = ({loaderMessage}) => {
    const products = useSelector(getProducts);
    const dispatch = useDispatch();

    
    function totalCount(items) {
        let sum = 0;

        items.map(item => {
            sum += item.price * item.quantity;
        });

        return sum;
    };

    function clearCart() {
        dispatch(actions.deleteAll());
    }

    return <div className={s.orderBar__wrapper}>
            <button onClick={() => clearCart()}>Delete all</button>
            <OrderInputForm total={totalCount(products)} loader={ loaderMessage } />
            <p>Total: { totalCount(products) } UAH</p>
        </div>
}

export default OrderBar;