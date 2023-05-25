import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../../redux/products/products-selectors';
import actions from '../../../../redux/order/order-actions';
import actionsProducts from '../../../../redux/products/products-actions';
import { getOrders } from '../../../../redux/order/order-selectors';
import Label from './Label';
import InputText from './InputText';
import InputNumber from './InputNumber/InputNumber';
import Button from './Button';
import s from './OrderInputForm.module.scss';

function OrderInputForm({ total, ordered }) {
    const [order, setOrder] = useState([]);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const products = useSelector(getProducts);
    const dispatch = useDispatch();


    const handleSubmit = event => {
        event.preventDefault();

        console.log(name, number, email, address, total, products);

        let itemTest = {
            user: {
                name, number, email, address, total
            },
            products
        }

        dispatch(actions.addOrder(itemTest));
        dispatch(actionsProducts.deleteAll());

        ordered(true);

        resetForm();
    };

    const handleKeyPressNumber = (event) => {        
        ["e", "E", ".", ","].includes(event.key) && event.preventDefault();
    }

        

    const handleChange = event => {
        const { name, value } = event.currentTarget;
        
        switch (name) {
            case 'name':
                setName(value);
                break;
            
            case 'number': {
                setNumber(value);
                break;
            }
                
            case 'email': {
                setEmail(value);
                break;
            }
                
            case 'address': {
                setAddress(value);
                break;
            }
                
            default:
                return;
        }
    };

    const resetForm = () => {
        setName('');
        setNumber('');
        setEmail('');
        setAddress('');
    };

    return <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.form__wrapper}>
            <div className={s.form__wrapper_1}>
                <Label labelTitle={'Name'}>
                    <InputText input={'name'} name={name} onNameChange={handleChange}/>
                </Label>
            
                <Label labelTitle={'Number'}>
                    <InputNumber number={number} onNumberChange={handleChange} onNumberKeyPress={handleKeyPressNumber}/>
                </Label>
            </div>
            <div className={s.form__wrapper_2}>
                <Label labelTitle={'Email'}>
                    <InputText input={'email'} name={email} onNameChange={handleChange}/>
                </Label>

                <Label labelTitle={'Address'}>
                    <InputText input={'address'} name={address} onNameChange={handleChange}/>
                </Label>
            </div>
        </div>
        <div className={s.form__submit_wrapper}>
            <p className={s.form__total}>Total: <span className={s.form__total_sum}>{ total } UAH</span></p>
            <Button type={'submit'} title={"Confirm Order"} />
        </div>
</form>
};

export default OrderInputForm;