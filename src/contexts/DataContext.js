import React, { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";

const dataSources = ["cmip6", "cmip5"];

export const DataContext = createContext({
  data: {},
  stations: {},
  counties: [],
  virginiaCounties: [],
  dataSource: "",
  dataSources: [""],
  setDataSource: () => null,
  calculateColors: () => null
});

export const DataProvider = ({ children }) => {
  const [dataSource, setDataSource] = useState(dataSources[0]);
  const [data, setData] = useState({});
  const [stations, setStations] = useState({});
  const [counties, setCounties] = useState([]);
  const [virginiaCounties, setVirginiaCounties] = useState([]);

  useEffect(() => {
    (async () => {
      await Promise.all([
        fetch(`${process.env.PUBLIC_URL}/data/counties.json`)
          .then(response => response.json())
          .then(d => setCounties(d)),
        fetch(`${process.env.PUBLIC_URL}/data/virginiaCounties.json`)
          .then(response => response.json())
          .then(d => setVirginiaCounties(d)),
        fetch(`${process.env.PUBLIC_URL}/data/${dataSources[0]}/data.json`)
          .then(response => response.json())
          .then(d => setData(d)),
        fetch(`${process.env.PUBLIC_URL}/data/${dataSources[0]}/stations.json`)
          .then(response => response.json())
          .then(d => setStations(d))
      ]);
    })();
  }, []);

  const handleChangeDataSource = async (newDataSource) => {
    setDataSource(newDataSource);
    await Promise.all([
      fetch(`${process.env.PUBLIC_URL}/data/${newDataSource}/data.json`)
        .then(response => response.json())
        .then(d => setData(d)),
      fetch(`${process.env.PUBLIC_URL}/data/${newDataSource}/stations.json`)
        .then(response => response.json())
        .then(d => setStations(d))
    ]);
  };

  const value = {
    data,
    dataSource,
    dataSources,
    setDataSource: handleChangeDataSource,
    stations,
    counties,
    virginiaCounties
  };
  return (
    <DataContext.Provider value={value}>{children}</DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node,
};