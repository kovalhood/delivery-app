import PropTypes from 'prop-types';
import s from './InputNumber.module.scss';

const InputNumber = ({ number, onNumberChange, onNumberKeyPress}) => {
    return <input
      type="number"
      name="number"
      pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
      title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
      required
      placeholder='Enter number'
      value={number}
      onChange={onNumberChange}
      onKeyDown={onNumberKeyPress}
      className={s.input}
    />
}

InputNumber.propTypes = {
  number: PropTypes.string.isRequired
}

export default InputNumber;