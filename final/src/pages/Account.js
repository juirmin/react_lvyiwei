import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';

import Accountpage from '../components/account/Accountpage';
import React from 'react';

const Account = () => (
  <div>
    <Helmet>
      <title>Account | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Accountpage/>
      </Container>
    </Box>
  </div>
);

export default Account;
