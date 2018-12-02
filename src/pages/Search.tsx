import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { message } from 'antd';
import { SearchContainer } from 'containers';
import * as qs from 'qs';

import styles from './Search.module.less';

interface Props extends RouteComponentProps {}

const Search: React.SFC<Props> = ({ location, history }) => {
  const { q, page = 1, size = 10 } = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  if (!q || q.trim().length === 0) {
    message.warn('검색어가 없습니다');
    history.replace('/');
    return null;
  }

  return (
    <div className={styles.container}>
      <SearchContainer q={q.trim()} page={page} size={size} />
    </div>
  );
};

export default Search;
