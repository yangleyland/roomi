import styled from "styled-components";
import NavbarAlt from "../../components/navbar-alt/navbar-alt";
import MainPage from "../../components/main-page/main-page";
import initFirebase, { db, auth } from "../../firebase/initFirebase";
import { useEffect, useState } from "react";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth, User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getTasks, updateTasks } from "../../functions/taskFunctions";
import { getRoommates,getName,updateScore, getGroupId } from "../../functions/roommateFunctions";

export default function Home({}) {
  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [roommateArray,setRoommateArray]=useState([])
  const [tasks, setTasks] = useState([]);
  const [temp, setTemp] = useState(0);
  const [name,setName]=useState("")
  const [groupId,setGroupId]= useState("")
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    if (user) {
      //functions
      let taskvalue = await getTasks(user.uid);
      setTasks(taskvalue);
      console.log("taskvalue", taskvalue);
      let roommates = await getRoommates(user.uid);
      setRoommateArray(roommates);
      // await updateTasks("SLT6FPTlVTIruH5vqANo", 0);
      let username = await getName(user.uid);
      setName(username);
      let newGroupId = await getGroupId(user.uid);
      setGroupId(newGroupId)
    }
  }
  //function to update task array given task, uid

  if (loading) {
    return (
      <MainWrapper>
        <NavbarAlt />
        <WelcomeText>Welcome, loading...</WelcomeText>
        <MainPage fetchData={fetchData} groupId={groupId} uid={loading} varChange={temp} members={roommateArray} tasks={tasks} />
      </MainWrapper>
    );
  }
  if (user) {
    return (
      <MainWrapper>
        <NavbarAlt />
        <WelcomeText>Welcome, {name}</WelcomeText>
        <MainPage groupId={groupId} uid={user.uid} fetchData={fetchData} varChange={temp} tasks={tasks} members={roommateArray} />
      </MainWrapper>
    );
  }
}
const WelcomeText = styled.p`
  margin: 40px 50px 0 50px;
  background-color: transparent;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 120px;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(89, 139, 213, 1) 100%
  );
  background-position: fixed;
  background-attachment: local;
  background-repeat: no-repeat;
  background-size: 100%;
  top: 0;
  left: 0;
  z-index: -1;
`;
