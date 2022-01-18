import styled from "styled-components";

const TeamCardView = styled.div`
  display: flex;
  max-width: 1080px;
  width: 100%;

  margin-top: 40px;
`;
const SummonerInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  margin: 0 16px;
  align-items: center;
  padding: 16px;
  background: #31313d;
  color: #fff;
  min-height: 200px;
`;
const ChampionImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 100px;
  margin-bottom: 16px;
`;
const SummonerNameText = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
`;

export { TeamCardView, SummonerInfoCard, ChampionImage, SummonerNameText };
