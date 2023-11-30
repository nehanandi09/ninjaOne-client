import PropTypes from 'prop-types';
import DeviceItem from '../../molecules/DeviceItem';

import styles from './DeviceList.module.scss';

const DeviceList = ({ title, devicesList }) => {
  return (
    <div className={styles.devicesList}>
      <div className={styles.devicesList__header}>
        <h2 className={styles.devicesList__title}>{title}</h2>
      </div>
      {devicesList &&
        devicesList.map((device) => {
          return (
            <DeviceItem
              dataKey={device.id}
              key={device.id}
              device={device}
            />
          );
        })}
    </div>
  );
};

DeviceList.propTypes = {
  title: PropTypes.string.isRequired,
  devicesList: PropTypes.arrayOf(PropTypes.object)
};

export default DeviceList;
