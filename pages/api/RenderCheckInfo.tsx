import { NextPage } from "next";
import { Perticipants, UserDamageInfo } from "src/interfaces";
import styled from "styled-components";
import { TeamCardView, SummonerInfoCard, ChampionImage, SummonerNameText } from "../../styles/searchNickname";
import { DealGraph } from "../api/DealGraph";

const ContCard = styled(SummonerInfoCard)`
  flex-direction: raw;
  min-height: 40px;
`;
const ContCardView = styled(TeamCardView)`
  margin-top: 16px;
  justify-content: center;
  align-items: center;
`;

type UserProps = {
  users: Perticipants[];
};

/// [key: string]: string | number;

export const RenderCheckInfo = ({ users }: UserProps) => {
  console.log(users);

  let userDamage: object[] = [];

  const renderUserKDA = users.map((user, i) => {
    userDamage[i] = { [user.championName]: user.totalDamageDealtToChampions };
    return (
      <ContCard>
        <div>
          {user.kills} / {user.deaths} / {user.assists}
        </div>
      </ContCard>
    );
  });

  return (
    <>
      <ContCardView>{renderUserKDA}</ContCardView>
      <div style={{ width: "1080px", height: "500px" }}>
        <DealGraph data={userDamage} />
      </div>
    </>
  );
};
