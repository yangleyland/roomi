import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app'
import 'firebase/firestore'
import { arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc } from "firebase/firestore"; 
import { db,auth } from '../../firebase/initFirebase'
import { createUserWithEmailAndPassword} from "firebase/auth";
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';


/* eslint-disable-next-line */
export interface CreateProps {
  count: string;
}

const StyledCreate = styled.div`
  background-color: white;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;



export function Create(props: CreateProps) {
  const user = useAuthState(auth);
  const [uid, setUid] = useState(' ');
  const [email, setEmail] = useState(' ');
  const [username, setUsername] = useState(' ');
  const [task, setTask] = useState(' ');
  const [point, setPoint] = useState(0);
  const firstRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const passcodeRef = useRef<any>(null);
  const taskRef = useRef<any>(null);
  const pointRef = useRef<any>(null);
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    console.log("users",users);
  })

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "groups", props.count);
      const docSnap = await getDoc(docRef);
      const ar:any=[];//change
      if (docSnap.exists()) {
        
        // console.log("Document data:", docSnap.data().members);
        if (docSnap.data().members){
          docSnap.data().members.forEach( async (element: any) => {
            const docRef2 = doc(db, "users", element);
            const docSnap2 = await getDoc(docRef2);
            if (docSnap2.exists()) {
              ar.push(docSnap2.data().username)
            } else {
              console.log("No such document!");
            }
            setUsers(ar);
          });
          
          // console.log("users",users);
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      } 
      console.log(users);
    }
    fetchData()
  }, [uid])



  

  useEffect(() => {
    async function fetchData() {
      if (uid!=" "){
        try {
          await setDoc(doc(db, "users", uid), {
              group: props.count,
              email: email,
              id: uid,
              points: 0,
              username: username,
            });
          // alert ('Data was succesfully updated')
        } catch (error) {
            console.log(error)
            alert(error)
        }
    
        try {
          await updateDoc(doc(db, "groups", props.count), {
              members: arrayUnion(uid)
            });
          // alert ('Data was succesfully updated')
        } catch (error) {
          try {
            await setDoc(doc(db, "groups",props.count), {
                members: arrayUnion(uid)
              });
            // alert ('Data was succesfully updated')
          } catch (error) {
              console.log(error)
              alert(error)
          }
        }
        setUid(" ");     
      }
    }
    fetchData()
  }, [uid])
  useEffect(() => {
    async function fetchData() {
      try {
        if (point>0){
          await updateDoc(doc(db, "groups", props.count), {
          tasks: arrayUnion({task,point})
          });
        // alert ('Data was succesfully updated')        
        }
      } catch (error) {
        try {
          if (point>0){
            await setDoc(doc(db, "groups",props.count), {
            tasks: arrayUnion({task,point})
            });
          // alert ('Data was succesfully updated')          
          }

        } catch (error) {
            console.log(error)
            alert(error)
        }
      }
    }
    fetchData()
  }, [point,task])

  const handleSubmit = async (event: any) => {

    console.log('handleSubmit ran');
    event.preventDefault(); // 👈️ prevent page refresh
    if (emailRef.current != null && passcodeRef.current!=null && firstRef.current!=null){
       createUserWithEmailAndPassword(auth, emailRef.current.value, passcodeRef.current.value)
      .then((userCredential) => {
        const user=userCredential.user;
        setUid(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("failure")
        alert(errorMessage)
      });

      setEmail(emailRef.current.value);
      setUsername(firstRef.current.value);
    }
   
    event.target.reset();
  };
  const addTask = (event: any) => {
    console.log('handleSubmit ran');
    event.preventDefault(); // 👈️ prevent page refresh
    if (taskRef.current!=null && pointRef.current!=null){
      setTask(taskRef.current.value);
      setPoint(pointRef.current.value);
    }


    event.target.reset();
  };

  return(
    <StyledCreate>
        <HeaderText>Create New Group</HeaderText>
        {users.map((user)=>(
          <p>{user}</p>
        ))}
        <FormContainer>

            <Form onSubmit={handleSubmit}>
                {/* <label style={{margin: 5, fontWeight: "bold"}} htmlFor="URLfrom">Add Roommate:</label> */}
                <label style={{margin: 5}} htmlFor="name">name: </label>
                <input style={{margin: 5}} ref={firstRef} type="name" id="name" name="name" required/>
                <label style={{margin: 5}} htmlFor="email">email: </label>
                <input style={{margin: 5}} ref={emailRef} type="email" id="email" name="email" required/>
                <label style={{margin: 5}} htmlFor="passcode">passcode: </label>
                <input style={{margin: 5}} ref={passcodeRef} type="password" id="passcode" name="passcode" required/>
                <input style={{margin: 5, width: 130}} type="submit" id="submit" value="Add Roommate"/>
            </Form>
            <Form onSubmit={addTask}>
                <label style={{margin: 5}} htmlFor="task">Add Task:</label>
                <input style={{margin: 5}} ref={taskRef} type="text" id="task" name="task" required/>
                <input style={{margin: 5}} ref={pointRef} type="text" id="points" name="points" required/>
                <input style={{margin: 5, width: 130}} type="submit" id="submit" value="Add Task"/>
            </Form>
            <Link style={{color: "blue"}}  passHref href="../signin">Create New Account</Link>
      </FormContainer>
    </StyledCreate>
); 
}

export default Create;
const HeaderText = styled.div`
    color: black;
    font-size: 2em;
    margin: 30px;
`;
const SubText = styled.div`
    color: grey;
    margin: 10px;
    font-size: 1em;
`;
const FormContainer = styled.div`
  width: 45%;
  display: flex;
  justify-content: center;
  align-items:center;
  flex-direction: column;
  margin-top: 40px;
`;
const Form = styled.form`
  position: relative;
  bottom: 10%;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;

`;