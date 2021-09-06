/* eslint-disable */
import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';

//import { logout } from '../../services/authService';
// import { logout } from '../../services/cookieService';

const AlertDismissibleExample = () => {
  // const handleLogout = () => {
  //   console.log('entrei na função logout');
  //   logout();
  // };

  return (
    <div>
      <Alert
        variant="danger"
        style={{
          marginTop: '200px',
          marginLeft: '100px',
          paddingLeft: '50px',
          marginRight: '250px',
          paddingRight: '50px',
        }}
      >
        <Alert.Heading>Deseja realizar o Logout? </Alert.Heading>

        <hr />

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button variant="outline-danger" >
          {/* onClick={() => handleLogout()} */}
            Logout
          </Button>
        </div>
      </Alert>
    </div>
  );
};

export default AlertDismissibleExample;
