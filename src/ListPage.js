import { ButtonGroup, Form, Button, Badge, InputGroup } from 'react-bootstrap';
import { useEffect, useReducer } from 'react';
import './List.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowToRight, faFilter } from '@fortawesome/pro-regular-svg-icons';
import {
  faSortAlphaDown,
  faSortAlphaUpAlt,
} from '@fortawesome/free-solid-svg-icons';
import { loadPicks } from './util';
import { useHistory } from 'react-router-dom';
import { useAuthState } from './auth-state';

//part of list.item.detail //List.js
const ItemDetail = ({ title, detail, children }) => {
  return (
    <div className='ItemDetail'>
      <div className='title'>{title}</div>
      <div className='detail'>{detail || children}</div>
    </div>
  );
};

const ListPage = () => {
  const { pin } = useAuthState();
  const history = useHistory();

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
              // console.log(a[state.sortBy]);
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
            if (state.sortAsc) {
              return a[action.sortBy] < b[action.sortBy] ? -1 : 1;
            } else {
              return a[action.sortBy] > b[action.sortBy] ? -1 : 1;
            }
            // if (!state.sortAsc) {
            //   return a[action.sortBy] < b[action.sortBy] ? -1 : 1;
            // } else {
            //   return a[action.sortBy] > b[action.sortBy] ? -1 : 1;
            // }
          });
          return {
            ...state,
            picks,
            sortby: action.sortBy,
          };
        case 'TOGGLE_SORT':
          console.log('tog sort');
          picks = [...state.picks].sort((a, b) => {
            console.log(a[state.sortBy]);
            if (!state.sortAsc) {
              return a[state.sortBy] < b[state.sortBy] ? -1 : 1;
            } else {
              return a[state.sortBy] > b[state.sortBy] ? -1 : 1;
            }
          });
          return { ...state, sortAsc: !state.sortAsc, picks };
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
              if (!acc) return false;
              let regex;
              try {
                regex = new RegExp(filter.value, '');
              } catch {
                regex = new RegExp('', '');
              }
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
      sortAsc: true,
      openFilter: true,
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
    loadPicks(pin).then(({ data: picks }) => {
      if (current) {
        dispatch({ type: 'LOAD_PICKS', picks });
      }
    });
    return cleanup;
  }, [pin]);

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

  let handleNavigate = (taskId) => {
    history.push(`/pick/${taskId}`);
  };

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
              { title: 'License Plate', prop: 'expectedSourceLicensePlate' }, //should be expected LP
            ].map((sort, i) => (
              <option key={i} value={sort.prop}>
                {sort.title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button
          variant='light'
          onClick={(e) => {
            dispatch({ type: 'TOGGLE_SORT' });
          }}>
          {listState.sortAsc ? (
            <FontAwesomeIcon icon={faSortAlphaDown} />
          ) : (
            <FontAwesomeIcon icon={faSortAlphaUpAlt} />
          )}
        </Button>
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
            {/* //should be expected LP or disable complte task if one can't be assumed!!!*/}
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
          </Form.Group>
          {/* REGEX HELPER TEXT!! ADD SOMETHING FROM REGEXER???  */}
        </div>
      )}
      <div className='Items'>
        {listState.picks.map((pick, i) => {
          return (
            <div className='Item' key={i}>
              {/* <div className='Item' key={pick.taskId}> */}
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
                  onChange={selectPick}
                />
              </div>
              <ItemDetail title='Location'>
                {pick.expectedSourceLocation}
              </ItemDetail>
              <ItemDetail title='Material'>{pick.materialLookup}</ItemDetail>
              <ItemDetail title='Quantity'>{pick.expectedQuantity}</ItemDetail>
              <ItemDetail title='Carrier'>{pick.carrier}</ItemDetail>
              <ItemDetail title='LicensePlate'>
                {pick.expectedSourceLicensePlate}
              </ItemDetail>
              {/* //should be expected LP or disable complte task if one can't be assumed!!!*/}
              <ButtonGroup aria-label='Basic example'>
                <Button
                  variant='success'
                  disabled={!pick.expectedSourceLicensePlate}>
                  Complete Task
                </Button>
                <Button
                  variant='primary'
                  onClick={(e) => {
                    handleNavigate(pick.taskId);
                  }}>
                  Open Task
                </Button>
              </ButtonGroup>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListPage;
