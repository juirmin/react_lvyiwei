import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Grid,
  SvgIcon,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import { Search as SearchIcon } from 'react-feather';
import React from 'react';
import { useState, useContext } from "react";
import { AppContext } from "../../Context";
import { Link as RouterLink, useNavigate } from 'react-router-dom';


const ProductListToolbar = (props) => {
  const { loginid,searchsale,searchorder } = useContext(AppContext);
  const navigate = useNavigate();
  const add= (event)=>{
    let select = document.getElementsByName("addord")
    fetch("http://localhost/php-react/add-order.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ seq:select[0].value,orderid:(uuid()).slice(0,5),empid:loginid,custid:select[1].value,orderdate:select[2].value,descript:select[3].value,prodid:select[4].value,qty:select[5].value,discount:select[6].value }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          searchsale(loginid)
          searchorder(loginid)
          navigate('/app/products', { replace: true });
        } else {
          alert(data.msg);
        }
      })
      
      .catch((err) => {
        console.log(err);
      });
      
  }
  return (
    <Box {...props}>
      <Table>
      <TableBody>
        <TableRow>
          <TableCell>
          <TextField
                      name="addord"
                      label="seq"
                      defaultValue="10000"
                      variant="filled"
                    />
          </TableCell>
          <TableCell>
          <TextField
                      name="addord"
                      label="custid"
                      defaultValue="A123321"
                      variant="filled"
                    />
          </TableCell>
          <TableCell>
          <TextField
                      name="addord"
                      label="orderdate"
                      defaultValue="2021-06-22"
                      variant="filled"
                    />
          </TableCell>
          <TableCell>
          <TextField
                      name="addord"
                      label="discript"
                      defaultValue=""
                      variant="filled"
                    />
          </TableCell>
          <TableCell>
          <TextField
                      name="addord"
                      label="prodid"
                      defaultValue="ASMR"
                      variant="filled"
                    />
          </TableCell>
          <TableCell>
          <TextField
                      name="addord"
                      label="qty"
                      defaultValue="1000"
                      variant="filled"
                    />
          </TableCell>
          <TableCell>
          <TextField
                      name="addord"
                      label="discount"
                      defaultValue="1"
                      variant="filled"
                    />
          </TableCell>
          <TableCell>
          <Button
        color="primary"
        variant="contained"
        onClick={(event)=>add(event)}
      >
        Add Order
      </Button>
          </TableCell>
        </TableRow>
      </TableBody>
      </Table>

    </Box>
  )
};

export default ProductListToolbar;
