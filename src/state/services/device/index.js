import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/**
 * Device API configuration.
 */
export const deviceApi = createApi({
  reducerPath: 'deviceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    /**
     * Fetches the list of devices.
     */
    fetchDevices: builder.query({
      query: () => `devices`,
    }),
    /**
     * Creates a new device.
     * @param {object} data - The data for the new device (system_name, type, hdd_capacity).
     */
    createDevice: builder.mutation({
      query: ({ system_name, type, hdd_capacity }) => (
        {
        url: `devices`,
        method: 'POST',
        body: { system_name, type, hdd_capacity },
      }),
    }),
    /**
     * Updates an existing device.
     * @param {object} data - The data for the device update (system_name, type, hdd_capacity, id).
     */
    updateDevice: builder.mutation({
      query: ({ system_name, type, hdd_capacity, id }) => (
        {
        url: `devices/${id}`,
        method: 'PUT',
        body: { system_name, type, hdd_capacity },
      }),
    }),
    /**
     * Deletes a device.
     * @param {string} id - The ID of the device to be deleted.
     */
    deleteDevice: builder.mutation({
      query: (id) => (
        {
        url: `devices/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})


export const {
  useLazyFetchDevicesQuery, 
  useCreateDeviceMutation,
  useUpdateDeviceMutation,
  useDeleteDeviceMutation,
} = deviceApi