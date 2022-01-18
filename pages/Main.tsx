import type { NextPage } from "next";
import styled from "styled-components";
import { GetSummonerName } from "../src/GetSummonerName";

const MainLogoText = styled.p`
  margin: 0;
  font-size: 60px;
  font-family: "Gugi", cursive;
`;

export const Main: NextPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", justifyContent: "center" }}>
      <MainLogoText>누범</MainLogoText>
      <GetSummonerName />
    </div>
  );
};
