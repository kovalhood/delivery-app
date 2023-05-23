import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/products/products-selectors';
import actions from '../../redux/products/products-actions';
import { useParams, Outlet, useNavigate, useLocation } from 'react-router-dom';
import s from './ShopMenu.module.scss';
import sprite from '../../images/icons.svg'
import restaurants from '../../data/restaurants.json'
import Section from '../Section/Section';
import Container from '../Container/Container';

export default function ShopMenu() {
    const { shopId } = useParams();
    const [shopMenu, setShopMenu] = useState('');
    const [from, setFrom] = useState(null);
    const [searchBack, setSearchBack] = useState('');

    const navigate = useNavigate();
    const { state } = useLocation();

    const products = useSelector(getProducts);
    const dispatch = useDispatch();
    
    // Setting path for Go Back button with search query fom movies page return 
    useEffect(() => {
        if (state?.from) {
            const { pathname, search } = state.from;
            setFrom(pathname);
            setSearchBack(search);
        }
    },[state?.from])

    useEffect(() => {
        const selectedRestaurant = restaurants.find(item => item.id === Number(shopId));
        
        if (selectedRestaurant) {
            setShopMenu(selectedRestaurant.menu);
        }

        else {
            goBackHandle()
        }
        
    }, [shopId])

    function goBackHandle() {
        if (from === null) {
            //Go back functionality for first load of page from address bar
            navigate('/', { replace: true });
            return;
        }

        else {
            navigate(`${from}${searchBack}`);
        }
    }

    function addToCart(itemId, itemName, itemPrice, itemImage) {
        if (products.find(item => item.shopId !== Number(shopId))) {
            console.log('You have items from another restaurant in a cart');
            return;
        }

        const selectedRestaurant = restaurants.find(item => item.id === Number(shopId));
        let itemsQuantity = 1;
        dispatch(actions.addProduct(selectedRestaurant.id, selectedRestaurant.name, itemName, itemId, itemPrice, itemsQuantity, itemImage));
        console.log(products);
    }

    function deleteItemFromCart(itemId) {
        dispatch(actions.deleteProductById(itemId));
    }

    return <Section>
        <Container>
        
        {shopMenu &&
            <div className={s.details}>
                <div className={s.image_wrapper}>
                    
                <button onClick={goBackHandle} className={s.go_back}>
                    {/* <svg className={s.go_back__icon} width="16" height="16" aria-label="logo">
                        <use href={`${sprite}#arrow-back`}></use>
                    </svg> */}
                        Go back
                    </button>
                </div>

                <ul className={s.menu}>
                {shopMenu.map(({ id, name, price, image }) => (
                    <li key={id} className={s.menu__item}>
                        <img src={image} alt={name} className={ s.menu__image } />
                        <h3>{ name }</h3>
                        <p>{price} UAH</p>

                        
                        {products.find(item => item.productId === id) 
                            ? <button onClick={(()=> deleteItemFromCart(id))}>Delete from cart</button>
                            : <button onClick={()=>addToCart(id, name, price, image)}>Add to cart</button>
                        }
                        
                        
                    </li>
                ))}
            </ul>
            </div>}
        
            <Outlet />
            </Container>
    </Section>
}