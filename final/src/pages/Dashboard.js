import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import LatestOrders from '../components/dashboard/LatestOrders';
import { useContext } from "react";
import { AppContext } from "../Context";
import React from 'react';

const Dashboard = () => {
  const { users } = useContext(AppContext);
  return(
  <div>
    <Helmet>
      <title>Employee | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <LatestOrders orders={users}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </div>
)};

export default Dashboard;
