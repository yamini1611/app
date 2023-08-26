// Context.js
import React, { createContext, useContext, useState } from 'react';

const LocationLanguageContext = createContext();

export const useLocationLanguageContext = () => {
  return useContext(LocationLanguageContext);
};

export const Context = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState(new Set());

  const addLanguage = (language) => {
    setSelectedLanguages((prevLanguages) => new Set(prevLanguages).add(language));
  };

  const removeLanguage = (language) => {
    setSelectedLanguages((prevLanguages) => {
      const updatedLanguages = new Set(prevLanguages);
      updatedLanguages.delete(language);
      return updatedLanguages;
    });
  };

  const contextValue = {
    selectedLocation,
    setSelectedLocation,
    selectedLanguages: Array.from(selectedLanguages),
    addLanguage,
    removeLanguage,
  };

  return (
    <LocationLanguageContext.Provider value={contextValue}>
      {children}
    </LocationLanguageContext.Provider>
  );
};
