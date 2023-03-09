import React, {useState, useEffect, useMemo} from 'react';
import {
  LeftOutline,
  MessageOutline,
  LikeOutline,
  StarOutline,
  MoreOutline
} from 'antd-mobile-icons';
import {Badge, Toast} from 'antd-mobile';
import './Detail.less';
import api from '../api';
import SkeletonAgain from '../components/SkeletonAgain';
import {flushSync} from 'react-dom';
import {connect} from 'react-redux';
import action from '../store/action';
function Detail(props) {
  let {navigate, params, location} = props;
  const [info, setInfo] = useState(null),
    [extra, setExtra] = useState(null);

  /* 第一次渲染完毕:获取数据 */
  let link;
  const handleStyle = result => {
    let {css} = result;
    if (!Array.isArray(css)) return;
    css = css[0];
    if (!css) return;
    // 创建<LINK>导入样式
    link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = css;
    document.head.appendChild(link);
  };
  const handleImage = result => {
    let imgPlaceHolder = document.querySelector('.img-place-holder');
    if (!imgPlaceHolder) return;
    // 创建大图
    let tempImg = new Image();
    tempImg.src = result.image;
    tempImg.onload = () => {
      imgPlaceHolder.appendChild(tempImg);
    };
    tempImg.onerror = () => {
      // 如果图片不存在就将父子预留得盒子删除
      // 只能通过父元素删除子元素
      let parent = imgPlaceHolder.parentNode;
      parent.parentNode.removeChild(parent);
    };
  };
  const handleStore = () => {
    // navigate(`/login?to=${location.pathname}`);
  };

  /* 获取文章详情 */
  useEffect(() => {
    (async () => {
      try {
        let result = await api.queryNewsInfo(params.id);
        flushSync(() => {
          setInfo(result);
          handleStyle(result);
        });
        handleImage(result);
      } catch (_) {}
    })();
    // 销毁组件:移除创建的样式
    return () => {
      if (link) document.head.removeChild(link);
    };
  }, []);
  /* 文章点赞等信息 */
  useEffect(() => {
    (async () => {
      try {
        let result = await api.queryStoryExtra(params.id);
        setExtra(result);
      } catch (_) {}
    })();
  }, []);
  return (
    <div className="detail-box">
      {/* 新闻内容 */}
      {!info ? (
        <SkeletonAgain />
      ) : (
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: info.body
          }}
        ></div>
      )}
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
          <Badge content={extra ? extra.comments : 0}>
            <MessageOutline />
          </Badge>
          <Badge content={extra ? extra.popularity : 0}>
            <LikeOutline />
          </Badge>
          {/* <span className={isStore ? 'stored' : ''} onClick={handleStore}> */}
          <span className="stored" onClick={handleStore}>
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
