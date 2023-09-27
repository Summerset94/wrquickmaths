import React, { createContext, useContext, useState } from 'react';

const StatsContext = createContext();

export const StatsProvider = ({ children }) => {
  const [totalStats, setTotalStats] = useState([{}, {}]); // Initialize with two empty objects
  return (
    <StatsContext.Provider value={{ totalStats, setTotalStats }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};
