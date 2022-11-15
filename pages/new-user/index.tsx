import * as React from 'react';
import { useRouter } from 'next/router';
import { Container, TextField, Box, Button, MenuItem } from '@mui/material';

import Layout from 'Root/components/Layout/Layout';
import { validateAge } from 'Root/utils/validateAge';
import { TNewUser } from 'Root/types/newUser';
import { addUser } from '../api/addUser';
import styles from './new-user.module.scss';

const genderItems = [
  {
    value: 1,
    label: 'Male',
  },
  {
    value: 2,
    label: 'Female',
  },
];

const NewUser = () => {
  const router = useRouter();
  const [name, setName] = React.useState<string>('');
  const [nameErrorText, setNameErrorText] = React.useState('');
  const [age, setAge] = React.useState<string>('');
  const [ageErrorText, setAgeErrorText] = React.useState<string>('');
  const [gender, setGender] = React.useState<number>(1);
  const [curLink, setCurLink] = React.useState<string>('');
  const [links, setLinks] = React.useState<Array<string>>([]);

  const handleAddLinkButtonClick = () => {
    if (curLink !== '') {
      setLinks((prev) => [...prev, curLink]);
      setCurLink('');
    }
  };

  const prepareDataForRequest = (): TNewUser => {
    const data: TNewUser = {
      name,
      age: Number(age),
      gender,
    };
    if (links.length > 0) data.links = links;
    if (curLink.length > 0) data.links = [...links, curLink];
    return data;
  };

  const handleSubmitButtonClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (name === '') {
      setNameErrorText('Please enter name');
      return;
    } else {
      setNameErrorText('');
    }
    if (age === '') {
      setAgeErrorText('Please enter age');
      return;
    } else if (!validateAge(age)) {
      setAgeErrorText('Enter age between 18 and 100 years');
      return;
    } else {
      setAgeErrorText('');
    }
    const userData = prepareDataForRequest();
    await addUser<TNewUser>('/addUser', userData);
    clearForm();
    router.push('/users');
  };

  const clearForm = () => {
    setName('');
    setAge('');
    setGender(1);
    setCurLink('');
    setLinks([]);
  };

  const handleLinkInputChange = (i: number, e: React.SyntheticEvent) => {
    const result: Array<string> = [];
    const newLinks = links.reduce((acc, el, index) => {
      if (index === i) {
        if ((e.target as HTMLInputElement).value === '') {
          return acc;
        }
        acc.push((e.target as HTMLInputElement).value);
        return acc;
      }
      acc.push(el);
      return acc;
    }, result);
    setLinks(newLinks);
  };

  return (
    <Layout title="Add user">
      <Container maxWidth="xl" className={styles.container}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '50ch' },
            display: 'flex',
            flexDirection: 'column',
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            className={styles.input}
            error={!!nameErrorText}
            helperText={nameErrorText}
            type="text"
            id="standard-basic"
            value={name}
            onChange={({ target }) => setName(target.value)}
            label="Name"
            variant="standard"
            sx={{ m: 2 }}
            required
          />
          <TextField
            className={styles.input}
            error={!!ageErrorText}
            helperText={ageErrorText}
            type="number"
            value={age}
            onChange={({ target }) => setAge(target.value)}
            id="standard-basic"
            label="Age"
            variant="standard"
            sx={{ m: 2 }}
            required
          />
          <TextField
            className={styles.input}
            id="standard-select-currency"
            select
            label="Select"
            value={gender}
            onChange={({ target }) => setGender(Number(target.value))}
            helperText="Please select your currency"
            variant="standard"
            sx={{ m: 2 }}
          >
            {genderItems.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {links.length > 0 &&
            links.map((link, i) => (
              <TextField
                className={styles.input}
                key={link}
                id="standard-basic"
                value={link}
                onChange={(e) => handleLinkInputChange(i, e)}
                label="Link"
                variant="standard"
                sx={{ m: 2 }}
              />
            ))}
          <TextField
            className={styles.input}
            value={curLink}
            onChange={({ target }) => setCurLink(target.value)}
            id="standard-basic"
            label="Link"
            variant="standard"
            sx={{ m: 2 }}
          />
          <Button
            className={styles.input}
            type="button"
            sx={{
              width: 'fit-content',
            }}
            variant="text"
            onClick={handleAddLinkButtonClick}
            disabled={curLink === ''}
          >
            Add one more link
          </Button>
          <Button
            className={styles.input}
            type="submit"
            sx={{
              width: 'fit-content',
              mt: 5,
            }}
            variant="contained"
            onClick={handleSubmitButtonClick}
          >
            Add new user
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default NewUser;
