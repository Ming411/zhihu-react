import {Suspense} from 'react';
import {
  Routes,
  Route,
  useLocation,
  useParams,
  useSearchParams,
  useNavigate
} from 'react-router-dom';
import {Mask, DotLoading} from 'antd-mobile';
import routes from './routes';

const Element = props => {
  const {component: Component, meta} = props;
  let {title = '知乎日报-WebApp'} = meta || {};
  document.title = title; // 当路由匹配上后修改页面标题
  // 获取路由信息，基于属性传递给组件
  const navigate = useNavigate(),
    location = useLocation,
    params = useParams(),
    [usp] = useSearchParams();
  return <Component navigate={navigate} location={location} params={params} usp={usp} />;
};

export default function RouteView() {
  return (
    <Suspense
      fallback={
        <Mask visible={true} opacity="thick">
          <DotLoading />
        </Mask>
      }
    >
      <Routes>
        {routes.map((item, index) => {
          let {name, path} = item;
          return <Route key={name} path={path} element={<Element {...item} />} />;
        })}
      </Routes>
    </Suspense>
  );
}
