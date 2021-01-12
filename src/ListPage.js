import { Form, Button, Badge, InputGroup } from 'react-bootstrap';
import { useEffect, useReducer } from 'react';
import './List.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowToRight, faFilter } from '@fortawesome/pro-regular-svg-icons';
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
      let picks;
      let allSelected;
      let filters;
      switch (action.type) {
        case 'LOAD_PICKS':
          picks = action.picks.map((pick) => {
            pick.selected = false;
            return pick;
          });
          return {
            ...state,
            orgPicks: picks,
            picks: picks.sort((a, b) => {
              console.log(a[state.sortBy]);
              return a[state.sortBy] < b[state.sortBy] ? -1 : 1;
            }),
          };
        case 'SLECECT_ALL':
          picks = state.picks.map((pick) => ({
            ...pick,
            selected: !state.allSelected,
          }));
          return {
            ...state,
            picks,
            allSelected: !state.allSelected,
          };
        case 'SELECT_PICK':
          picks = state.picks.map((pick, i) =>
            pick.taskId === action.taskId
              ? { ...pick, selected: !pick.selected }
              : pick
          );
          allSelected = picks.reduce((acc, cur, i) => {
            if (!acc) return false;
            return cur.selected;
          }, true);

          return {
            ...state,
            picks,
            allSelected,
          };
        case 'SORT':
          picks = [...state.picks].sort((a, b) => {
            console.log(a[action.sortBy]);
            return a[action.sortBy] < b[action.sortBy] ? -1 : 1;
          });
          return {
            ...state,
            picks,
            sortby: action.sortBy,
          };
        case 'TOGGLE_FILTER':
          return { ...state, openFilter: !state.openFilter };
        case 'SET_FILTER':
          // {type, filter:'location', value:'A[H-N]\d+'}
          filters = state.filters.map((filter) =>
            filter.filter === action.filter
              ? { ...filter, value: action.value }
              : filter
          );
          picks = [...state.orgPicks].filter((pick) => {
            return filters.reduce((acc, filter, i) => {
              // console.group(`filter reducer ${i}`);
              if (!acc) return false;
              let regex;
              try {
                regex = new RegExp(filter.value, '');
              } catch {
                return true;
              }
              // console.log(`regex: ${regex}`);
              // console.log(`filter: ${filter.filter}`);
              // console.log(`pickVal: ${pick[filter.filter]}`);
              // console.log(regex.test(pick[filter.filter]));
              // console.groupEnd(`filter reducer ${i}`);
              // return true;
              return regex.test(pick[filter.filter]);
            }, true);
          });
          return { ...state, picks, filters };
        default: {
        }
      }
    },
    {
      picks: [],
      orgPicks: [],
      allSelected: false,
      sortBy: 'expectedSourceLocation',
      openFilter: false,
      filters: [
        { filter: 'expectedSourceLocation', value: '' },
        { filter: 'materialLookup', value: '' },
        { filter: 'project', value: '' },
      ],
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

  let selectedCount = listState.picks.reduce(
    (acc, cur) => (cur.selected ? acc + 1 : acc),
    0
  );

  return (
    <div className='List'>
      <div className='Actions'>
        <Form.Group>
          <Form.Label>Select All</Form.Label>
          <Form.Check
            custom
            type='checkbox'
            id='select-all'
            checked={listState.allSelected}
            onChange={selectAll}></Form.Check>
        </Form.Group>
        <Form.Group>
          <Form.Label>Sort By</Form.Label>

          <Form.Control
            as='select'
            custom
            onChange={(e) => {
              dispatch({ type: 'SORT', sortBy: e.target.value });
            }}>
            {[
              { title: 'Location', prop: 'expectedSourceLocation' },
              { title: 'Material', prop: 'materialLookup' },
              { title: 'Wave', prop: 'waveId' },
            ].map((sort, i) => (
              <option key={i} value={sort.prop}>
                {sort.title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant='success'>
          Complete Selected <Badge variant='light'>{selectedCount}</Badge>
        </Button>
        <Button variant='danger'>
          {' '}
          Unassign Selected <Badge variant='light'>{selectedCount}</Badge>
        </Button>
        <span></span>
        {!listState.openFilter && (
          <Button
            variant='light'
            onClick={(e) => {
              dispatch({ type: 'TOGGLE_FILTER' });
            }}>
            Filter <FontAwesomeIcon icon={faFilter} />
          </Button>
        )}
      </div>
      {listState.openFilter && (
        <div className='Filter'>
          {listState.openFilter && (
            <Button
              variant='light'
              onClick={(e) => {
                dispatch({ type: 'TOGGLE_FILTER' });
              }}>
              Filter <FontAwesomeIcon icon={faArrowToRight} />
            </Button>
          )}
          <h3>Filter</h3>
          <Form.Group controlId='filterLocation'>
            <Form.Label>Location: </Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>/</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type='text'
                placeholder='A[H-N]\d+'
                onChange={(e) => {
                  dispatch({
                    type: 'SET_FILTER',
                    filter: 'expectedSourceLocation',
                    value: e.target.value,
                  });
                }}
              />
              <InputGroup.Append>
                <InputGroup.Text>/</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>{' '}
          <Form.Group controlId='filterMaterial'>
            <Form.Label>Material: </Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>/</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type='text'
                placeholder='1901[0-9]{6}555'
                onChange={(e) => {
                  dispatch({
                    type: 'SET_FILTER',
                    filter: 'materialLookup',
                    value: e.target.value,
                  });
                }}
              />
              <InputGroup.Append>
                <InputGroup.Text>/</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            {/* <Form.Text className='text-muted'>This is a Rgex Field</Form.Text> */}
          </Form.Group>{' '}
          <Form.Group controlId='filterProject'>
            <Form.Label>Project: </Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>/</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type='text'
                placeholder='orbit.+?'
                onChange={(e) => {
                  dispatch({
                    type: 'SET_FILTER',
                    filter: 'project',
                    value: e.target.value,
                  });
                }}
              />
              <InputGroup.Append>
                <InputGroup.Text>/</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            {/* <Form.Text className='text-muted'>This is a Rgex Field</Form.Text> */}
          </Form.Group>
        </div>
      )}
      <div className='Items'>
        {listState.picks.map((pick, i) => {
          return (
            <div className='Item' key={pick.taskId}>
              <div
                className='ItemSelector'
                onClick={(e) => {
                  e.stopPropagation();
                }}>
                <Form.Check
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
        <pre>{JSON.stringify({ picks: listState.picks }, null, 2)}</pre>
        <pre>{JSON.stringify({ orgPicks: listState.orgPicks }, null, 2)}</pre>
        <pre>{JSON.stringify({ filters: listState.filters }, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ListPage;
