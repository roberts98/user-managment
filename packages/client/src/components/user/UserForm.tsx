import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface Props {
  onSubmit: (...args: any) => void;
  isLoading: boolean;
}

function UserForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    surname: '',
    birthday: '',
  });
  const classes = useStyles();

  function handleBirthdayChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    const timestamp = moment(value, 'YYYY-MM-DD').format('x');
    setFormData((prevData) => ({
      ...prevData,
      birthday: timestamp,
    }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoFocus
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="name"
        label="Name"
        type="name"
        id="name"
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="surname"
        label="Surname"
        type="surname"
        id="surname"
        onChange={handleChange}
      />
      <input type="date" onChange={handleBirthdayChange} />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        {isLoading ? 'Loading' : 'Submit'}
      </Button>
    </form>
  );
}

export default UserForm;
