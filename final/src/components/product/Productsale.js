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



const Productsale = (props) => {
    const { sale,searchsale,loginid } = useContext(AppContext);
    let [searchsalein, setSale] = useState(sale);
    const salesearch = (event) => {
        let search = new Array
        sale.map((sal) => {
            if ((sal.CustId).match(event.target.value)) {
                search.push(sal)
            }
        })
        setSale(search)
    }
    const editsale = (event,seq,orderid,empid) =>{
        let select = document.getElementsByName(orderid)
        fetch("http://localhost/php-react/update-sale.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ seq:seq,orderid:orderid,empid:empid,custid:select[0].value,orderdate:select[1].value,descript:select[2].value }),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              if (data.success) {
                searchsale(loginid)
              } else {
                alert(data.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
    }
    const deletesale = (event,seq) =>{
        let search = new Array
            
        fetch("http://localhost/php-react/delete-sale.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ seq:seq }),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              if (data.success) {
                searchsale(loginid)
                
              } else {
              }
            })
            .catch((err) => {
              console.log(err);
            });
            sale.map((sal) => {
                if (sal.seq==seq) {

                }else{
                    search.push(sal)
                }
            })
            setSale(search)
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
              placeholder="Search Sale"
              variant="outlined"
              onChange={(event) => salesearch(event)}
            />
          </Box>
                <Box>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                </TableCell>
                                <TableCell>
                                </TableCell>
                                <TableCell>
                                    序號
                                </TableCell>
                                <TableCell>
                                    訂單編號
                                </TableCell>
                                <TableCell>
                                    員工代號
                                </TableCell>
                                <TableCell>
                                    客戶代號
                                </TableCell>
                                <TableCell>
                                    訂貨日期
                                </TableCell>
                                <TableCell>
                                    備註
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {searchsalein.map((sale) => (
                                <TableRow
                                    hover
                                    key={sale.seq}
                                >
                                    <TableCell padding="checkbox">
                                        <IconButton aria-label="edit" color="primary" onClick={(event)=>editsale(event,sale.seq,sale.OrderId,sale.EmpId)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell padding="checkbox">
                                        <IconButton aria-label="delete" color="secondary" onClick={(event)=>deletesale(event,sale.seq)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                    {sale.seq}
                                    </TableCell>
                                    <TableCell>
                                    {sale.OrderId}
                                    </TableCell>
                                    <TableCell>
                                        {sale.EmpId}
                                    </TableCell>
                                    <TableCell>
                                        <Input defaultValue={sale.CustId} name={sale.OrderId}/>
                                    </TableCell>
                                    <TableCell>
                                        <Input defaultValue={sale.OrderDate} name={sale.OrderId}/>
                                    </TableCell>
                                    <TableCell>
                                        <Input defaultValue={sale.Descript} name={sale.OrderId}/>
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

export default Productsale;
