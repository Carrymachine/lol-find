import { NextPage } from "next";
import { Perticipants, UserDamageInfo } from "src/interfaces";
import styled from "styled-components";
import { TeamCardView, SummonerInfoCard, ChampionImage, SummonerNameText } from "../../styles/searchNickname";
import dynamic from "next/dynamic";
const DealGraph = dynamic(() => import("../api/DealGraph"), { ssr: false });

const ContCard = styled(SummonerInfoCard)`
  flex-direction: raw;
  min-height: 40px;
`;
const ContCardView = styled(TeamCardView)`
  margin-top: 16px;
  justify-content: center;
  align-items: center;
`;

const GraphWrap = styled(TeamCardView)`
  width: 100%;
  max-width: 1080px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0 0 0;
`;

interface Ivalue {
  value: number;
}

const KdaText = styled.div<Ivalue>`
  font-weight: 500;
  color: ${(props) => (props.value <= 1 ? "#979797" : props.value <= 2 ? "#F05D5D" : props.value <= 3 ? "#4BC190" : props.value <= 3 ? "#37A7D8" : props.value <= 4 ? "#F9D144" : props.value <= 5 ? "#E231FF" : "#E231FF")};
`;

type UserProps = {
  users: Perticipants[];
};

/// [key: string]: string | number;

export const RenderCheckInfo = ({ users }: UserProps) => {
  console.log(users);

  let userDamage: object[] = [];

  const renderUserKDA = users.map((user, i) => {
    userDamage[i] = { championName: user.championName, [user.championName]: user.totalDamageDealtToChampions };
    const kda = ((user.kills + user.assists) / user.deaths).toFixed(2);
    return (
      <>
        <ContCard>
          {user.kills} / {user.deaths} / {user.assists}
          <KdaText value={kda}>{kda} : 1</KdaText>
        </ContCard>
      </>
    );
  });

  return (
    <>
      <ContCardView>{renderUserKDA}</ContCardView>
      <GraphWrap>
        <ContCard>
          <DealGraph data={userDamage} />
        </ContCard>
      </GraphWrap>
    </>
  );
};
