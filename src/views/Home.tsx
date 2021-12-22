import React, { useContext, useEffect } from "react";
import { Sidebar, Table } from "../components";
import { DataContext } from "../context";
import { fetchBankData } from "../helpers";

const Home = () => {
  const { setBankData } = useContext(DataContext);

  useEffect(() => {
    (async () => {
      const banks = await fetchBankData();
      if (setBankData) setBankData(banks);
    })();
  }, []);

  return (
    <React.Fragment>
      <main>
        <div className="max-w-6xl mx-auto py-8 sm:px-6 lg:px-8 flex">
          <Sidebar />
          <Table />
        </div>
      </main>
    </React.Fragment>
  );
};

export default Home;
