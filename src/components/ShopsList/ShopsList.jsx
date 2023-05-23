import { Link, useLocation } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css'
import s from './ShopsList.module.scss';
import restaurants from '../../data/restaurants.json'

const ShopsList = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') ?? '';

    return <>
            <ul className={s.shops}>
                {restaurants.map(({ id, name, rating, image, estimatedTime }) => (
                    <li key={id} className={s.shops__item}>
                        <Link to={`/${id}`} state={{ from: location, search: query }} className={s.link}>
                            <img src={image} alt={name} className={ s.shops__image }/>
                            <h3>{ name }</h3>
                            <p>{rating}</p>
                            <p>{estimatedTime}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
}

export default ShopsList;