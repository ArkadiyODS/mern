import {
  ADD_TODO,
  GET_TODOS,
  COMPLETE_TODO,
  DELETE_TODO,
} from '../actionTypes';

const getNewID = 1;

function createNewTodo() {
  return { id: getNewID(), completed: false, active: true };
}

export default function (state = [], action) {
  console.log('FROM REDUX: ', action.type, action.payload);
  switch (action.type) {
    case GET_TODOS:
      return action.payload;
    case COMPLETE_TODO:
      return state.map((todo) => {
        if (todo.id === action.payload.id + 1) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    case 'change':
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, title: action.payload.title };
        }
        return todo;
      });
    case 'active':
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, active: action.payload.active };
        }
        return todo;
      });
    case ADD_TODO:
      return [createNewTodo(), ...state];
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload.id);
    default:
      return state;
  }
}
