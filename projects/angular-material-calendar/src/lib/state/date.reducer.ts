import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './date.action';
import * as _moment from 'moment';

export const initialState = _moment();

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => _moment(state).add(1, 'M')),
  on(decrement, (state) => _moment(state).subtract(1, 'M')),
  on(reset, (state) => _moment())
);

export function counterReducer(state: _moment.Moment | undefined, action: any) {
  return _counterReducer(state, action);
}
