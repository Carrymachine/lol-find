import type { NextPage } from "next";
import { getSummonerName, renderCheck } from "../src/riotApi";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { GetSummonerName } from "../src/GetSummonerName";
import styled from "styled-components";
import React, { Suspense, useState } from "react";
import Searchnickname from "pages/Searchnickname";
import { Main } from "pages/Main";

const ContentsArea = styled.div`
  margin: 0 auto;
  width: 1080px;
`;

const Home: NextPage = () => {
  const isRender = useRecoilValue<boolean>(renderCheck);
  return (
    <ContentsArea>
      <Main />
    </ContentsArea>
  );
};

export default Home;

// <header>
//         <h1>누범</h1>
//         <GetSummonerName />
//       </header>
//       {/* {isRender ? (
//         <ContentsArea>

//           {isRender ? <Searchnickname /> : null}
//         </ContentsArea>
//       ) : (
//         <ContentsArea>
//           <GetSummonerName />
//         </ContentsArea>
//       )} */}
//       <ContentsArea>{isRender ? <Searchnickname /> : null}</ContentsArea>
