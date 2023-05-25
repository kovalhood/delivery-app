import PropTypes from 'prop-types';
import s from './Label.module.scss';

const Label = ({ labelTitle, children}) => {
    return <label className={s.label}>
       <span className={s.label__text}>{labelTitle}</span>
        {children}
    </label>
}

Label.propTypes = {
    labelTitle: PropTypes.string.isRequired,
    children: PropTypes.node
}

export default Label;