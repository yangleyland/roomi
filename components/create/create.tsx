import styled from 'styled-components';

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
  return(
    <StyledCreate>
        <HeaderText>Create New Group</HeaderText>
        <FormContainer>
            <Form>
                <label style={{margin: 5}} htmlFor="URLfrom">Add Roommate:</label>
                <input style={{margin: 5}} type="text" id="URLfrom" name="URLfrom" />
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
    margin: 20px;
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