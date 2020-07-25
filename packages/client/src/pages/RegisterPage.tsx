import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { registerRequest, RegisterDTO } from '../services/api';
import UserForm from '../components/user/UserForm';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

function RegisterPage() {
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const classes = useStyles();

  async function handleSubmit(data: RegisterDTO) {
    try {
      setLoading(true);
      await registerRequest(data);
      history.push('/login');
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <UserForm onSubmit={handleSubmit} isLoading={isLoading} />
        <Grid container>
          <Grid item>
            <Link to="/login">{'Already signed up? Sign In'}</Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default RegisterPage;
