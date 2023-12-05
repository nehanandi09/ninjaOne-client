import PropTypes from 'prop-types';
import { useState } from 'react';
import { ReactComponent as SearchIcon } from '../../../assets/magnifyinGlass.svg';
import styles from './SearchBar.module.scss';

const SearchBar = ({ onChange }) => {
  // isFocused state to toggle isFocused style
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      data-testid='search-bar'
      className={`${styles.searchBar} ${
        isFocused ? 'focusContainer' : ''
      }`}
    >
      <SearchIcon />
      <input
        onChange={({ target }) => onChange(target.value.trim())}
        placeholder='Search'
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired
};

SearchBar.defaultProps = {
  onChange: () => {}
};

export default SearchBar;
