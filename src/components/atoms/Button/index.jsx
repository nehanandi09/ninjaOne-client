import PropTypes from 'prop-types'
import { ReactComponent as PlusSrc } from '../../../assets/plus.svg'

import styles from './Button.module.scss'

// Object mapping variant names to classnames
const variantClassNames = {
  primary: styles['button--primary'],
  secondary: styles['button--secondary'],
  danger: styles['button--danger'],
}

const Button = ({
  text,
  variant,
  icon,
  onClick,
  testId,
  isDisabled = false,
}) => {

  // Compose the button's classnames based on props passed
  const buttonClassName = `
    ${styles.button}
    ${variantClassNames[variant] || ''}
    ${isDisabled ? styles['button--disabled'] : ''}
  `

  return (
    <button
      data-testid={testId}
      disabled={isDisabled}
      onClick={onClick}
      className={buttonClassName}
    >
      {icon && <PlusSrc className={styles.icon}/>}
      <span className={styles.button__text}>{text}</span>
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  testId: PropTypes.string,
}

export default Button