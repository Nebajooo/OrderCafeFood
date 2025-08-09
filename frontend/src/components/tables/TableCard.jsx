import React from "react";
import { useNavigate } from "react-router-dom";
import { getAvatarName, getBgColor } from "../../utils";
import { useDispatch } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlice";
import { FaLongArrowAltRight } from "react-icons/fa";

const TableCard = ({ id, name, status, initials, seats }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (status.toLowerCase() === "booked") return;
    dispatch(updateTable({ tableId: id, tableNo: name }));
    navigate("/menu");
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full bg-[#262626] p-6 rounded-lg transition-colors flex flex-col justify-between
        ${
          status.toLowerCase() === "booked"
            ? "cursor-not-allowed opacity-70"
            : "cursor-pointer hover:bg-[#2c2c2c]"
        }
      `}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      aria-disabled={status.toLowerCase() === "booked"}
      aria-label={`Table ${name}, status ${status}, seats ${seats}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[#f5f5f5] text-xl font-semibold flex items-center gap-2">
          Table {name} <FaLongArrowAltRight className="text-[#ababab]" />
        </h1>
        <p
          className={`px-3 py-1 rounded-lg font-semibold ${
            status.toLowerCase() === "booked"
              ? "text-red-600 bg-[#4a1a1a]"
              : "bg-[#664a04] text-white"
          }`}
        >
          {status}
        </p>
      </div>

      {/* Avatar */}
      <div className="flex items-center justify-center mb-6">
        <div
          className="text-white rounded-full p-7 text-2xl flex items-center justify-center"
          style={{
            backgroundColor: initials ? getBgColor(initials) : "#1f1f1f",
          }}
        >
          {getAvatarName(initials) || "N/A"}
        </div>
      </div>

      {/* Footer */}
      <p className="text-[#ababab] text-sm text-center">
        Seats: <span className="text-[#f5f5f5] font-semibold">{seats}</span>
      </p>
    </div>
  );
};

export default TableCard;
