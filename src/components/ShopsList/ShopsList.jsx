import { Link, useLocation } from 'react-router-dom';
import { HiStar, HiClock } from 'react-icons/hi';
import 'react-loading-skeleton/dist/skeleton.css'
import s from './ShopsList.module.scss';
import restaurants from '../../data/restaurants.json'

const ShopsList = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') ?? '';

    return <>
            <ul className={s.shops}>
                {restaurants.map(({ id, name, rating, image, estimatedTime, type }) => (
                    <li key={id} className={s.shops__item}>
                        <Link to={`/${id}`} state={{ from: location, search: query }} className={s.link}>
                            <div className={s.shops__image_wrapper}>
                                <img src={image} alt={name} className={ s.shops__image }/>
                            </div>
                            
                            <div className={s.shops__wrapper}>
                                <div className={s.shops__title_wrapper}>
                                    <h3>{name}</h3>
                                    <p className={s.shops__text_type}>{type}</p>
                                </div>
                                
                                <div className={s.shops__text_wrapper}>
                                    <p className={s.shops__text_time}>{estimatedTime} min <HiClock className={ s.shops__icon_time } /></p>
                                    <p className={s.shops__text_rating}>{rating} <HiStar className={ s.shops__icon_rating }/></p>
                                    
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
}

export default ShopsList;