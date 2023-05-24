import PropTypes from 'prop-types';
import s from './InputText.module.scss';

const InputText = ({ input, name, onNameChange}) => {
    return <input
      type="text"
      name={input}
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      required
      placeholder='Enter name'
      value={name}
      onChange={onNameChange}
      className={s.input}
    />
}

InputText.propTypes = {
  name: PropTypes.string.isRequired,
}

export default InputText;