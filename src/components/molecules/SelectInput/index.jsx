import PropTypes from 'prop-types';
import Select from 'react-select';
import { isMobile } from 'react-device-detect';
import { useState } from 'react';

import { ReactComponent as ArrowIcon } from '../../../assets/chevronDown.svg';

import styles from './SelectInput.module.scss';

const SelectInput = ({
  label,
  options,
  onChange,
  value,
  testId,
  isMulti
}) => {
  /**
   * Custom styles for the react-select component.
   */
  const customStyles = {
    container: (provided) => ({
      ...provided,
      flex: 1
    }),
    control: (provided) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      width: '100%',
      '@media only screen and (min-width: 1000px)': {
        ...styles['@media only screen and (max-width: 1200px)'],
        minWidth: 220
      }
    }),
    indicatorSeparator: () => ({
      display: 'none'
    })
  };

  // Add focus state to add CSS class
  const [focus, setFocus] = useState(false);

  const DropdownIndicator = () => <ArrowIcon />;

  return (
    <>
      {label && isMobile && (
        <label htmlFor='select-option' className={styles.outterLabel}>
          {label}
        </label>
      )}
      <div
        className={`${styles.selectContainer} ${
          focus ? styles.focusContainer : ''
        }`}
        data-testid={testId}
      >
        {label && !isMobile && (
          <label
            htmlFor='select-option'
            className={styles.innerLabel}
          >
            {label}:
          </label>
        )}
        <Select
          isClearable={!isMobile}
          isSearchable={false}
          isMulti={isMulti}
          styles={customStyles}
          components={{ DropdownIndicator }}
          options={options}
          onChange={onChange}
          defaultValue={options.find(
            (option) => option.value === value
          )}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </div>
    </>
  );
};

SelectInput.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any,
      isDisabled: PropTypes.bool
    })
  ),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  testId: PropTypes.string,
  isMulti: PropTypes.bool
};

export default SelectInput;
