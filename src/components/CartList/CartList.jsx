import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/products/products-selectors';
import { HiTrash, HiPlus, HiMinus } from 'react-icons/hi';
import { toast } from 'react-toastify';
import 'react-loading-skeleton/dist/skeleton.css'
import actions from '../../redux/products/products-actions';
import OrderBar from './OrderBar/OrderBar';
import s from './CartList.module.scss';

const CartList = () => {
    const [isLoading, setIsLoading] = useState(false);
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

    function deleteItem(itemId) {
        dispatch(actions.deleteProductById(itemId));
    }

    function handleIsLoading(data) {
        setIsLoading(data);
    }

    if (products.length !== 0 && isLoading === false) {
        return <div className={s.cartList__wrapper}>
                <ul className={s.cart}>
                    {products.map(({ productId, shopName, name, price, image, quantity }) => (
                        <li key={productId} className={s.cart__item}>
                            <div className={s.cart__image_wrapper}>
                                <img className={s.cart__image} src={image} alt={name} />
                            </div>
                            <div className={s.cart__wrapper}>
                                <div className={s.cart__text_wrapper}>
                                    <p className={s.menu__shop_name}>{shopName}</p>
                                    <h3>{ name }</h3>
                                    <p className={s.menu__price}>{price * quantity} UAH</p>
                                </div>
                                <div className={s.cart__controls_wrapper}>
                                    <button className={quantity===1 ? s.cart__button_disabled : s.cart__button} onClick={() => removeItem(productId)}><HiMinus/></button>
                                    <p className={s.cart__quantity}>{quantity}</p>
                                    <button className={s.cart__button} onClick={()=>addItem(productId)}><HiPlus/></button>
                                    
                                </div>
                            </div>

                            <button className={s.cart__button_delete} onClick={() => deleteItem(productId)}><HiTrash/></button>
                        </li>
                    ))}
                </ul>
                <OrderBar loaderMessage={ handleIsLoading } />
            </div>
    }

    if (products.length === 0 && isLoading === false) {
        return <p>Choose some products</p>
    }

    if (isLoading === true) {
        return <p>Thank you for the order!</p>
    }
}

export default CartList;