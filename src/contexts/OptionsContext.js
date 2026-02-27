import React, { useState, useContext, createContext } from "react";
import PropTypes from "prop-types";

import { DataContext } from "./DataContext";

export const OptionsContext = createContext({
  options: {},
  setOptions: () => null
});

export const OptionsProvider = ({ children }) => {
  const [cmip5emission, setCmip5emission] = useState("4.5");
  const [cmip6emission, setCmip6emission] = useState("245");
  const [tp, setTp] = useState("2020-2070");
  const [rp, setRp] = useState("2");
  const [area, setArea] = useState("both");

  const { dataSource } = useContext(DataContext);

  const setOptions = (newOptions) => {
    setTp(newOptions["tp"]);
    setRp(newOptions["rp"]);
    setArea(newOptions["area"]);
    if (dataSource === "cmip5") {
      setCmip5emission(String(newOptions["emission"]));
    } else {
      setCmip6emission(String(newOptions["emission"]));
    }
  };

  const value = {
    options: {
      emission: dataSource === "cmip5" ? cmip5emission : cmip6emission,
      tp,
      rp,
      area
    },
    setOptions
  };
  return (
    <OptionsContext.Provider value={value}>{children}</OptionsContext.Provider>
  );
};

OptionsProvider.propTypes = {
  children: PropTypes.node,
};