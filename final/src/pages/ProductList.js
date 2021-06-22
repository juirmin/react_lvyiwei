import { Helmet } from 'react-helmet';
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
  Grid,
  Container,
  Pagination,
  Paper
} from '@material-ui/core';
import ProductListToolbar from '../components/product/ProductListToolbar';
import Productorder from '../components/product/Productorder'
import Productsale from '../components/product/Productsale'
import React from 'react';
import { useState, useContext } from "react";
import { AppContext } from "../Context";

const ProductList = () => {
  const { sale,order } = useContext(AppContext);
  return (
    <div>
      <Helmet>
        <title>Products | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Productsale sale={sale} />
            </Grid>
            <Grid item xs={6}>
              <Productorder orders={order} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  )
};

export default ProductList;
