import * as React from 'react';

import { Divider, Icon } from 'antd';

import styles from './Information.module.less';

const Information: React.SFC<{}> = props => {
  return (
    <>
      <div className={styles.section}>
        <span className={styles.title}>
          <Icon type="fire" style={{ marginRight: 8 }} />
          커뮤니티에 참여하세요!
        </span>
        <span className={styles.text}>
          '빡겜의 민족'에 없는 3,213,213,798명의 게이머들과 함께 정보를 공유하고
          같이 게임을 즐겨보세요
        </span>
      </div>
      <Divider />
      <div className={styles.section} style={{ alignItems: 'flex-end' }}>
        <span className={styles.title}>
          <Icon type="team" style={{ marginRight: 8 }} />
          언제까지 솔큐만 돌리실겁니까??
        </span>
        <span className={styles.text}>
          좋은 팀원을 찾고 같이 게임을 하십시오.
        </span>
      </div>
      <Divider />
      <div className={styles.section}>
        <span className={styles.title}>
          <Icon type="message" style={{ marginRight: 8 }} />더 이상 쓸 내용이
          없습니다.
        </span>
        <span className={styles.text}>빨리 가입하고 써보세요.</span>
      </div>
      <Divider />
    </>
  );
};

export default Information;
