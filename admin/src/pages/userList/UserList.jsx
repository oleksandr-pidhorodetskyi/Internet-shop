import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/apiCalls";
import {format} from "timeago.js"


export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
    deleteUser(id, dispatch);
  };
  
  const columns = [
    { field: "_id", headerName: "ID", flex: 1.5 },
    {
      field: "user",
      headerName: "User",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={
                params.row.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              } alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", flex: 1.5 },
    {
      field: `createdAt`,
      headerName: "Create data",
      flex: 1,
      renderCell: (params) => {
        return (
          <p>
            {format(params.row.createdAt)}
          </p>
        )
      }
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.8,
      renderCell: (params) => {
        return (
          <div className="userList-container">
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
