import PropTypes from 'prop-types'

import {ReactComponent as SearchIcon} from '../../../assets/magnifyinGlass.svg'
import styles from './SearchBar.module.scss'

const SearchBar = ({ onChange }) => {
  return (
    <div data-testid="search-bar" className={styles.searchBar}>
      <SearchIcon />
      <input
        onChange={({ target }) => onChange(target.value)}
        placeholder='Search'
      />
    </div>
  )
}

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
}

SearchBar.defaultProps = {
  onChange: () => {}
};

export default SearchBar