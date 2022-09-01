import React, { useEffect, useState } from "react";
import { PAGE_LIST, PAGE_LIST_KEY } from "../../constants";
import { Cell, Pie, PieChart } from "recharts";

interface Props {
  uvData: any;
}

function UvPie(props: Props) {
  const { uvData } = props;
  const [pieData, setPieData] = useState<any>();

  useEffect(() => {
    const tempData: any = [
      PAGE_LIST_KEY.HOME,
      PAGE_LIST_KEY.GENSHIN,
      PAGE_LIST_KEY.WEB,
    ].map((p) => ({
      name: PAGE_LIST[p]?.name,
      value: uvData?.[p],
    }));
    setPieData(tempData);
  }, [uvData]);

  const COLORS = ["#f4baba", "#a48ad4", "#91e1dd", "#e0cd84"];

  return (
    <PieChart width={280} height={200} style={{ paddingRight: 60 }}>
      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        minAngle={15}
        outerRadius={60}
        label={(i) => {
          return `${i.name} ${i.value}`;
        }}>
        {pieData?.map((entry: any, index: any) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
    </PieChart>
  );
}
export default UvPie;
