import PropTypes from 'prop-types';
import styles from './Select.module.css';

function Select({ text, name, value, onChange, options }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <select name={name} id={name} value={value} onChange={onChange}>
                <option value="">Selecione uma categoria</option>
                {options && options.map((option) => (
                    <option key={String(option.value)} value={String(option.value)}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

Select.propTypes = {
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired
};

export default Select;
