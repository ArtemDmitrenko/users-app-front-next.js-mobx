import * as React from 'react';
import type { GetServerSideProps } from 'next';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import Layout from 'Root/components/Layout/Layout';
import { getUsers } from 'Root/pages/api/getUsers';
import { TUser } from 'Root/types/user';
import styles from './index.module.scss';

type UsersProps = {
  users: Array<TUser>;
};

const Users = (props: UsersProps) => {
  const { users } = props;
  return (
    <Layout title="Users">
      <Container maxWidth="xl" className={styles.container}>
        <Typography variant="h2" className={styles.title}>
          Users list:
        </Typography>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <List>
            {users.map(({ _id, name }) => (
              <ListItem disablePadding key={_id}>
                <ListItemButton href={`/users/${_id}`}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Layout>
  );
};

const getServerSideProps: GetServerSideProps = async () => {
  const users = await getUsers<Array<TUser>>('/getUsers');
  return { props: { users } };
};

export { getServerSideProps };
export default Users;
