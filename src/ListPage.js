import { Form, Button, Badge } from 'react-bootstrap';
import { useEffect, useReducer, useState } from 'react';
import './List.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/pro-regular-svg-icons';
import { loadPicks } from './util';

//part of list.item.detail //List.js
const ItemDetail = ({ title, content, children }) => {
  return (
    <div className='ItemDetail'>
      <div className='title'>{title}</div>
      <div className='content'>{content || children}</div>
    </div>
  );
};

const ListPage = () => {
  let userId = 0;

  const [listState, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'LOAD_PICKS':
          return {
            ...state,
            picks: action.picks.map((pick) => {
              pick.selected = false;
              return pick;
            }),
          };
        case 'SLECECT_ALL':
          console.log('SELECT_ALL');

          return {
            picks: state.picks.map((pick) => {
              pick.selected = !state.allSelected;
              return pick;
            }),
            allSelected: !state.allSelected,
          };
        case 'SELECT_PICK':
          console.log('SELECT_PICK');
          console.log(action);
          let newPicks = [...state.picks].map((pick, i) => {
            // console.group(`F${i}`);
            // console.log({ pick });
            // console.log(pick.selected);
            // console.log(!pick.selected);
            // console.log(typeof !pick.selected);
            let isChecked = null;
            if (!pick.selected) {
              isChecked = true;
            }
            if (pick.taskId === action.taskId) {
              pick.selected = isChecked;
            }
            // console.log({ pick });
            // console.groupEnd(`F${i}`);
            return pick;
          });
          let newAllSelected = newPicks.reduce((acc, cur, i) => {
            console.log({ i });
            console.log({ acc });
            console.log({ curSelected: cur.selected, cur });
            if (!acc) return false;
            return cur.selected;
          }, true);
          console.log(newAllSelected);

          return {
            picks: newPicks,
            allSelected: newAllSelected,
          };
        default: {
        }
      }
    },
    {
      picks: [],
      allSelected: false,
    }
  );

  useEffect(() => {
    let current = true;
    let cleanup = () => {
      current = false;
    };
    loadPicks(userId).then(({ data: picks }) => {
      if (current) {
        dispatch({ type: 'LOAD_PICKS', picks });
      }
    });
    return cleanup;
  }, [userId]);

  const selectAll = () => {
    dispatch({ type: 'SLECECT_ALL' });
  };

  const selectPick = (e) => {
    let taskId = parseInt(e.target.id);
    dispatch({ type: 'SELECT_PICK', taskId });
  };

  return (
    <div className='List'>
      <div className='Actions'>
        {/* <Form> */}
        <Form.Group>
          <Form.Label>Select All</Form.Label>
          <input
            custom
            type='checkbox'
            id='select-all'
            checked={listState.allSelected}
            onChange={selectAll}></input>
        </Form.Group>
        <Form.Group>
          <Form.Label>Sort By</Form.Label>
          <Form.Control as='select' custom>
            {['Location', 'Material', 'Wave'].map((op, i) => (
              <option key={i}>{op}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant='success'>
          Complete Selected <Badge variant='light'>#</Badge>
        </Button>
        <Button variant='danger'>
          {' '}
          Unassign Selected <Badge variant='light'>#</Badge>
        </Button>
        <span></span>
        <Button variant='light'>
          Filter
          <FontAwesomeIcon icon={faFilter} />
        </Button>
        {/* </Form> */}
      </div>
      <div className='Filter'></div>
      <div className='Items'>
        {listState.picks.map((pick, i) => {
          return (
            <div className='Item' key={pick.taskId}>
              <div
                className='ItemSelector'
                onClick={(e) => {
                  e.stopPropagation();
                }}>
                <input
                  type='checkbox'
                  name={`select-${pick.taskId}`}
                  custom
                  id={`${pick.taskId}`}
                  checked={pick.selected}
                  taskId={pick.taskId}
                  onChange={selectPick}
                />
              </div>
              <ItemDetail title='Location'>
                {pick.expectedSourceLocation}
              </ItemDetail>
              <ItemDetail title='Material'>{pick.materialLookup}</ItemDetail>
              <ItemDetail title='Quantity'>{pick.expectedQuantity}</ItemDetail>
              <ItemDetail title='Carrier'>{pick.carrier}</ItemDetail>
              <ItemDetail title='WaveId'>{pick.waveId}</ItemDetail>
              <Button variant='success'>Complete Task</Button>
              <Button variant='primary'>Open Task</Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListPage;
