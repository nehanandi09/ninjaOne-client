# NinjaOne React Test

Hey guys! I've put everything I had in this project and I really hope that you like it!

### Prerequisites

Make sure you have the following software installed on your machine:

- Node.js (v12 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Navigate to the project directory `cd ninjaone-cliet`
3. Install dependencies `npm install`
4. Make sure that you have the backend server provided installed and running, and if the port that you are using is not :3000, simply the `baseurl` variable at the index.js file at `state/services/devices/`
5. Have fun.

## Neha's Implementation

### Bugs found

- The 'x' button in Sorting doesn't have the right functionality
- Searching through a filtered list displays items from outside the filter
- Clearing Search when there is a filter on displays all the items again
- The same as above happens with Sort, they're not synchronous
- Display the newly created items at top
- Display results as an alert on the UI instead of displaying an alert above
- Pagination
- Replace divs with meaningful buttons
- Implement i18n across for localisation
- Put filter, sort, search in their own components for reusability
- Rename files to cohesive names and export them in index.js instead of naming them index.js
- Improve hierearchy in text presented, H1 -> H2 -> H3 etc
- Create a component 'IconButton' for where only icon is used as a button
- Include focus styles for inputs, buttons
- Device Modal doesn't use a Form

### Changes made:

#### Accessibility Improvements

- Improved semantic text hierarchy for better readability and accessibility
- Replaced `<div>` with `<button>` elements
- Added `aria-label` attributes where needed

#### UI/UX
- Synchronized Search, Filter, and Sort functions for a smoother user experience
- Refactored `DeviceModal` component code for error removal and code quality enhancement
- Added a microinteraction for the 'x' button within modal dialogs
- Introduced focus states for input fields and buttons to enhance UI

#### Code Quality
- Employed 'required' attribute for input fields, eliminating redundant error messages
- Trimmed form white spaces; transformed `system_name` to uppercase before API submission. This ensures that data values stay consistent throughout.

### Further improvements that can be made

#### Code Improvements

- Create a dedicated reusable component for filtering instead of relying on SelectInput.
- Develop a separate component for sorting to enhance code reusability and maintainability.
- Create a centralized Input component that can configure various input types (radio, checkbox, select, multi-select, text field) for better code organization and consistency.
- Implement localization using i18n.

#### UI/UX improvements

- Newly created device can be displayed on top of the list instead of bottom of the list, they can be displayed based on created or added date.
- Implement pagination for the Device list to display a limited number of devices at a time. Consider fetching paginated items via API for better user experience and performance.
- Display number of devices on top, as a `Total Devices: x` which changes based on filter.
- Implement alert notifications for various device-related actions, such as editing, adding, or deleting a device. These alerts should dynamically respond to different states, providing informative feedback based on the success or failure of the corresponding queries.

#### Code Organization

- Move Type definitions to a dedicated folder to achieve a cleaner JSX file structure and improve code maintainability
- Ensure proper file naming conventions for JSX files in subfolders by avoiding the use of generic 'index.jsx' filenames.
