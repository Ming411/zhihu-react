import React from 'react';
import {NavBar} from 'antd-mobile';
import PropTypes from 'prop-types';
function NavBarAgain(props) {
  let {title} = props;
  const handleBack = () => {};
  return <NavBar onBack={handleBack}>{title}</NavBar>;
}
NavBarAgain.defaultProps = {
  title: '个人中心'
};
NavBarAgain.prototype = {
  title: PropTypes.string
};
export default NavBarAgain;
