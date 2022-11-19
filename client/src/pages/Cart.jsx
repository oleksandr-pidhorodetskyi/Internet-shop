import { Add, DeleteOutline, Remove } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router";
import { deleteProduct, deleteProducts } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


const KEY = "pk_test_51M2J5OEzCq8euKAFnmh5V9bzrSPOZxP2pdRzPS0dNMRRjYjQlvF7mIDcmTns1QyPp5FRAS3gOV6EpuouR8mxXPip00DOY4gsC9";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  width: 55%;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position:relative;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;
const PaymentOption = styled.option``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const DeleteBtn = styled.button`
  position: absolute;
  background-color: transparent;
  top:40%;
  right:20px;
  color: #e54343;
  border: none;
`
const Cart = () => {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const [price, setPrice] = useState(cart.total)
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: price * 100,
        });
        history.push("/success", {
          stripeData: res.data,
          cart: cart,
        });
      } catch { }
    };

    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);

  const handleClick = (product) => {
    let productPrice = product.price*product.quantity;
    if(user?.benefits.length > 0){ productPrice = productPrice - (productPrice*0.10)};
    cart.products.map((product) => { if(product.discount){productPrice = productPrice - (productPrice*0.05)}}) 
    setPrice(price - productPrice)
    dispatch(
      deleteProduct({ ...product })
    );
  };
  useEffect(() => {
    let res = cart.total
    cart.products.map((product) => { 
      if (product.discount) {
        res = res - (res*0.05)
      } 
    })
    if(user?.benefits.length > 0 ) {
      res = price - (price*0.10)
    }
    setPrice(res)
    
  },[cart])
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link >
          <TopTexts>
            <TopText>Shopping Bag({cart.quantity})</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <DeleteBtn onClick={() => handleClick(product)}>
                    <DeleteOutline />
                  </DeleteBtn>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            {user?.benefits.length > 0 && <><SummaryItem>
              <SummaryItemText>Discount of benefits</SummaryItemText>
              <SummaryItemPrice>-10%</SummaryItemPrice>
            </SummaryItem></>
            }
            {cart.products.map(product => product.discount == true).filter(item=> item==true)[0] && <>
              <SummaryItem>
                <SummaryItemText>Discount</SummaryItemText>
                <SummaryItemPrice>-5%</SummaryItemPrice>
              </SummaryItem>
            </>
            }
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {price}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <label>Type of payment: </label>
              <select>
                <PaymentOption value="seller">Credit cart</PaymentOption>
              </select>
            </SummaryItem>
            <StripeCheckout
              name="Payment"
              image="https://play-lh.googleusercontent.com/HDhZc1410lGkN3OAhZ2lwWBz0ijuIfW_6NEAUw1jOaMVPpIYV1FTq4R4lWH6djvQ3Q"
              billingAddress
              shippingAddress
              description={`Your total is $${price}`}
              amount={price * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>Continue</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
