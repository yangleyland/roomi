import styled from 'styled-components';
import NavbarAlt from '../../components/navbar-alt/navbar-alt';
import MainPage from '../../components/main-page/main-page';
import initFirebase, { db,auth } from '../../firebase/initFirebase'
import { useEffect, useState } from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import { getAuth, User } from 'firebase/auth';
import {useAuthState} from "react-firebase-hooks/auth"



export default function Home({}) {
  initFirebase();
  const auth=getAuth();
  const [user,loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const [groupId, setGroupId] = useState('');
  const [uid,setUid] = useState(' ');
  const [users, setUsers] = useState(['']);
  const [tasks, setTasks] = useState([]);
  const [temp,setTemp] = useState(0);


  useEffect(() => {
    async function fetchData() {
      if (loading){
        setUid("loading");
      }
      if (user){
        setUid(user.uid); //this statement is not fucking working 
        console.log("user id:")
        console.log(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log(uid)
          console.log("Document data:", docSnap.data().username);
          setName(docSnap.data().username);
          setGroupId(docSnap.data().group)
          const docRef2 = doc(db, "groups", docSnap.data().group);
          const docSnap2 = await getDoc(docRef2);
          const userArray:any=[];
          const taskArray:any=[];
          if (docSnap2.exists()) {
            // console.log("Document data:", docSnap.data().members);
            if (docSnap2.data().members){
              docSnap2.data().members.forEach((element: any) => {
                userArray.push(element);
              });
              setUsers(userArray);
            }
            if (docSnap2.data().tasks){
              docSnap2.data().tasks.forEach((element: any) => {
                taskArray.push([element.task,element.point]);
                console.log("task array",taskArray);
              });
              setTasks(taskArray);
              
            }
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }      
        } else {
          // doc.data() will be undefined in this case
          console.log("No such user!");      
          setName("not working");
        }    
        setTemp(temp+1);
      }
      
    }
    fetchData()
  }, [])

  if (loading){
    return (
      <MainWrapper>
        <NavbarAlt/>
        <p style={{margin: 60}}>Welcome, loading...</p>
        <MainPage varChange={temp} members={users} tasks={tasks}/>
      </MainWrapper>
    );
  }
  if (user) {
    return (
      <MainWrapper>
        <NavbarAlt/>
        <p style={{margin: 60}}>Welcome, {name}</p>
        <MainPage varChange={temp} tasks={tasks} members={users}/>
      </MainWrapper>
    );
  } 
  
}

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
  background: white;
  background-position: fixed;
  background-attachment: local;
  background-repeat: no-repeat;
  background-size: 100%;
  top: 0;
  left: 0;
  z-index: -1;
`;