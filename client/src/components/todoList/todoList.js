import React, { useContext, useEffect, useCallback } from 'react';
import TodoItem from '../todoItem/todoItem.js';
import { useSelector, useDispatch } from 'react-redux';
import { AddTodo, GetTodoList } from '../../redux/actions';
import { TodoListWrapper } from '../shared';
import authContext from '../../contexts/authContext.js';

export default function TodoList() {
  const { request } = useContext(authContext);
  const todos = useSelector((store) => store.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetTodoList(request));
  }, [request]);
  return (
    <TodoListWrapper>
      <a
        className='waves-effect waves-light btn-small'
        onClick={(evt) => evt.preventDefault()}>
        <i className='material-icons left'>add</i>Add Todo
      </a>
      {/* {(todos || []).map((todo, i) => (
        <TodoItem key={todo.id} {...todo} />
      ))} */}
    </TodoListWrapper>
  );
}
