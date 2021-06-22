import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Chip,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    Grid
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState,useContext } from "react";
import { AppContext } from "../../Context";


const Accountpage = (props) => {
    const { cust } = useContext(AppContext);
    let [custin, setCust] = useState(cust);
    const search = (event) => {
        let sdate = document.getElementById("sdate")
        let edate = document.getElementById("edate")
        fetch("http://localhost/php-react/search-custbydate.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ sdate: sdate.value, edate: edate.value }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    setCust(data.searchcust)
                    console.log(data.searchcust)
                } else {
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (

        <Card {...props}>

            <Divider />
            <PerfectScrollbar>
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={3}><Typography variant="subtitle1">Start</Typography></Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            id="sdate"
                            type="date"
                            name="date"
                            defaultValue="2018-10-01"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event)=>search(event)}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}><Typography variant="subtitle1">End</Typography></Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            id="edate"
                            type="date"
                            name="date"
                            defaultValue="2018-10-30"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event)=>search(event)}
                        />
                    </Grid>
                </Grid>
                <Box>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    客戶名稱
                                </TableCell>
                                <TableCell>
                                    客戶代號
                                </TableCell>
                                <TableCell>
                                    總銷售金額
                                </TableCell>
                                <TableCell>
                                    總利潤
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {custin.map((cus) => (
                                <TableRow
                                    hover
                                    key={cus.custid}
                                >
                                    <TableCell>
                                    {cus.custname}
                                    </TableCell>
                                    <TableCell>
                                    {cus.custid}
                                    </TableCell>
                                    <TableCell>
                                    {cus.sumdo}
                                    </TableCell>
                                    <TableCell>
                                    {cus.summoney}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
        </Card>
    )
}
export default Accountpage;
