import { NextPage } from "next";
import styled from "styled-components";
import { useRecoilState, useRecoilValueLoadable, useRecoilValue } from "recoil";
import { getSummonerInfo, getSummonerName, getChamiponsList } from "src/riotApi";
import { useRouter } from "next/router";
import { MatchInfo, Perticipants } from "src/interfaces";

import { useEffect } from "react";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";

const TeamCardView = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;
const SummonerInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  margin: 0 16px;
  align-items: center;
  padding: 16px;
`;
const ChampionImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 100px;
`;

const ViewSummonerMatch: NextPage = () => {
  const router = useRouter();
  const { summonerName }: string = router.query;
  console.log(summonerName);
  const [typedName, setName] = useRecoilState<string>(getSummonerName);

  useEffect(() => {
    setName(summonerName);
  }, [summonerName]);
  const { contents } = useRecoilValueLoadable(getSummonerInfo);
  const { info, metadata } = contents;
  const url = "http://ddragon.leagueoflegends.com/cdn/12.1.1/img/champion";
  const summonerName2 = useRecoilValue(getSummonerName);
  // const champions = useRecoilValueLoadable(getChamiponsList);
  // console.log(champions);

  //0~4 블루 5~9 퍼플

  const searchedSummonerInfo: Perticipants[] = (info ? info.participants : []).filter((players: Perticipants) => players.summonerName === summonerName2);

  const findSearchedSummonersTeam: Perticipants[] = (info ? info.participants : []).filter((players: Perticipants) => players.win === searchedSummonerInfo[0].win);
  console.log(findSearchedSummonersTeam);

  const renderSameTeam = findSearchedSummonersTeam.map((players: Perticipants) => {
    return (
      <SummonerInfoCard>
        <ChampionImage src={`${url}/${players.championName}.png`} alt="#" />
        {players.summonerName}

        <div>
          {players.kills} / {players.deaths} / {players.assists}
        </div>
      </SummonerInfoCard>
    );
  });

  return <TeamCardView>{renderSameTeam}</TeamCardView>;
};

export default ViewSummonerMatch;
