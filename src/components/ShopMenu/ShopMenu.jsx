import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/products/products-selectors';
import { HiTrash, HiPlus, HiArrowLeft } from 'react-icons/hi';
import Skeleton from 'react-loading-skeleton';
import { toast } from 'react-toastify';
import actions from '../../redux/products/products-actions';
import { useParams, Outlet, useNavigate, useLocation } from 'react-router-dom';
import s from './ShopMenu.module.scss';
import Section from '../Section/Section';
import Container from '../Container/Container';
import { getShops } from '../../services/shops-api';
import ListItemSkeleton from '../ListItemSkeleton/ListItemSkeleton';

export default function ShopMenu() {
    const { shopId } = useParams();
    const [shopMenu, setShopMenu] = useState('');
    const [shopName, setShopName] = useState('');
    const [from, setFrom] = useState(null);
    const [searchBack, setSearchBack] = useState('');
    const [restaurants, setRestaurants] = useState([]);

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
    }, [state?.from])
    

    useEffect(() => {
        const fetchData = async () => {
            const data = await getShops();
            setRestaurants(data);
        
            const selectedRestaurant = data.find(item => item.id === Number(shopId));

            if (selectedRestaurant) {
                setShopMenu(selectedRestaurant.menu);
                setShopName(selectedRestaurant.name)
            }

            else {
                goBackHandle()
            }
        }

        fetchData();
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
            toast.dismiss();
            toast.error(`You have items from ${products[0].shopName} in a cart`);
            return;
        }

        const selectedRestaurant = restaurants.find(item => item.id === Number(shopId));
        let itemsQuantity = 1;
        dispatch(actions.addProduct(selectedRestaurant.id, selectedRestaurant.name, itemName, itemId, itemPrice, itemsQuantity, itemImage));
        
        toast.dismiss();
        toast.success(`You have added ${itemName} to a cart`);
    }

    function deleteItemFromCart(itemId, itemName) {
        dispatch(actions.deleteProductById(itemId));

        toast.dismiss();
        toast.error(`You have removed ${itemName} from a cart`);
    }

    return <Section>
        <Container>
            <div className={s.details}>
                <div className={s.menu__controls}>
                    <button onClick={goBackHandle} className={s.go_back}>
                        <HiArrowLeft className={s.menu__icons}/>
                    </button>
                    {shopMenu 
                        ? <p className={s.menu__shop_name}>{shopName}</p>
                        : <p className={s.menu__shop_name}>
                            <Skeleton count={1} width={100} />
                        </p>
                }
                </div>

                {shopMenu ? 
                    <ul className={s.menu}>
                        {shopMenu.map(({ id, name, price, image }) => (
                            <li key={id} className={s.menu__item}>
                                <div className={s.menu__image_wrapper}>
                                    <img src={image} alt={name} className={ s.menu__image } />
                                </div>

                                <div className={s.menu__wrapper}>
                                    <div className={s.menu__text_wrapper}>
                                        <h3>{name}</h3>
                                        <p className={s.menu__price}>{price} UAH</p>
                                    </div>

                                    {products.find(item => item.productId === id) 
                                        ? <button className={s.menu__button_remove} onClick={(() => deleteItemFromCart(id, name))}><HiTrash className={s.menu__icons} /></button>
                                        : <button className={s.menu__button_add} onClick={()=>addToCart(id, name, price, image)}><HiPlus className={s.menu__icons}/></button>
                                    }
                                </div>
                            </li>
                        ))}
                    </ul>
                    :
                    <ListItemSkeleton amountOfItems={[1, 2, 3, 4, 5, 6]} />
                }
                </div>
        
            <Outlet />
            </Container>
    </Section>
}