import * as React from 'react';
import { GetServerSideProps } from 'next';
import { Container, Link, Typography, Card, CardContent } from '@mui/material';

import Layout from 'Root/components/Layout/Layout';
import { TUser } from 'Root/types/user';
import { getUserById } from '../api/getUserById';
import styles from './index.module.scss';

type UserProps = {
  user: TUser;
};

const User = (props: UserProps) => {
  const {
    user: { name, age, gender, links },
  } = props;

  return (
    <Layout title="User">
      <Container maxWidth="xl" className={styles.container}>
        <Card sx={{ maxWidth: 360 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {name}
            </Typography>
            <Typography sx={{ mt: 1.5, mb: 1.5 }} color="text.secondary" gutterBottom>
              Age: <b>{age}</b>
            </Typography>
            <Typography sx={{ mt: 1.5, mb: 1.5 }} color="text.secondary" gutterBottom>
              Gender: <b>{gender === 1 ? 'male' : 'female'}</b>
            </Typography>
            <Typography sx={{ mt: 1.5, mb: 1.5 }} color="text.secondary" gutterBottom>
              Links:{' '}
              {links &&
                links.map((link) => (
                  <Link
                    style={{ display: 'flex', width: 'fit-content' }}
                    key={link}
                    href={link}
                    target="_blank"
                    underline="hover"
                  >
                    {link}
                  </Link>
                ))}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.params?.user as string;
  const user = await getUserById<TUser>('/getUser', userId);
  if (user && !user.name) {
    return {
      notFound: true,
    };
  }
  return { props: { user } };
};

export { getServerSideProps };
export default User;
