import { useEffect, useState } from 'react';

import Button from '../../atoms/Button';
import SearchBar from '../../atoms/SearchBar';
import SelectInput from '../../molecules/SelectInput';
import Header from '../../organisms/Header';
import DeviceList from '../../organisms/DeviceList';
import DeviceModal from '../../molecules/DeviceModal';

import {
  useCreateDeviceMutation,
  useLazyFetchDevicesQuery
} from '../../../state/services/device';

import { ReactComponent as RefreshIcon } from '../../../assets/refresh.svg';

import styles from './MainScreen.module.scss';

const typeOptions = [
  {
    label: 'All',
    value: 'ALL'
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
];

const sortOptions = [
  {
    label: 'Select',
    value: '',
    isDisabled: true
  },
  {
    label: 'HDD Capacity Descending',
    value: 'HDD-DESC'
  },
  {
    label: 'HDD Capacity Ascending',
    value: 'HDD-ASC'
  },
  {
    label: 'Name Ascending',
    value: 'NAME-ASC'
  },
  {
    label: 'Name Descending',
    value: 'NAME-DESC'
  }
];

const MainScreen = () => {
  const [deviceModalOpen, setDeviceModalOpen] = useState(false);
  const [filteredList, setFilteredList] = useState([]);

  const [fetchDevices, { data: devices }] =
    useLazyFetchDevicesQuery();

  const [createDevice] = useCreateDeviceMutation();

  useEffect(() => {
    fetchDevices();
    if (devices) {
      setFilteredList(devices);
    }
  }, [devices, fetchDevices]);

  /**
   * Handles the search functionality by filtering the devices based on the provided value.
   *
   * @param {string} value - The search value entered by the user.
   */
  const handleSearch = (value) => {
    let newList = devices.filter((device) => {
      let deviceName = device.system_name.toLowerCase();
      return deviceName.includes(value.toLowerCase());
    });

    setFilteredList(newList);
  };

  /**
   * Handles the submission of the device modal form to create a new device.
   *
   * @param {string} name - The system name of the device.
   * @param {string} type - The type of the device.
   * @param {string} capacity - The HDD capacity of the device.
   */
  const handleSubmitModal = async (name, type, capacity) => {
    const newDevice = {
      system_name: name,
      type: type,
      hdd_capacity: capacity
    };

    try {
      await createDevice(newDevice);
      await fetchDevices();
      alert(`Device ${name} created successfully!`);
      setDeviceModalOpen(false);
    } catch (error) {
      alert(`We were unable to create the device. ${error}!`);
    }
  };

  /**
   * Handles the filtering of devices based on the selected device types.
   *
   * @param {Array} values - The selected device types.
   */
  const handleDeviceFilter = (values) => {
    if (
      values.some((item) => item.value === 'ALL') ||
      !values.length
    ) {
      setFilteredList(devices);
    } else {
      const filteredList = devices.filter((device) =>
        values.some((item) => item.value === device.type)
      );
      setFilteredList(filteredList);
    }
  };

  const handleRefresh = () => {
    alert('refreshing devices list');
    fetchDevices();
  };

  /**
   * Handles the sorting of the filtered devices list based on the selected sort option.
   *
   * @param {string} sort - The selected sort option.
   */
  const handleSortList = (sort) => {
    let sortedList = [...filteredList];

    const sortComparators = {
      'HDD-DESC': (a, b) =>
        parseInt(b.hdd_capacity) - parseInt(a.hdd_capacity),
      'HDD-ASC': (a, b) =>
        parseInt(a.hdd_capacity) - parseInt(b.hdd_capacity),
      'NAME-ASC': (a, b) =>
        a.system_name.localeCompare(b.system_name),
      'NAME-DESC': (a, b) =>
        b.system_name.localeCompare(a.system_name)
    };

    sortedList.sort(sortComparators[sort]);

    setFilteredList(sortedList);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.contentWrapper}>
        <div className={styles.topContainer}>
          <span className={styles.topContainer__title}>Devices</span>
          <Button
            testId={'add-button'}
            icon={'plus'}
            onClick={() => setDeviceModalOpen(true)}
            text={'Add device'}
            variant='primary'
          />
        </div>
        <div className={styles.filtersBar}>
          <SearchBar onChange={handleSearch} />
          <SelectInput
            isMulti={true}
            testId='type-select'
            label='Device Type'
            options={typeOptions}
            onChange={handleDeviceFilter}
          />
          <SelectInput
            value={''}
            testId='sort-select'
            label='Sort by'
            options={sortOptions}
            onChange={({ value }) => handleSortList(value)}
          />
          <div
            className={styles.filtersBar__refreshContainer}
            onClick={handleRefresh}
          >
            <RefreshIcon
              data-testid='refresh-icon'
              className={styles.filtersBar__refresh}
            />
          </div>
        </div>
        <DeviceList devicesList={filteredList} title={'Devices'} />
      </div>
      {deviceModalOpen && (
        <DeviceModal
          testId={'device-modal'}
          onCancelClick={() => setDeviceModalOpen(false)}
          onSubmitClick={(name, type, capacity) =>
            handleSubmitModal(name, type, capacity)
          }
        />
      )}
    </div>
  );
};

export default MainScreen;
