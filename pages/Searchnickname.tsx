import { NextPage } from "next";
import styled from "styled-components";
import { useRecoilState, useRecoilValueLoadable, useRecoilValue } from "recoil";
import { getSummonerInfo, getSummonerName, getChamiponsList } from "src/riotApi";
import { useRouter } from "next/router";
import { MatchInfo, Perticipants } from "src/interfaces";
import { GetSummonerName } from "src/GetSummonerName";

import { useEffect } from "react";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { RenderCheckInfo } from "pages/api/RenderCheckInfo";
import { TeamCardView, SummonerInfoCard, ChampionImage, SummonerNameText } from "../styles/searchNickname";

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
        <SummonerNameText>{players.summonerName}</SummonerNameText>
      </SummonerInfoCard>
    );
  });

  return (
    <>
      <header style={{ position: "fixed" }}>
        <GetSummonerName />
      </header>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        <TeamCardView>{renderSameTeam}</TeamCardView>
        <RenderCheckInfo users={findSearchedSummonersTeam} />
      </div>
    </>
  );
};

export default ViewSummonerMatch;
