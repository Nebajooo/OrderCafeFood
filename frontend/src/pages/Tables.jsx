import React, { useState, useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTables } from "../https";
import { enqueueSnackbar } from "notistack";

const Tables = () => {
  const [status, setStatus] = useState("all");

  useEffect(() => {
    document.title = "POS | Tables";
  }, []);

  const {
    data: resData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => getTables(),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  }, [isError]);

  if (isLoading) {
    return (
      <section className="flex items-center justify-center h-[calc(100vh-5rem)] bg-[#1f1f1f]">
        <p className="text-white text-xl">Loading tables...</p>
      </section>
    );
  }

  const filteredTables = resData?.data.data.filter((table) =>
    status === "all"
      ? true
      : table.status.toLowerCase() === status.toLowerCase()
  );

  return (
    <section className="bg-[#1f1f1f] min-h-[calc(100vh-5rem)] overflow-hidden px-6 md:px-16">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
            Tables
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {["all", "booked"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`text-[#ababab] text-lg rounded-lg px-5 py-2 font-semibold ${
                status === s ? "bg-[#383838]" : ""
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-4 h-[650px] overflow-y-scroll scrollbar-hide">
        {filteredTables?.length > 0 ? (
          filteredTables.map((table) => (
            <TableCard
              key={table._id}
              id={table._id}
              name={table.tableNo}
              status={table.status}
              initials={table?.currentOrder?.customerDetails?.name}
              seats={table.seats}
            />
          ))
        ) : (
          <p className="col-span-full text-gray-500 text-center">
            No tables available
          </p>
        )}
      </div>

      <BottomNav />
    </section>
  );
};

export default Tables;
