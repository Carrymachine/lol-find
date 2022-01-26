import { ResponsiveBar } from "@nivo/bar";
import { UserDamageInfo } from "src/interfaces";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

type UserProps = {
  data: UserDamageInfo[];
};

/// [key: string]: string | number;
const DealGraph = ({ data }: UserProps) => {
  const defTheme = {
    textColor: "#333333",
    fontSize: 16,
    grid: {
      line: {
        stroke: "#3C3A47",
        strokeWidth: 1,
      },
    },
  };
  console.log(data);
  const dataKeys = data.map((key: object) => {
    return key.championName;
  });
  console.log(dataKeys);
  return <ResponsiveBar data={data} keys={dataKeys} indexBy="championName" margin={{ top: 0, right: -90, bottom: 0, left: -80 }} padding={0.5} valueScale={{ type: "linear" }} colors={{ scheme: "greys" }} theme={defTheme} />;
};

export default DealGraph;
