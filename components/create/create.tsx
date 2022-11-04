import { useRef } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app'
import 'firebase/firestore'
import { doc, setDoc } from "firebase/firestore"; 
import { db,auth } from '../../firebase/initFirebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router';


/* eslint-disable-next-line */
export interface CreateProps {}

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
  const firstRef = useRef(null);
  const emailRef = useRef(null);
  const passcodeRef = useRef(null);
  const router = useRouter();

  const handleSubmit = async event => {
    console.log('handleSubmit ran');
    event.preventDefault(); // 👈️ prevent page refresh

    try {
      await setDoc(doc(db, "users", firstRef.current.value), {
          email: emailRef.current.value,
          id: 7,
          points: 0,
          username: firstRef.current.value,
          passcode: passcodeRef.current.value
        });
      // alert ('Data was succesfully updated')
    } catch (error) {
        console.log(error)
        alert(error)
    }
    // const auth = getAuth();
    createUserWithEmailAndPassword(auth, emailRef.current.value, passcodeRef.current.value)
      .then((userCredential) => {
        // Signed in 
        console.log("you are registered")
        router.push("../signin");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("failure")
        alert(errorMessage)
        // ..
      });

    // 👇️ clear all input values in the form
    event.target.reset();
  };

  return(
    <StyledCreate>
        <HeaderText>Create New Group</HeaderText>
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <label style={{margin: 5, fontWeight: "bold"}} htmlFor="URLfrom">Add Roommate:</label>
                <label style={{margin: 5}} htmlFor="name">name: </label>
                <input style={{margin: 5}} ref={firstRef} type="name" id="name" name="name" required/>
                <label style={{margin: 5}} htmlFor="email">email: </label>
                <input style={{margin: 5}} ref={emailRef} type="email" id="email" name="email" required/>
                <label style={{margin: 5}} htmlFor="passcode">passcode: </label>
                <input style={{margin: 5}} ref={passcodeRef} type="password" id="passcode" name="passcode" required/>
                <label style={{margin: 5}} htmlFor="URLfrom">Add Task:</label>
                <input style={{margin: 5}} type="text" id="URLfrom" name="URLfrom" />
                <input style={{margin: 5, width: 90}} type="submit" id="submit" value="create user"/>
            </Form>
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