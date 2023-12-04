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

### Changes made:

- Improved hierarchy for text to follow accessibility guidelines
- Replaced divs with Buttons where possible for a11y reasons
- Improved Search, Filter, and Sort to work synchronously

### Further improvements that can be made

- Isolate the Filter functionality into its own reusable component instead of using SelectInput
- Create a separate Sort component to facilitate reuse and maintainability
- Move type definitions to a dedicated folder for a cleaner JSX file structure.
