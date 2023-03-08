import React from 'react';
import {
  LeftOutline,
  MessageOutline,
  LikeOutline,
  StarOutline,
  MoreOutline
} from 'antd-mobile-icons';
import {Badge, Toast} from 'antd-mobile';
import './Detail.less';
function Detail(props) {
  let {navigate} = props;
  return (
    <div className="detail-box">
      {/* 底部图标 */}
      <div className="tab-bar">
        <div
          className="back"
          onClick={() => {
            navigate(-1);
          }}
        >
          <LeftOutline />
        </div>
        <div className="icons">
          {/* <Badge content={extra ? extra.comments : 0}> */}
          <Badge content={0}>
            <MessageOutline />
          </Badge>
          {/* <Badge content={extra ? extra.popularity : 0}> */}
          <Badge content={0}>
            <LikeOutline />
          </Badge>
          {/* <span className={isStore ? 'stored' : ''} onClick={handleStore}> */}
          <span className="stored">
            <StarOutline />
          </span>
          <span>
            <MoreOutline />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Detail;
