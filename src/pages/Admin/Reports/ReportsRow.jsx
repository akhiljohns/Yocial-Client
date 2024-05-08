import React, { useState } from "react";
import { convertDateTime } from "../../../hooks/timeAgo";

function ReportsRow({ report, index }) {
  const [isBlocked, setIsBlocked] = useState(false);
  const [actionTaken, setActionTaken] = useState(false);

  useEffect(() => {
    report.targetId.blocked ? setIsBlocked(true) : setIsBlocked(false);
    report.actionTaken ? setActionTaken(true) : setActionTaken(false);
  }, [report]);

  const handleBlock = () => {
    // Implement block functionality here
    setIsBlocked(true);
    blockPost(report.targetId._id)
      .then((response) => {
        toggelactiontaken(report._id)
          .then((res) => {
            setActionTaken(true);
            setIsBlocked(false);
          })
          .catch((err) => {
            errorToast(err);
          });
      })
      .catch((error) => {
        errorToast(error);
      });
  };

  return (
    <tr key={index} className="hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap">
        <img src={report.reportPostUrl} alt="Post" className="h-16 w-16" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{report.postOwner || ""}</td>
      <td className="px-6 py-4 whitespace-nowrap">{report.details}</td>
      <td className="px-6 py-4 whitespace-nowrap">{report.reporterUsername}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {convertDateTime(report.createdAt)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {!actionTaken ? (
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={handleBlock}
          >
            BLOCK
          </button>
        ) : (
          <span className="text-gray-500">Blocked</span>
        )}
      </td>
    </tr>
  );
}

export default ReportsRow;
