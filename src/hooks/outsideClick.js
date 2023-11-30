import React from 'react';

/**
 * Custom hook that handles outside click detection.
 *
 * @param {function} callback - The callback function to be invoked when an outside click is detected.
 * @returns {object} - A ref object that can be attached to the component's DOM element.
 */
export const useOutsideClick = (callback) => {
  const ref = React.useRef();

  React.useEffect(() => {
    /**
     * Event handler for outside click.
     *
     * @param {object} event - The click event object.
     */
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return ref;
};
