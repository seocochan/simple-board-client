import * as React from 'react';

import { Divider } from 'antd';

import styles from './Welcome.module.less';

interface Props {
  username: string;
}

const Welcome: React.SFC<Props> = ({ username }) => {
  return (
    <>
      <div className={styles.section}>
        <span className={styles.title}>{username}님 또 오셨군요!</span>
        <span className={styles.text}>왜 오셨나요</span>
      </div>
      <Divider />
    </>
  );
};

export default Welcome;
