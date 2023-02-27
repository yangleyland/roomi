import { getAuth } from 'firebase/auth';
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Points from '../../components/points/points';
import TaskList from '../../components/task-list/task-list';
import initFirebase, { db } from '../../firebase/initFirebase';

/* eslint-disable-next-line */
export interface MainPageProps {
  members:any;
  tasks:any;
  varChange: number;
  uid: any
  groupId: any
  fetchData: any
}

const StyledMainPage = styled.div`
  background: transparent;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function MainPage(props: MainPageProps) {
  initFirebase();
  const [temp,setTemp] = useState(0);
  const[pointTally,setPointTally]=useState([]);

  // useEffect(() => { 
  //   setTemp(temp+1);

  // }, [props.varChange]); 
  
  
  return(
    <StyledMainPage>
        <Points members={props.members} userValues={pointTally} temp={temp}/>
        <TaskList fetchData={props.fetchData} groupId={props.groupId} uid={props.uid} tasks={props.tasks} temp={temp}/>
    </StyledMainPage>
); 
}

export default MainPage;