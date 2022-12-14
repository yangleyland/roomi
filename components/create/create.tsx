import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app'
import 'firebase/firestore'
import { arrayUnion, collection, doc, getCountFromServer, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc } from "firebase/firestore"; 
import initFirebase, { db,auth } from '../../firebase/initFirebase'
import { createUserWithEmailAndPassword} from "firebase/auth";
import router, { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';

export async function getServerSideProps() {
  initFirebase()
  const coll = collection(db, "groups");
  const snapshot = await getCountFromServer(coll);
  const value = snapshot.data().count;
  console.log("count",value);
  return{
    props:{count: String(value)}
  }
}

/* eslint-disable-next-line */
// export interface CreateProps {
//   count: string;
// }

const StyledCreate = styled.div`
  background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(89,139,213,1) 100%);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;



export function Create() {
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
  const [nameArray,setNameArray]= useState<any>([]);
  const [count,setCount]=useState('0');
  const [ignore,setIgnore]=useState(false);

  useEffect(() => {
    async function getData() {
      
      if (!ignore) {
        initFirebase()
        const coll = collection(db, "groups");
        const snapshot = await getCountFromServer(coll);
        const value = snapshot.data().count;
        console.log("count",value);
        setCount(String(value));
      }
      return () => { setIgnore(true) }
    }
    getData()
    },[]);

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "groups", count);
      
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
            console.log("array",ar)
          });
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      } 
      console.log("users",users);
    }
    fetchData()
  }, [uid])



  

  useEffect(() => {
    async function fetchData() {
      if (uid!=" "){
        try {
          await setDoc(doc(db, "users", uid), {
              group: count,
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
          await updateDoc(doc(db, "groups", count), {
              members: arrayUnion(uid)
            });
          // alert ('Data was succesfully updated')
        } catch (error) {
          try {
            await setDoc(doc(db, "groups",count), {
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
      console.log("this function is called");
      try {
        if (point>0){
          await updateDoc(doc(db, "groups", count), {
          tasks: arrayUnion({task,point,claimed: false})
          });
        // alert ('Data was succesfully updated')        
        }
      } catch (error) {
        try {
          if (point>0){
            await setDoc(doc(db, "groups",count), {
            tasks: arrayUnion({task,point,claimed: false})
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
    event.preventDefault(); // ??????? prevent page refresh
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

      setNameArray((nameArray: any) => [...nameArray, firstRef.current.value])
      console.log("firstref",firstRef.current.value)
      setEmail(emailRef.current.value);
      setUsername(firstRef.current.value);
    }
   
    event.target.reset();
  };
  const addTask = (event: any) => {
    console.log('handleSubmit ran');
    event.preventDefault(); // ??????? prevent page refresh
    if (taskRef.current!=null && pointRef.current!=null){
      setTask(taskRef.current.value);
      setPoint(pointRef.current.value);
    }
    event.target.reset();
  };
  const handleClick = () => {
    router.push("../signin");
  };

  return(
    <StyledCreate>
      <InputContainer>
      <HeaderText>Create New <BlueText>Roomi</BlueText> Group</HeaderText>
        {users.map((user:any)=>(
          <UserText>{user}</UserText>
        ))}
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <Input style={{margin: 5}} placeholder="name" ref={firstRef} type="name" id="name" name="name" required/>
                <Input style={{margin: 5}} ref={emailRef} placeholder="email" type="email" id="email" name="email" required/>
                <Input style={{margin: 5}} placeholder="passcode" ref={passcodeRef} type="password" id="passcode" name="passcode" required/>
                <InputButton style={{margin: 5, width: 130}} type="submit" id="submit" value="Add Roommate">Add Roomi</InputButton>
            </Form>
            <Form onSubmit={addTask}>
                <Input style={{margin: 5}} placeholder="task" ref={taskRef} type="text" id="task" name="task" required/>
                <Input style={{margin: 5}} placeholder="points" ref={pointRef} type="text" id="points" name="points" required/>
                <InputButton style={{margin: 5, width: 130}} type="submit" id="submit" value="Add Task">Add Task</InputButton>
            </Form>
            <GradientButton onClick={handleClick}>Create New Account</GradientButton>
        </FormContainer>
      </InputContainer>
    </StyledCreate>
); 
}

export default Create;

const UserText = styled.p`
  position: relative;
  top: 30px;
  border: 1px solid #DCDCDC;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  width: 30%;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  background-color: white;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  margin: 5px;
`
const InputButton = styled.button`
  display: inline-block;
  outline: 0;
  border: 0;
  cursor: pointer;
  background-color: #4299e1;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 700;
  color: white;
  line-height: 26px;
                
`
const GradientButton = styled.button`
  width: 150px;
  padding: 0;
  border: none;
  background: linear-gradient(90deg, rgba(151,193,255,1) 0%, rgba(57,130,238,1) 100%);
  color: white;
  border-radius: 0.3rem;
  font-family: Intervariable, sans-serif;
  padding: 10px 15px;
  width: 50%;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 30px;
  margin: 20px;
`;
const BlueText=styled.span`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  color: #0056D6;
`
const InputContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 4px solid rgba(255, 255, 255, 0.5);
`
const Input = styled.input`
  border: solid 0.1rem #bcbcbc;
  background-color: #f8f8f8;
  border-radius: 0.3rem;
  padding: 10px;
  padding-left: 15px;
  font-family: InterVariable, sans-serif;
  font-size: 1.1rem;
  color: #676767;
  width: 100%;
  margin-top: 1rem;

  ::placeholder {
    color: #bcbcbc;
  }
  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #bcbcbc;
  }
`;
const HeaderText = styled.div`
    color: black;
    font-size: 1.5em;
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    position: relative;
    top: 30px;
`;
const SubText = styled.div`
    color: grey;
    margin: 10px;
    font-size: 1em;
`;
const FormContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items:center;
  flex-direction: column;
  margin-top: 40px;
`;
const Form = styled.form`
  /* position: relative;
  bottom: 10%;
  width: 60%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;

`;