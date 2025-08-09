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
    if (status === "Booked") return; // prevent click if booked
    dispatch(updateTable({ tableId: id, tableNo: name }));
    navigate("/menu");
  };

  return (
    <div
      onClick={handleClick}
      className="w-[300px] bg-[#262626] p-6 rounded-lg cursor-pointer hover:bg-[#2c2c2c] transition-colors flex flex-col justify-between"
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && handleClick()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[#f5f5f5] text-xl font-semibold flex items-center gap-2">
          Table {name} <FaLongArrowAltRight className="text-[#ababab]" />
        </h1>
        <p
          className={`px-3 py-1 rounded-lg font-semibold ${
            status === "Booked"
              ? "text-green-600 bg-[#2e4a40]"
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
