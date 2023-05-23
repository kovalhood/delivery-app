import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/products/products-selectors';
import { toast } from 'react-toastify';
import { Link, useLocation } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css'
import actions from '../../redux/products/products-actions';
import s from './CartList.module.scss';

const CartList = () => {
    const products = useSelector(getProducts);
    const dispatch = useDispatch();

    console.log(products);

    function addItem(itemId) {
        dispatch(actions.quantityAdd(itemId));
    };

    function removeItem(itemId) {
        if (products.find(item => item.productId === Number(itemId) && item.quantity > 1)) {
            dispatch(actions.quantityRemove(itemId));
        }
    };

    function clearCart() {
        dispatch(actions.deleteAll());
    }

    return <>
        {products.length!==0
            ? <button onClick={() => clearCart()}>Delete all</button>
            : <p>Choose some products</p>
        }
        
            <ul className={s.cart}>
                {products.map(({ productId, shopName, name, price, image, quantity }) => (
                    <li key={productId} className={s.cart__item}>
                        <img className={s.cart__image} src={image} alt={name} />
                        <p>{shopName}</p>
                        <h3>{ name }</h3>
                        <p>{price * quantity} UAH</p>
                        <p>{quantity}</p>
                        <button onClick={()=>addItem(productId)}>+</button>
                        <button onClick={()=>removeItem(productId)}>-</button>
                        
                    </li>
                ))}
            </ul>
        </>
}

export default CartList;