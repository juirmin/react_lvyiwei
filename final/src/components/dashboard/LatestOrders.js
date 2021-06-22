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
  Tooltip
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import React from 'react';

const LatestOrders = (props) => {
  const users = props.orders
  return (
    <Card {...props}>
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  hover
                  key={user.id}
                >
                  <TableCell>
                    {user.id}
                  </TableCell>
                  <TableCell>
                    {user.name}
                  </TableCell>
                  <TableCell>
                    {user.Dname}
                  </TableCell>
                  <TableCell>
                    {user.job}
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

export default LatestOrders;
