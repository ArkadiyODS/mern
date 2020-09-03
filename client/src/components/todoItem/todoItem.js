import React, { useContext } from 'react';
// import TodosDispatch from '../../contexts/todosDispatch';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import './todoItem.css';
import { useDispatch, useSelector, connect } from 'react-redux';
import { DeleteTodo, CompleteTodo } from '../../redux/actions';

const makeGetTodo = () => {};

function mapStateToProps(state, props) {
  const getTodo = makeGetTodo();
  return {
    todo: getTodo(state, props),
  };
}

function mapActionsToProps(dispatch, props) {
  return {
    handleActiveChange(active) {
      return () =>
        dispatch({ type: 'active', payload: { id: props.id, active } });
    },
    handleTextChange(evt) {
      dispatch({
        type: 'change',
        payload: { id: props.id, title: evt.target.value },
      });
    },
    dispatch,
  };
}

class TodoItem extends React.Component {
  render() {
    const { id, completed, active, title } = this.props;
    console.log('TODOITEM render: ', id);
    return (
      <div className='todoItem-row'>
        <Checkbox
          color='primary'
          checked={completed}
          onChange={CompleteTodo(this.props.dispatch, id)}
        />
        {active ? (
          <div className='todoItem-input-container'>
            <TextField
              className='todoItem-input'
              value={title}
              autoFocus={true}
              multiline
              rowsMax={3}
              onChange={this.handleTextChange}
              onBlur={this.props.handleActiveChange(false)}
            />
            <IconButton
              variant='contained'
              size='small'
              color='secondary'
              onMouseDown={DeleteTodo(this.props.dispatch, id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ) : (
          <div
            className='todoItem-text'
            tabIndex='0'
            onFocus={this.props.handleActiveChange(true)}>
            {title}
          </div>
        )}
        {JSON.stringify(this.props.todo)}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(TodoItem);

// export default React.memo(function TodoItem(props){
//     const { id, completed, active, title } = props;
//     const dispatch = useDispatch();
//     const todo = useSelector((state) => getTodo(state, props));

//     function handleActiveChange(active){
//         return () => dispatch({type:'active', payload: {id, active}});
//     }

//     function handleTextChange(evt){
//         dispatch({type:'change', payload: {id, title: evt.target.value}});
//     }

//     console.log('TODOITEM render: ', id);

//     return (
//         <div className="todoItem-row">
//             <Checkbox
//                 color="primary"
//                 checked={completed}
//                 onChange={CompleteTodo(dispatch, id)}
//                 />
//             {active ?
//             <div className="todoItem-input-container">
//             <TextField className="todoItem-input"
//                 value={title}
//                 autoFocus={true}
//                 multiline
//                 rowsMax={3}
//                 onChange={handleTextChange}
//                 onBlur={handleActiveChange(false)}
//             />
//             <IconButton variant="contained"
//                 size="small"
//                 color="secondary"
//                 onMouseDown={DeleteTodo(dispatch, id)}>
//                 <DeleteIcon/>
//             </IconButton>
//             </div> :
//             <div className="todoItem-text"  tabIndex="0" onFocus={handleActiveChange(true)}>{title}</div> }
//             {JSON.stringify(todo)}
//         </div>
//     );
// });
