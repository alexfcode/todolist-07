import type { ChangeEvent } from "react";
import type { FilterValues, Task, Todolist } from "./App";
// import { Button } from "./Button";
import { CreateItemForm } from "./CreateItemForm";
import { EditableSpan } from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { filterButtonsContainerSx, getListItemSx } from "./Todolist.styles";

type Props = {
  todolist: Todolist;
  tasks: Task[];
  deleteTask: (todolistId: string, taskId: string) => void;
  changeFilter: (todolistId: string, filter: FilterValues) => void;
  createTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => void;
  deleteTodolist: (todolistId: string) => void;
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
  changeTodolistTitle: (todolistId: string, title: string) => void;
};

export const TodolistItem = (props: Props) => {
  const {
    todolist: { id, title, filter },
    tasks,
    deleteTask,
    changeFilter,
    createTask,
    changeTaskStatus,
    deleteTodolist,
    changeTaskTitle,
    changeTodolistTitle,
  } = props;

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(id, filter);
  };

  const deleteTodolistHandler = () => {
    deleteTodolist(id);
  };

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(id, title);
  };

  const createTaskHandler = (title: string) => {
    createTask(id, title);
  };

  return (
    <div>
      <div className={"container"}>
        <h3>
          <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
          <IconButton aria-label="x" onClick={deleteTodolistHandler}>
            <DeleteIcon />
          </IconButton>
        </h3>
      </div>
      <CreateItemForm onCreateItem={createTaskHandler} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasks.map((task) => {
            const deleteTaskHandler = () => {
              deleteTask(id, task.id);
            };

            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              const newStatusValue = e.currentTarget.checked;
              changeTaskStatus(id, task.id, newStatusValue);
            };

            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle(id, task.id, title);
            };

            return (
              <ListItem
                key={task.id}
                sx={getListItemSx(task.isDone)}
              >
                <div>
                  <Checkbox
                    checked={task.isDone}
                    onChange={changeTaskStatusHandler}
                  />
                  <EditableSpan
                    value={task.title}
                    onChange={changeTaskTitleHandler}
                  />
                </div>

                <IconButton aria-label="x" onClick={deleteTaskHandler}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      )}
      <div>
        <Box
          sx={filterButtonsContainerSx}
        >
          <Button
            variant={filter === "all" ? "outlined" : "contained"}
            color="success"
            onClick={() => changeFilterHandler("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "active" ? "outlined" : "contained"}
            color="error"
            onClick={() => changeFilterHandler("active")}
          >
            Active
          </Button>
          <Button
            variant={filter === "completed" ? "outlined" : "contained"}
            color="secondary"
            onClick={() => changeFilterHandler("completed")}
          >
            Completed
          </Button>
        </Box>
      </div>
    </div>
  );
};
