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
  const [uid,setUid] = useState(' ');

  useEffect(() => {
    async function fetchData() {
      if (loading){
        setUid("loading");
      }
      if (user){
        setUid(user.uid); //this statement is not fucking working 
        console.log("user id:")
        console.log(user.uid);

      }
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(uid)
        console.log("Document data:", docSnap.data().username);
        setName(docSnap.data().username);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such user!");      
        setName("not working");

      }
    }
    fetchData()
  }, [])

  if (loading){
    return (
      <MainWrapper>
        <NavbarAlt/>
        <p style={{margin: 60}}>Welcome, loading...</p>
        <MainPage/>
      </MainWrapper>
    );
  }
  if (user) {
    return (
      <MainWrapper>
        <NavbarAlt/>
        <p style={{margin: 60}}>Welcome, {name}</p>
        <MainPage/>
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