import moment from 'moment';
import { v4 as uuid } from 'uuid';
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
    Tooltip
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import React from 'react';

const Productview = (props) => {
    return (
        <Card {...props}>
            <Divider />
            <PerfectScrollbar>
                <Box>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    員工代號
                                </TableCell>
                                <TableCell>
                                    員工姓名
                                </TableCell>
                                <TableCell>
                                    部門名稱
                                </TableCell>
                                <TableCell>
                                    職稱
                                </TableCell>
                                <TableCell>
                                    職稱
                                </TableCell>
                                <TableCell>
                                    職稱
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
        </Card>
    )
};

export default Productview;
