import GB from 'country-flag-icons/react/3x2/GB';
import FR from 'country-flag-icons/react/3x2/FR';
import DE from 'country-flag-icons/react/3x2/DE';
import US from 'country-flag-icons/react/3x2/US';
import IN from 'country-flag-icons/react/3x2/IN';

const flagComponentsMap = {
  GB: GB,
  FR: FR,
  DE: DE,
  US: US,
  IN: IN,
  // Add other flag codes and their imported components here if we expand our languages list
};

export const languages = [
    { label: "English UK", value: "en-GB", flagCode: "GB" },
    { label: "French", value: "fr", flagCode: "FR" },
    { label: "German", value: "de", flagCode: "DE" },
    { label: "English US", value: "en-US", flagCode: "US" },
    { label: "Hindi", value: "hi", flagCode: "IN" }
];

export { flagComponentsMap };