import * as types from '../action-types';
import _ from '@/assets/utils';
// 存储登录信息
let initial = {
  info: null
};

export default function baseReducer(state = initial, action) {
  state = _.clone(state);
  switch (action.type) {
    default:
  }
  return state;
}
