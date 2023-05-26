import Skeleton from 'react-loading-skeleton';
import s from './ListItemSkeleton.module.scss';

const ListItemSkeleton = ({amountOfItems}) => {
    return <ul className={s.menu}>
        {
            amountOfItems.map((item) => (
                <li key={item} className={s.menu__item}>
                    <div className={s.menu__image_wrapper}>
                            <Skeleton count={1} width="100%" height="100%" />
                    </div>
                    
                    <div className={s.menu__wrapper}>
                        <div className={s.menu__text_wrapper}>
                            <Skeleton count={1} width={150} />
                            <Skeleton count={1} width={80} />
                        </div>
                    </div>
                </li>
            ))
        }
    </ul>
}

export default ListItemSkeleton;