import React, { useState } from "react";
import { convertDateTime } from "../../../hooks/timeAgo";

function ReportsRow({ report, index }) {
  return (
    <>
      <tr key={index} className="hover:bg-gray-100">
        <td className="px-6 py-4 whitespace-nowrap">
          <img src={report.reportPostUrl} alt="Post" className="h-16 w-16" />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{report.actionTaken.toString()}</td>
        <td className="px-6 py-4 whitespace-nowrap">{report.reason}</td>
        <td className="px-6 py-4 whitespace-nowrap">{report.details}</td>
        <td className="px-6 py-4 whitespace-nowrap">
        {report.reporterUsername}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {convertDateTime(report.createdAt)}
        </td>
      </tr>
    </>
  );
}

export default ReportsRow;
