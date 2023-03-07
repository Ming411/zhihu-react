import * as types from '../action-types';
import _ from '@/assets/utils';
// 存储信息列表
let initial = {
  list: null
};

export default function storeReducer(state = initial, action) {
  state = _.clone(state);
  switch (action.type) {
    default:
  }
  return state;
}
