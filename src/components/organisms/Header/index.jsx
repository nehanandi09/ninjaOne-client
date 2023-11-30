import Logo from '../../atoms/Logo'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <div data-testid="header" className={styles.header}>
      <Logo />
    </div>
  )
}

export default Header