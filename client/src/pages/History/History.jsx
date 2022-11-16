import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import { publicRequest, userRequest } from '../../requestMethods';
import { format } from "timeago.js"
import "./History.css"
import { DeleteOutline } from "@material-ui/icons";


const OrderList = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
`
const Order = styled.div`
    display: flex;
`
const History = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const userId = useSelector((state) => state.user.currentUser._id);
    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await userRequest.get(`orders/find/${userId}`);
                setOrders(res.data);
            } catch { }
        };
        getOrders();
    }, []);


    useEffect(() => {
        const getProducts = async () => {
          try {
            const res = await publicRequest.get(`products`);
            setProducts(res.data);            
          } catch (err) {}
        };
        getProducts();
      }, []);

    console.log(orders);

    const findTitle = (id) => {
        let res;
        products.map((post) => {
            if(post._id == id){
                res = post.title
            }           
        })
        return res
    }

    const handleDelete = async (id) => {
        try {
            const res = await userRequest.delete(`orders/${id}`);
            const res2 = await userRequest.get(`orders/find/${userId}`);
            setOrders(res2.data);
        } catch { }
    };
    const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>;
    };
    return (
        <>
            <Navbar />
            <div className="widgetLg">
                <h3 className="widgetLgTitle">Latest transactions</h3>
                <table className="widgetLgTable">
                    <thead>
                        <tr className="widgetLgTr">
                            <th className="widgetLgTh">Id</th>
                            <th className="widgetLgTh">Products</th>
                            <th className="widgetLgTh">Date</th>
                            <th className="widgetLgTh">Price</th>
                            <th className="widgetLgTh">Status</th>
                            <th className="widgetLgTh">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr className="widgetLgTr" key={order._id}>
                                <td className="widgetLgUser">
                                    <span className="widgetLgName">{order._id}</span>
                                </td>
                                <td className="widgetLgProducts">
                                    {order.products.map(product => (
                                        <div key={order._id} className='widgetLgProducts'>{findTitle(product.productId)} ({product.quantity}) </div>
                                    ))}
                                </td>
                                <td className="widgetLgDate">{format(order.createdAt)}</td>
                                <td className="widgetLgAmount">${order.amount}</td>
                                <td className="widgetLgStatus">
                                    <Button type={order.status} />
                                </td>
                                <td className="widgetLgActions">
                                    <DeleteOutline
                                        className="orderDelete"
                                        onClick={() => handleDelete(order._id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default History