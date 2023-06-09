import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../redux/products/products-selectors';
import 'react-loading-skeleton/dist/skeleton.css'
import actions from '../../../redux/products/products-actions';
import OrderInputForm from './OrderInputForm/OrderInputForm';
import s from './OrderBar.module.scss';

const OrderBar = ({orderedMessage}) => {
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
        <div className={s.orderBar__title_wrapper}>
            <p className={s.orderBar__title}>Contact Details</p>
            <button className={s.orderBar__button_clear} onClick={() => clearCart()}>Clear cart</button>
        </div>
        
        <OrderInputForm total={totalCount(products)} ordered={ orderedMessage } />
    </div>
}

export default OrderBar;