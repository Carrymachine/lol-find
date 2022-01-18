import { atom, selector, useRecoilState } from "recoil";
import axios from "axios";
import { MatchInfo, Perticipants } from "src/interfaces";

export const renderCheck = atom<boolean>({
  key: "isRender",
  default: false,
});

export const getSummonerName = atom<string>({
  key: "getSummonerName",
  default: "",
});

export const getSommonerPuuid = atom<string>({
  key: "getPuuid",
  default: "",
});

export const getSummonerInfo = selector({
  key: "getSummonerInfo",
  get: async ({ get }) => {
    const summonerName = get(getSummonerName);
    let result: MatchInfo[] = [];

    const response = await axios.get(`${process.env.NEXT_PUBLIC_RIOT_SUMMONERNAME}/${summonerName}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`);

    const userPuuid = response.data.puuid;

    const resUserMatch = await axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${userPuuid}/ids?start=0&count=1&api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`);

    const matchId = resUserMatch.data;
    console.log(matchId);

    const resUserMatchInfo = await axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`);

    return resUserMatchInfo.data;
  },
});

export const getChamiponsList = selector({
  key: "getChampions",
  get: async ({ get }) => {
    const champions = await axios.get("https://ddragon.leagueoflegends.com/cdn/12.1.1/img/champion/Garen.png");

    return champions;
  },
});
