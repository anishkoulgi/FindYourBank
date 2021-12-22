import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Info } from "../components";
import { DataContext } from "../context";

const BankInfo = () => {
  const { ifsc } = useParams<{ ifsc: string }>();

  const { data } = useContext(DataContext);

  if (!data) {
    return <h1>Loading...</h1>;
  }

  const bank = data.find((bank) => bank.ifsc === ifsc);

  return (
    <div className="py-3 px-10 w-full">
      <div className="flex justify-between w-full items-center">
        <h2 className="text-xl text-primary font-medium">{bank?.bank_name}</h2>
        <span className="flex items-center ">
          <p className="text-sm text-gray-600">Bank ID : </p>
          <h3 className="text-lg font-semibold text-primary ml-2">
            {bank?.bank_id}
          </h3>
        </span>
      </div>
      <p className="inline-block mt-4 p-1 px-2 bg-lightPrimary text-primary font-semibold text-sm rounded-md">
        IFSC {bank?.ifsc}
      </p>
      <Info label="Branch" text={bank!.branch} />
      <Info label="Address" text={bank!.address} />
      <div className="flex">
        <Info label="City" text={bank!.city} />
        <Info label="District" className="ml-10" text={bank!.district} />
        <Info label="State" className="ml-10" text={bank!.state} />
      </div>
    </div>
  );
};

export default BankInfo;
