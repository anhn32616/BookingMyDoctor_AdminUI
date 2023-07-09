

import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";

function EChart({ data }) {
  const { Title, Paragraph } = Typography;
  const dataRevenue = [
    {
      name: "Revenue",
      data: data,
      color: "#fff",
    },
  ]

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={dataRevenue}
          type="bar"
          height={400}
        />
        <div style={{marginTop: 8, textAlign: 'center'}}>
            <Title level={5}>Doctor revenue</Title>
        </div>
      </div>
    </>
  );
}

export default EChart;
