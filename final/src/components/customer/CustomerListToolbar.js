import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import React from 'react';
import { v4 as uuid } from 'uuid';
import { useContext } from "react";
import { AppContext } from "../../Context";
import { Link as RouterLink, useNavigate } from 'react-router-dom';


const CustomerListToolbar = (props) => {
  const { setProducts, setProductLength } = useContext(AppContext);
  const navigate = useNavigate();
  const add = (event)=>{
    let pp = document.getElementsByName("updatepro")
    fetch("http://localhost/php-react/add-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      async: false,
      body: JSON.stringify({ id: uuid(),cost:pp[2].value,price:pp[1].value,name:pp[0].value }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          fetch("http://localhost/php-react/all-product.php")
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              if (data.success) {
                setProducts(data.users);
                setProductLength(data.users.length);
              } else {
                setProductLength(0);
              }
            })
            .catch((err) => {
              console.log(err);
            });
          navigate('/app/customers', { replace: true });
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return(
  
  <Box {...props}>
    <Card>
    <Box sx={{ mx: 1 }}>
      <Table>
      <TableBody>
        <TableRow>
          <TableCell>
          <TextField
                      name="updatepro"
                      label="name"
                      defaultValue="test1"
                      variant="filled"
                    />
          </TableCell>
          <TableCell>
          <TextField
                      name="updatepro"
                      label="price"
                      defaultValue="1000"
                      variant="filled"
                    />
          </TableCell>
          <TableCell>
          <TextField
                      name="updatepro"
                      label="cost"
                      defaultValue="1000"
                      variant="filled"
                    />
          </TableCell>
          <TableCell>
          <Button
        color="primary"
        variant="contained"
        onClick={(event)=>add(event)}
      >
        Add Product
      </Button>
          </TableCell>
        </TableRow>
      </TableBody>
      </Table>
    </Box>
    </Card>
  </Box>
)};

export default CustomerListToolbar;
