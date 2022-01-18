import { atom, useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { getSummonerName, getSommonerPuuid, getSummonerInfo, renderCheck } from "./riotApi";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Link from "next/link";

const GetNameCTA = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  right: 0;

  background: #5383e8;

  margin: 10px 10px 0 0;
  height: 30px;
`;

const GetNameInput = styled.input`
  width: 100%;
  padding: 15px 150px 18px 17px;
  display: flex;
  justify-contents: center;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GetSummonerName = () => {
  const [typedName, setName] = useRecoilState<string>(getSummonerName);
  const [userPuuid, setPuuid] = useRecoilState<string>(getSommonerPuuid);
  const [isRender, setRender] = useRecoilState<boolean>(renderCheck);
  const [changeInput, setChanged] = useState("");
  // const getUserPuuid = useRecoilValueLoadable()

  // let summonerName: HTMLInputElement;
  let summonerName: HTMLInputElement;

  useEffect(() => {
    summonerName = document.getElementById("typed-name") as HTMLInputElement;
  }, []);

  const go = (e) => {
    setChanged(e.target.value);
  };

  console.log(typedName);
  return (
    <Form>
      <GetNameInput id="typed-name" placeholder="type name" onChange={go} />

      <GetNameCTA onClick={go}>
        <Link href={{ pathname: "/Searchnickname", query: { summonerName: changeInput } }}>
          <a>search</a>
        </Link>
      </GetNameCTA>
    </Form>
  );
};
