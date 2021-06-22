import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import React from 'react';
import { Search as SearchIcon } from 'react-feather';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { useContext } from "react";
import { AppContext } from "../../Context";


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const CustomerListResults = ({ customers, pag, ...rest }) => {
  const { setProducts, setProductLength,products } = useContext(AppContext);
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(pag+1);
  const [page, setPage] = useState(0);
  let [prodin, setProd] = useState(customers);
  const navigate = useNavigate();
  const edit = (event,ProdID)=>{
    let pp = document.getElementsByName(ProdID)
    fetch("http://localhost/php-react/update-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      async: false,
      body: JSON.stringify({ id: ProdID,cost:pp[2].value,price:pp[1].value,name:pp[0].value }),
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
      setProd(customers)
  }
  const del = (event, ProdID) => {
    fetch("http://localhost/php-react/delete-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      async: false,
      body: JSON.stringify({ id: ProdID }),
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
                setProd(products)
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

 
  const prodsearch = (event) =>{
    
    setProd(products)
    let search = new Array
        products.map((ord) => {
            if ((ord.ProdName).match(event.target.value)) {
                search.push(ord)
            }
        })
    setProd(search)
  }
  

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
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
              onChange={(event) => prodsearch(event)}
            />
        <Box sx={{ minWProdIDth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell>
                  產品名稱
                </TableCell>
                <TableCell>
                  產品代號
                </TableCell>
                <TableCell>
                  單價
                </TableCell>
                <TableCell>
                  成本
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prodin.map((customer) => (
                <TableRow
                  hover
                  key={customer.ProdID}
                  selected={selectedCustomerIds.indexOf(customer.ProdID) !== -1}
                >
                  <TableCell padding="checkbox">
                    <IconButton aria-label="edit" color="primary" onClick={(event) => edit(event, customer.ProdID,customer.ProdName,customer.UnitPrice,customer.Cost)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell padding="checkbox">
                    <IconButton aria-label="delete" color="secondary" onClick={(event) => del(event, customer.ProdID)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={customer.ProdID}
                      defaultValue={customer.ProdName}
                      variant="filled"
                    />
                  </TableCell>
                  <TableCell>
                    {customer.ProdID}
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={customer.ProdID}
                      defaultValue={customer.UnitPrice}
                      variant="filled"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={customer.ProdID}
                      defaultValue={customer.Cost}
                      variant="filled"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[1, 2, pag]}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CustomerListResults;
