import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar"
import { register } from "../redux/apiCalls";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #94d1d189;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
`;

const Register = () => {
  const { isFetching, error } = useSelector((state) => state.user);
  const [inputs, setInputs] = useState({});
  const [benefits, setBenefits] = useState([]);

  const dispatch = useDispatch();
  let history = useHistory();
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleBenefits = (e) => {
    setBenefits(e.target.value.split(","));
  };
  const handleClick = (e) => {
    e.preventDefault();
    let newUser = { ...inputs, benefits: benefits };
    console.log(newUser);
    register(newUser, dispatch);
    if(!error){
      history.push("/")
    }
  }
  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form>
          {/* onChange={handleChange} */}
            <Input name="name" placeholder="name" />
            <Input name="username" placeholder="username/login" onChange={handleChange}/>
            <Input name="email" placeholder="email" onChange={handleChange}/>
            <Input name="password" placeholder="password" onChange={handleChange}/>
            <Input placeholder="confirm password" />
            <div className="addProductItem">
              <label>Role: </label>
              <select name="isSeller" onChange={handleChange} >
                <option value="true">Seller</option>
                <option value="false">Buyer</option>
              </select>
            </div>
            {inputs.isSeller === "false" && <Input placeholder="benefits" onChange={handleBenefits}/>}
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            {error && <Error>Something went wrong...</Error>}
            <Button onClick={handleClick}>CREATE</Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
