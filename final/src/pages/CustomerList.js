import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from '../components/customer/CustomerListResults';
import CustomerListToolbar from '../components/customer/CustomerListToolbar';
import customers from '../__mocks__/customers';
import React from 'react';
import { useContext, useState } from "react";
import { AppContext } from "../Context";

console.log(customers)
const CustomerList = () => {
  const { products,productLength } = useContext(AppContext);
  return(
  <div>
    <Helmet>
      <title>Customers | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ pt: 3 }}>
          <CustomerListResults customers={products} pag={productLength} />
        </Box>
      </Container>
    </Box>
  </div>
  )
};

export default CustomerList;
