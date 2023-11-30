import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Button from '../../atoms/Button'
import SelectInput from '../SelectInput'

import {ReactComponent as CrossIcon} from '../../../assets/cross.svg'

import styles from './DeviceModal.module.scss'

const DeviceModal = ({ onCancelClick, onSubmitClick, device, testId }) => {
  const [name, setName] = useState(device?.system_name || '')
  const [type, setType] = useState(device?.type ||'')
  const [capacity, setCapacity] = useState(device?.hdd_capacity || '')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {document.body.style.overflow = 'scroll'}
  }, [])

  return (
    <div data-testid={testId} className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>
            {device ? 'Edit device' : 'Add device'}
          </h2>
          <button
            aria-label='Close modal'
            className={styles.modal__close}
            onClick={onCancelClick}
          >
            <CrossIcon className={styles.modal__closeIcon} />
          </button>
        </div>
        <div className={styles.modal__form}>
          <div className={styles.modal__form_group}>
            <label>System name *</label>
            <input
              value={name}
              data-testid={'name-input'}
              onChange={({target}) => setName(target.value)}
              aria-label="System name"
            />
            {!name && <small>This field is required!</small>}
          </div>
          <div className={styles.modal__form_group}>
            <label>Device type *</label>
            <SelectInput
              testId={'type-input'}
              onChange={({ value }) => setType(value)}
              value={type}
              aria-label="Device type"
              options={[
                {
                  label: 'Selected device',
                  value: '',
                  isDisabled: true
                },
                {
                  label: 'Windows',
                  value: 'WINDOWS'
                },
                {
                  label: 'Mac',
                  value: 'MAC'
                },
                {
                  label: 'Linux',
                  value: 'LINUX'
                }
              ]}
            />
            {!type && <small>This field is required!</small>}
          </div>
          <div className={styles.modal__form_group}>
            <label>HDD capacity (GB) *</label>
            <input
              value={capacity}
              data-testid={'capacity-input'}
              onChange={({target}) => setCapacity(target.value)}
              type='number'
            />
            {!capacity && <small>This field is required!</small>}
          </div>
        </div>
        <div className={styles.modal__buttons}>
          <Button
            testId={'cancel-button'}
            onClick={onCancelClick}
            text={'Cancel'}
            variant={'secondary'}
          />
          <Button
            testId={'submit-button'}
            isDisabled={!(
              name.length > 0 &&
              type.length> 0 &&
              capacity.length > 0
            )}
            onClick={() => onSubmitClick(name, type, capacity)}
            text={'Submit'}
            variant={'primary'}
          />
        </div>
      </div>
    </div>
  )
}


DeviceModal.propTypes = {
  onCancelClick: PropTypes.func.isRequired,
  onSubmitClick: PropTypes.func.isRequired,
  device: PropTypes.shape({
    system_name: PropTypes.string,
    type: PropTypes.string,
    hdd_capacity: PropTypes.string
  }),
  testId: PropTypes.string,
}

export default DeviceModal