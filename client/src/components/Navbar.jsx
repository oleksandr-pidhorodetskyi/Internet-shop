import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logOut } from "../redux/apiCalls";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  color:black;
  text-decoration: none;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  color: black;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const quantity = useSelector(state => state.cart.quantity)
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = () => {
    logOut(dispatch);
    history.push("/")
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link style={{ textDecoration: 'none' }} to="/">
            <Logo>SHOP</Logo>
          </Link>
        </Center>
        <Right>
          {
            user ?
              (
                <>
                  {user.isSeller && <Link style={{ textDecoration: 'none' }} to="/newproduct">
                    <MenuItem>ADD PRODUCT</MenuItem>
                  </Link>}
                  {!user.isSeller && <Link style={{ textDecoration: 'none' }} to="/history">
                    <MenuItem>HISTORY</MenuItem>
                  </Link>}
                  <MenuItem onClick={handleClick}>LOGOUT</MenuItem>
                  {!user.isSeller && (<Link to="/cart">
                    <MenuItem>
                      <Badge badgeContent={quantity} color="primary">
                        <ShoppingCartOutlined />
                      </Badge>
                    </MenuItem>
                  </Link>)}
                </>
              )
              :
              (
                <>
                  <Link to="/register">
                    <MenuItem>REGISTER</MenuItem>
                  </Link>
                  <Link to="/login">
                    <MenuItem>SIGN IN</MenuItem>
                  </Link>
                  <Link to="/cart">
                    <MenuItem>
                      <Badge badgeContent={quantity} color="primary">
                        <ShoppingCartOutlined />
                      </Badge>
                    </MenuItem>
                  </Link>
                </>
              )
          }

        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
