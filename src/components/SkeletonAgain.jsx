/* 骨架屏封装 */
import React from 'react';
import {Skeleton} from 'antd-mobile';
function SkeletonAgain() {
  return (
    <div className="skeleton-again-box">
      <Skeleton.Title animated>
        <Skeleton.Paragraph lineCount={5} animated />
      </Skeleton.Title>
    </div>
  );
}

export default SkeletonAgain;
