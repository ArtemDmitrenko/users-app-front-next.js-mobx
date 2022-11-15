import type { NextPage } from 'next';
import { Container, Typography } from '@mui/material';

import Layout from 'Root/components/Layout/Layout';
import styles from './index.module.scss';

const Home: NextPage = () => {
  return (
    <Layout title="Users">
      <Container maxWidth="xl" className={styles.container}>
        <Typography variant="h1" align="center" className={styles.title}>
          Here is super App!
        </Typography>
        <Typography variant="h3" className={styles.description}>
          You can see all users, find detailed info about any user and add the new one
        </Typography>
      </Container>
    </Layout>
  );
};

export default Home;
