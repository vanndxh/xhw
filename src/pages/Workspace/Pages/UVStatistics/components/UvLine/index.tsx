import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  uvData: any;
}

function UvLine(props: Props) {
  const { uvData } = props;
  const [lineData, setLineData] = useState<any>();

  useEffect(() => {
    const res = Object.entries(uvData?.trend || {}).map((i) => {
      return {
        month: i[0],
        总访问量: i[1],
      };
    });
    setLineData(res);
  }, [uvData]);

  return (
    <LineChart
      width={300}
      height={150}
      data={lineData}
      style={{ paddingRight: 80 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="总访问量" stroke="#8884d8" />
    </LineChart>
  );
}
export default UvLine;
