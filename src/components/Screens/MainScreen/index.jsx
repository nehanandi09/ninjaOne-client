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
  // Store text used for search
  const [searchText, setSearchText] = useState('');
  // Store selected filter types
  const [filterOption, setFilterOption] = useState([]);
  // Store sorting value
  const [sortOption, setSortOption] = useState([]);

  const [fetchDevices, { data: devices }] =
    useLazyFetchDevicesQuery();

  const [createDevice] = useCreateDeviceMutation();

  useEffect(() => {
    // Run on mounted
    fetchDevices();

    if (devices) {
      setFilteredList(devices);
    }
  }, []);

  useEffect(() => {
    let filteredDevices = devices;

    // Filter devices based on search
    if (searchText) {
      filteredDevices = filteredDevices.filter((device) =>
        device.system_name
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }

    // Filter devices based on Device Type
    if (filterOption.length > 0 && !filterOption.includes('ALL')) {
      filteredDevices = filteredDevices.filter((device) =>
        filterOption.includes(device.type)
      );
    }

    // Sort devices list
    if (sortOption && devices) {
      let sortedList = [...filteredDevices];

      // Destrucutre to retrie value
      const { label, value: field } = sortOption;
      filteredDevices = sortedList.sort(dynamicSort[field]);
    }

    setFilteredList(filteredDevices);
  }, [devices, searchText, filterOption, sortOption]);

  // To assist with sorting
  const dynamicSort = {
    'HDD-DESC': (a, b) =>
      parseInt(b.hdd_capacity) - parseInt(a.hdd_capacity),
    'HDD-ASC': (a, b) =>
      parseInt(a.hdd_capacity) - parseInt(b.hdd_capacity),
    'NAME-ASC': (a, b) => a.system_name.localeCompare(b.system_name),
    'NAME-DESC': (a, b) => b.system_name.localeCompare(a.system_name)
  };

  /**
   * Handles the search functionality by filtering the devices based on the provided value.
   *
   * @param {string} searchValue - The search value entered by the user.
   */
  const handleSearch = (searchValue) => {
    setSearchText(searchValue);
  };

  /**
   * Handles the filtering of devices based on the selected device types.
   *
   * @param {Array} selectedOptions - The selected device types.
   * Example: [ { label: 'Windows', value: 'WINDOWS' } ]
   */

  const handleDeviceFilter = (selectedOptions) => {
    // Extract only value
    setFilterOption(selectedOptions.map((option) => option.value));
  };

  /**
   * Handles the sorting of the filtered devices list based on the selected sort option.
   *
   * @param {object} sortOption - The selected sort option.
   * Example: {label: 'HDD Capacity Descending', value: 'HDD-DESC'}
   */

  const handleSortList = (sortOption) => {
    setSortOption(sortOption);
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
      system_name: name.trim().toUpperCase(),
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

  const handleRefresh = () => {
    alert('refreshing devices list');
    fetchDevices();
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.contentWrapper}>
        <div className={styles.topContainer}>
          <h1 className={styles.topContainer__title}>Devices</h1>
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
            testId='sort-select'
            label='Sort by'
            options={sortOptions}
            onChange={handleSortList}
          />
          <button
            aria-label='Refresh'
            className={styles.filtersBar__refreshContainer}
            onClick={handleRefresh}
          >
            <RefreshIcon
              data-testid='refresh-icon'
              className={styles.filtersBar__refresh}
            />
          </button>
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
