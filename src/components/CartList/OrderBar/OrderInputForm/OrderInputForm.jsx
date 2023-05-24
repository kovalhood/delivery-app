import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../../redux/products/products-selectors';
import actions from '../../../../redux/order/order-actions';
import actionsProducts from '../../../../redux/products/products-actions';
import { getOrders } from '../../../../redux/order/order-selectors';
import { toast } from 'react-toastify';
import Label from './Label';
import InputText from './InputText';
import InputNumber from './InputNumber/InputNumber';
import Button from './Button';
import s from './OrderInputForm.module.scss';
import { nanoid } from '@reduxjs/toolkit';

function OrderInputForm({ total, loader }) {
    const [order, setOrder] = useState([]);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    // const contacts = useSelector(getItems);
    // const filterValue = useSelector(getFilter);

    const products = useSelector(getProducts);
    const dispatch = useDispatch();

    // Function for setting contacts in store
    // const handleContactInfo = () => {
    //     dispatch(actions.addContact(name, number));
    //     if (filterValue !== '') {
    //         dispatch(actions.changeFilter(''));
    //     }
    // };

    const handleSubmit = event => {
        event.preventDefault();

        // if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
        //     if (filterValue !== '') {
        //         dispatch(actions.changeFilter(''));
        //     }
            
        //     return alert(`${name} is already in contacts`);
        // }
        console.log(name, number, email, address, total, products);
        // handleContactInfo();

        let itemTest = {
            user: {
                name, number, email, address, total
            },
            products
        }

        dispatch(actions.addOrder(itemTest));
        dispatch(actionsProducts.deleteAll());

        loader(true);

        // setOrder(prevState => [...prevState, itemTest]);

        // console.log(order);
        resetForm();
    };

    const handleKeyPressNumber = (event) => {
        // if (event.currentTarget.value === '') {
        //     // Preventing multiple notifications appearance
        //     toast.dismiss();
        // }
        
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
        <Label labelTitle={'Name'}>
            <InputText input={'name'} name={name} onNameChange={handleChange}/>
        </Label>
        
        <Label labelTitle={'Number'}>
            <InputNumber number={number} onNumberChange={handleChange} onNumberKeyPress={handleKeyPressNumber}/>
        </Label>

        <Label labelTitle={'Email'}>
            <InputText input={'email'} name={email} onNameChange={handleChange}/>
        </Label>

        <Label labelTitle={'Address'}>
            <InputText input={'address'} name={address} onNameChange={handleChange}/>
        </Label>
        
        <Button type={'submit'} title={"Make an order"} />
</form>
};

export default OrderInputForm;