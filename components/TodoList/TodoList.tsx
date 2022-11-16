import * as React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { observer } from 'mobx-react-lite';

import todo from 'Root/store/todo';
import styles from './todoList.module.scss';

const TodoList = observer((): JSX.Element => {
  const [curTodo, setCurTodo] = React.useState<string>('');

  const handleAddTodoButtonClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (curTodo !== '') {
      const newTodo = {
        userId: Math.random(),
        id: Math.random(),
        title: curTodo,
        completed: false,
      };
      todo.addTodo(newTodo);
      setCurTodo('');
    } else {
      return;
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
      <Button type="button" variant="outlined" sx={{ mt: 2 }} onClick={() => todo.fetchTodos()}>
        Fetch todos
      </Button>
      <Box component="form" className={styles.form}>
        <TextField
          value={curTodo}
          onChange={({ target }) => setCurTodo(target.value)}
          type="text"
          id="outlined-basic"
          label="Todo"
          variant="outlined"
          size="small"
        />
        <Button type="submit" variant="contained" onClick={handleAddTodoButtonClick}>
          Add todo
        </Button>
      </Box>
      {todo.todos.length > 0 ? (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {todo.todos.map((value, i) => {
            const labelId = `checkbox-list-label-${value.id}`;
            return (
              <ListItem
                key={value.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={() => todo.removeTodo(value.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={() => todo.completeTodo(value.id)}
                  // onClick={handleToggle(i)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={value.completed}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${i + 1}. ${value.title}`} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Typography sx={{ mt: 2 }}>No todos...</Typography>
      )}
    </Box>
  );
});

export default TodoList;
