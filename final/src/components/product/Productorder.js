import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Chip,
    Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    TextField,
    InputAdornment,
    SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import React from 'react';
import { useState, useContext } from "react";
import { AppContext } from "../../Context";

const Productorder = (props) => {
    const { order,searchorder,loginid } = useContext(AppContext);
    let [searchorderin, setOrder] = useState(order);
    const ordersearch = (event) => {
        let search = new Array
        order.map((ord) => {
            if ((ord.ProdId).match(event.target.value)) {
                search.push(ord)
            }
        })
        setOrder(search)
    }
    const editord = (event,seq,orderid) =>{
        let select = document.getElementsByName(seq)
        fetch("http://localhost/php-react/update-order.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ seq: seq,orderid:orderid,prodid:select[0].value,qty:select[1].value,discount:select[2].value }),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              if (data.success) {
                searchorder(loginid)
                
              } else {
                alert(data.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
    }
    const deleteord = (event,seq,orderid) =>{
        fetch("http://localhost/php-react/delete-order.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ seq: seq,order:orderid }),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              if (data.success) {
                searchorder(loginid)
              } else {
                alert(data.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
            let search = new Array
            order.map((ord) => {
                if ((ord.seq).match(seq)) {
                    
                }else{
                    search.push(ord)
                }
            })
            setOrder(search)
            console.log(searchorderin)
        }
    return (
        <Card {...props}>
            <PerfectScrollbar>
            <Box>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search Order"
              variant="outlined"
              onChange={(event) => ordersearch(event)}
            />
          </Box>
                <Box>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell />
                                <TableCell>
                                    序號
                                </TableCell>
                                <TableCell>
                                    訂單編號
                                </TableCell>
                                <TableCell>
                                    產品代號
                                </TableCell>
                                <TableCell>
                                    數量
                                </TableCell>
                                <TableCell>
                                    折扣
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {searchorderin.map((ord) => (
                                <TableRow
                                    hover
                                    key={ord.seq}
                                >
                                    <TableCell padding="checkbox">
                                        <IconButton aria-label="edit" color="primary" onClick={(event)=>editord(event,ord.seq,ord.OrderId)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell padding="checkbox">
                                        <IconButton aria-label="delete" color="secondary" onClick={(event)=>deleteord(event,ord.seq,ord.OrderId)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        {ord.seq}

                                    </TableCell>
                                    <TableCell>
                                        {ord.OrderId}

                                    </TableCell>
                                    <TableCell>

                                        <Input defaultValue={ord.ProdId} name={ord.seq} />

                                    </TableCell>
                                    <TableCell>
                                        <Input defaultValue={ord.Qty} name={ord.seq} />

                                    </TableCell>
                                    <TableCell>
                                        <Input defaultValue={ord.Discount} name={ord.seq} />

                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
        </Card>
    )
};

export default Productorder;
