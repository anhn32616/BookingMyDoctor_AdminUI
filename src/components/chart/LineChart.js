

import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import lineChart from "./configs/lineChart";

function LineChart({ data }) {
  const { Title } = Typography;
  const dataRevenue = [
    {
      name: "Revenue",
      data: data,
    },
  ]

  return (
    <>
      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={dataRevenue}
        type="line"
        height={400}
        width={"100%"}
      />
      <div style={{ marginTop: 8, textAlign: 'center' }}>
        <Title level={5}>Company revenue</Title>
      </div>
    </>
  );
}

export default LineChart;
