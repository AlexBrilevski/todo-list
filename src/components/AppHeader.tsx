import type { FC } from 'react';
import { AppBar, Button, Toolbar } from '@mui/material';

const AppHeader: FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
