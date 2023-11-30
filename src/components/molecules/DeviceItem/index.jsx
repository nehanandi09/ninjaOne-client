import { useState } from 'react';
import PropTypes from 'prop-types';

import DeleteModal from '../DeleteModal';
import DeviceModal from '../DeviceModal';
import {
  useDeleteDeviceMutation,
  useLazyFetchDevicesQuery,
  useUpdateDeviceMutation
} from '../../../state/services/device';
import { useOutsideClick } from '../../../hooks/outsideClick';

import { ReactComponent as WindowsIcon } from '../../../assets/windows.svg';
import { ReactComponent as MacIcon } from '../../../assets/mac.svg';
import { ReactComponent as LinuxIcon } from '../../../assets/linux.svg';
import { ReactComponent as ThreeDotsIcon } from '../../../assets/threeDots.svg';

import styles from './DeviceItem.module.scss';

const DeviceItem = ({ device, dataKey }) => {
  const [collapseOptions, setCollapseOptions] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [deleteDevice] = useDeleteDeviceMutation();
  const [updateDevice] = useUpdateDeviceMutation();

  const [fetchDevices] = useLazyFetchDevicesQuery();

  const handleClickOutside = () => setCollapseOptions(false);

  const ref = useOutsideClick(handleClickOutside, collapseOptions);

  const capitalizedType =
    device.type.charAt(0) + device.type.slice(1).toLowerCase();

  const handleCollapseMenu = () =>
    setCollapseOptions(!collapseOptions);

  const returnDeviceIcon = () => {
    switch (device.type) {
      case 'MAC':
        return <MacIcon />;
      case 'LINUX':
        return <LinuxIcon />;
      default:
        return <WindowsIcon />;
    }
  };

  /**
   * Handles the deletion of a device.
   * @param {string} id - The ID of the device to be deleted.
   */
  const handleDeleteDevice = async (id) => {
    try {
      await deleteDevice(id);
      fetchDevices();
      alert('Device deleted successfully');
      setDeleteModalOpen(false);
    } catch (error) {
      alert(`We were unable to delete the device! ${error}`);
    }
  };

  /**
   * Handles the update of a device.
   * @param {string} name - The updated system name of the device.
   * @param {string} type - The updated type of the device.
   * @param {string} hdd - The updated HDD capacity of the device.
   */
  const handleUpdateDevice = async (name, type, hdd) => {
    let deviceInfo = {
      system_name: name,
      type: type,
      hdd_capacity: hdd,
      id: device.id
    };
    try {
      await updateDevice(deviceInfo);
      await fetchDevices();
      alert(`Device ${name} updated successfully`);
      setEditModalOpen(false);
    } catch (error) {
      alert(`We were unable to update the device! ${error}`);
    }
  };

  return (
    <>
      <div
        data-key={dataKey}
        data-testid='device-item'
        className={styles.container}
      >
        <div className={styles.device}>
          <div className={styles.device__header}>
            {returnDeviceIcon()}
            {device.system_name}
          </div>
          <div className={styles.device__footer}>
            {`${capitalizedType} workstation - ${device.hdd_capacity} GB`}
          </div>
        </div>
        <div
          ref={ref}
          data-testid='device-menu-toggle'
          onClick={handleCollapseMenu}
          className={styles.container__options}
        >
          <ThreeDotsIcon />
          {collapseOptions && (
            <div
              data-testid='device-menu'
              className={styles.container__menu}
            >
              <button
                aria-label=''
                className={styles.container__menuItem}
                onClick={() => setEditModalOpen(true)}
              >
                Edit
              </button>
              <button
                className={styles.container__menuItem}
                onClick={() => setDeleteModalOpen(true)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      {deleteModalOpen && (
        <DeleteModal
          deviceName={device.system_name}
          onCancelClick={() => setDeleteModalOpen(false)}
          onDeleteClick={() => handleDeleteDevice(device.id)}
        />
      )}
      {editModalOpen && (
        <DeviceModal
          testId={'edit-modal'}
          device={device}
          onCancelClick={() => setEditModalOpen(false)}
          onSubmitClick={(name, type, hdd) =>
            handleUpdateDevice(name, type, hdd)
          }
        />
      )}
    </>
  );
};

DeviceItem.propTypes = {
  device: PropTypes.shape({
    id: PropTypes.number.isRequired,
    system_name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    hdd_capacity: PropTypes.number.isRequired
  }).isRequired,
  dataKey: PropTypes.string
};

export default DeviceItem;
