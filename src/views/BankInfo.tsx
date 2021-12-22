import React, { useContext } from "react";
import { FaStar } from "react-icons/fa";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import { Info } from "../components";
import { DataContext } from "../context";
import { Bank } from "../types";

const BankInfo = () => {
  const { ifsc } = useParams<{ ifsc: string }>();

  const { data, toggleFavorite } = useContext(DataContext);

  if (!data) {
    return (
      <div className="w-full">
        <SkeletonTheme baseColor="#f9fafb" highlightColor="#f3f4f6">
          <div className="p-2 w-96">
            <Skeleton className="h-10" count={1} />
          </div>
          <div className="p-2 w-48">
            <Skeleton className="h-10" count={1} />
          </div>
          <div className="p-2 w-full">
            <Skeleton className="h-20 my-2" count={1} />
          </div>
          <div className="p-2 w-96">
            <Skeleton className="h-14 my-2" count={1} />
          </div>
        </SkeletonTheme>
      </div>
    );
  }

  const bank: Bank = data.find((bank) => bank.ifsc === ifsc)!;

  return (
    <div className="py-3 px-10 w-full">
      <div className="flex justify-between w-full items-center">
        <h2 className="text-xl text-primary font-medium">{bank?.bank_name}</h2>
        <div className="flex items-center">
          <FaStar
            className={`${
              bank?.isFavorite ? "text-yellow-300" : "text-gray-400"
            } mr-4 cursor-pointer hover:text-yellow-300 transition-all`}
            onClick={() => {
              toggleFavorite!(bank!);
            }}
            size={22}
          />
          <span className="flex items-center ">
            <p className="text-sm text-gray-600">Bank ID : </p>
            <h3 className="text-lg font-semibold text-primary ml-2">
              {bank?.bank_id}
            </h3>
          </span>
        </div>
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
