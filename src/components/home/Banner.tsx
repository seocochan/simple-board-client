import * as React from 'react';

import { Carousel } from 'antd';

import styles from './Banner.module.less';

const Banner: React.SFC<{}> = props => {
  return (
    <Carousel className={styles.container} autoplay={true}>
      <div className={styles.banner1}>
        <div className={styles.textContainer}>
          <span className={styles.title}>오버워치 리그 진짜 재밌는데...</span>
          <span className={styles.text}>아무도 안봄</span>
        </div>
      </div>
      <div className={styles.banner2}>
        <div className={styles.textContainer}>
          <span className={styles.title}>가입은 하셨나요?</span>
          <span className={styles.text}>하셨군요</span>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
