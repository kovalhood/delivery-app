import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useLocation } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css'
import actions from '../../redux/products/products-actions';
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
                            <img src={image} alt={name} width={300}/>
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