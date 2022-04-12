import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({children}) => {
  const [currency, setCurrency] = useState("CAD");
  const[symbol, setSymbol] = useState("$");

  useEffect(() => {
      if (currency === "CAD") setSymbol("C$");
      else if (currency === "USD") setSymbol("$");
      else if (currency === "GBP") setSymbol("£");
      else if (currency === "EUR") setSymbol("€");

      
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};



