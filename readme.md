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

- Enhanced semantic text hierarchy for better accessibility and readability.
- Replaced `<div>` elements with `<button>` elements for improved accessibility
- Improved Search, Filter, and Sort to work synchronously
- Used 'required' in input fields and removed error messages
- Refactored code in DeviceModal to remove errors and improve code quality
- Fixed functionality for the 'x' button in Sort and Filter
- Added a micro interactiom with the 'x' button in modals.
- Added `aria-label` for icon buttons, input fields, and everywhere necessary
- Added focus states for input fields and to buttons
- Trimmed white spaces in forms, altered `system_name` to be posted to API after trimming and converting to uppercase

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

#### Code Organization

- Move Type definitions to a dedicated folder to achieve a cleaner JSX file structure and improve code maintainability
- Ensure proper file naming conventions for JSX files in subfolders by avoiding the use of generic 'index.jsx' filenames.
