import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const getHardcodedSuggestions = () => {
    return [
      { value: "32.2396 77.1887", label: "Manali, India" },
      { value: "26.9124 75.7873", label: "Jaipur, India" }, // Rajasthan
      { value: "18.5204 73.8567", label: "Mumbai, India" }, // Maharashtra
      { value: "12.9716 77.5946", label: "Bengaluru, India" }, // Karnataka
      { value: "22.5726 88.3639", label: "Kolkata, India" }, // West Bengal
      { value: "25.3176 82.9739", label: "Varanasi, India" }, // Uttar Pradesh
      { value: "33.6844 73.0479", label: "Islamabad, Pakistan" },
      { value: "33.6844 73.0479", label: "Karachi, Pakistan" },
      { value: "30.0444 31.2357", label: "Cairo, Egypt" },
      { value: "48.8566 2.3522", label: "Paris, France" },
      { value: "51.5074 -0.1278", label: "London, UK" },
      { value: "-33.8688 151.2093", label: "Sydney, Australia" },
      { value: "-22.9068 -43.1729", label: "Rio de Janeiro, Brazil" },
    ];
  };
  const loadOptions = (inputValue) => {
    if (!inputValue) {
      return { options: getHardcodedSuggestions() };
    }

    return fetch(
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name} ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      className="text-black"
      placeholder="Search for city"
      debounceTimeout={333}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      styles={{
        menu: (provided) => ({
          ...provided,
          zIndex: 1000,
        }),
      }}
    />
  );
};

export default Search;
