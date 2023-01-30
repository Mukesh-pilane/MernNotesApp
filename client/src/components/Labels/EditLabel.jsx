import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";

import { makeStyles } from "@mui/styles";

const baseURL = "http://localhost:5000";

const useStyles = makeStyles({
  root: {
    "&$disabled $notchedOutline": {
      borderColor: "orange",
    },
  },
  disabled: {},
  notchedOutline: {},
});

const EditNote = ({update, setUpdate}) => {
  const classes = useStyles();
  const [labels, setLabels] = useState([]);
  const [isedit, setIsEdit] = useState({
    name: null,
    flag: false,
  });
  const [newlabel, setNewLabel] = useState("");
  const [rename, setRename] = useState("");
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNewLabel(value);
  };
  const onEditable = (e) => {
    const { name, value } = e.target;
    setRename(value);
  };

  useEffect(() => {
    const getLabels = async () => {
      const token = localStorage.getItem("tokenStore");

      const res = await axios.get(baseURL + `/users/Categories`, {
        headers: { Authorization: token },
      });
      setLabels(res.data);
    };
    getLabels();
  }, [newlabel, update]);

  const addLabel = async () => {
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const newLabel = { category: newlabel };
        const res = await axios.put(baseURL + "/users/Categories", newLabel, {
          headers: { Authorization: token },
        });
        setLabels([...labels, newlabel]);
        setUpdate(!update)
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  
  const renameLabel= async(ogName)=>{
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const name = {ogName, newName: rename };
        const res = await axios.put(baseURL + "/users/rename", name, {
          headers: { Authorization: token },
        });
        setUpdate(!update)
      }
    } catch (err) {
      console.log(ogName);
    }
  }
  const deleteLabel = async() =>{
    try{
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const deleteLabel = { category: rename};
        const res = await axios.post(baseURL + "/users/Categories", deleteLabel, {
          headers: { 
            Authorization: token
          }
        });
         setLabels(labels.filter((x)=>{return x!=rename}))
        setUpdate(!update)
        
      }
    }catch(err){
      console.log(err.response);
    }
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <List>
          <Divider />
          <ListItem>
            <TextField
              placeholder="Create Label"
              name="content"
              fullWidth
              value={newlabel}
              onChange={onChangeInput}
              sx={{
                "& .MuiInputLabel-root": { color: "powderblue" },
                border: "1px solid #f9f9f9",
                borderRadius: 1,
              }}
              InputProps={{ disableUnderline: true }}
              variant="standard"
            />
            <ListItemIcon onClick={addLabel}>
              <DoneOutlinedIcon color="primary" />
            </ListItemIcon>
          </ListItem>
          <Divider />
          {labels.map((item, index) => {
            let check = !(isedit.name == item && isedit.flag);

            return (
              <ListItem key={index}>
                <ListItemIcon>
                  {check ? (
                    <LabelOutlinedIcon color="primary" />
                  ) : (
                    <DeleteOutlineOutlinedIcon
                    onClick={deleteLabel}
                    color="primary" />
                  )}
                </ListItemIcon>
                <TextField
                  name={item}
                  fullWidth
                  disabled={check}
                  value={check ? item : rename}
                  onChange={onEditable}
                  sx={{
                    "& .MuiInputLabel-root": { color: "powderblue" },
                    border: "1px solid #f9f9f9",
                    borderRadius: 1,
                  }}
                  InputProps={{ disableUnderline: true }}
                  variant="standard"
                />
                <ListItemIcon
                >
                  {check ? (
                    <EditIcon
                    onClick={() => {
                    setIsEdit({ name: item, flag: check });
                    setRename(item);
                  }}
                    color="primary" />
                  ) : (
                    <DoneOutlinedIcon 
                    onClick={()=>{renameLabel(item); 
                      setIsEdit({ name: item, flag: check })}
                    }
                    color="primary" />
                  )}
                </ListItemIcon>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Container>
  );
};

export default EditNote;
