import * as React from 'react';
import { Container, Typography } from '@mui/material';

import Layout from 'Components/Layout/Layout';
import TodoList from 'Components/TodoList/TodoList';
import styles from './index.module.scss';

const TodoListPage = () => {
  return (
    <Layout title="Users">
      <Container maxWidth="xl" className={styles.container}>
        <Typography variant="h2" className={styles.title}>
          Todo list:
        </Typography>
        <TodoList />
      </Container>
    </Layout>
  );
};

export default TodoListPage;
