import React, {useState, useEffect, useRef} from 'react';
import _ from '@/assets/utils';
import './Home.less';
import HomeHead from '@/components/HomeHead';
import NewsItem from '@/components/NewsItem';
import SkeletonAgain from '@/components/SkeletonAgain';
import {Swiper, Image, Divider, DotLoading} from 'antd-mobile';
import {Link} from 'react-router-dom';
import api from '@/api';
function Home() {
  const [today, setToday] = useState(_.formatTime(null, '{0}{1}{2}')),
    [bannerData, setBannerData] = useState([]),
    [newsList, setNewsList] = useState([]);
  let loadMore = useRef();
  // console.log(today);
  /* 组件第一次渲染完毕从服务器发请求 */
  useEffect(() => {
    (async () => {
      try {
        let {date, stories, top_stories} = await api.queryNewsLatest();
        setToday(date);
        setBannerData(top_stories);
        newsList.push({
          date,
          stories
        });
        // useState自带优化机制，如果地址相同则不会重新渲染
        setNewsList([...newsList]);
      } catch (_) {}
    })();
  }, []);
  /* 监听触底再加载 */
  useEffect(() => {
    // console.log(loadMore.current);
    let ob = new IntersectionObserver(async changes => {
      // 监听元素与视口的交叉情况，无论出现还是消失都会触发
      let {isIntersection} = changes[0]; // 筛选出检测的第一个元素的 输入情况
      if (isIntersection) {
        // 加载更多的按钮出现在视口中「也就是触底了」
        try {
          let time = newsList[newsList.length - 1]['date'];
          let res = await api.queryNewsBefore(time);
          newsList.push(res);
          setNewsList([...newsList]);
        } catch (_) {}
      }
    });
    let loadMoreBox = loadMore.current;
    ob.observe(loadMore.current);
    return () => {
      // 手动释放监听器
      // 由于该钩子函数是在组件销毁完毕之后才执行，此时虚拟DOM以及相关属性已经自动销毁，所以需要手动利用闭包保存一个新变量来存储
      ob.unobserve(loadMoreBox);
      ob = null;
      loadMoreBox = null;
    };
  }, []);

  return (
    <div className="home-box">
      <HomeHead today={today} />
      <div className="swiper-box">
        {bannerData.length > 0 ? (
          <Swiper autoplay={true} loop={true}>
            {bannerData.map(item => {
              let {id, image, title, hint} = item;
              return (
                <Swiper.Item key={id}>
                  <Link to={{pathname: `/detail/${id}`}}>
                    <Image src={image} lazy />
                    <div className="desc">
                      <h3 className="title">{title}</h3>
                      <p className="author">{hint}</p>
                    </div>
                  </Link>
                </Swiper.Item>
              );
            })}
          </Swiper>
        ) : null}
      </div>
      {/* 新闻列表 */}
      {newsList.length === 0 ? (
        <SkeletonAgain />
      ) : (
        <>
          {newsList.map((item, index) => {
            let {date, stories} = item;
            return (
              <div className="news-box" key={date}>
                {index !== 0 ? (
                  <Divider contentPosition="left">{_.formatTime(date, '{1}月{2}日')}</Divider>
                ) : null}
                <div className="list">
                  {stories.map(cur => {
                    return <NewsItem key={cur.id} info={cur} />;
                  })}
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* 加载更多 */}
      <div
        className="loadmore-box"
        ref={loadMore}
        style={{
          display: newsList.length === 0 ? 'none' : 'block'
        }}
      >
        <DotLoading />
        数据加载中
      </div>
    </div>
  );
}

export default Home;
