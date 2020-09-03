import { ADD_TODO, GET_TODOS, DELETE_TODO, COMPLETE_TODO } from './actionTypes';

export function GetTodoList(request) {
  return async (dispatch, getState) => {
    try {
      const todos = await request('/todos');
      dispatch({ type: GET_TODOS, payload: todos || [] });
    } catch (err) {
      console.log('[ERROR]: ', err.message);
    }
  };
}

export function AddTodo(dispatch) {
  return () => dispatch({ type: ADD_TODO });
}

export function DeleteTodo(dispatch, id) {
  return () => dispatch({ type: DELETE_TODO, payload: { id } });
}

export function CompleteTodo(dispatch, id) {
  return () => dispatch({ type: COMPLETE_TODO, payload: { id } });
}

// function handleActiveChange(active){
//     return () => dispatch({type:'active', payload: {id, active}});
// }

// function handleTextChange(evt){
//     dispatch({type:'change', payload: {id, title: evt.target.value}});
// }

// function handleDelete(){
//     dispatch({type:'delete', payload: {id}});
// }
