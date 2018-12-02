import * as React from 'react';
import { Link } from 'react-router-dom';

import { Icon, List } from 'antd';
import { LoadingIndicator } from 'components/common';
import * as moment from 'moment';
import { IPagedResponse, IPostSummary } from 'payloads';

import styles from './SearchResult.module.less';

interface Props {
  q: string;
  posts: IPagedResponse<IPostSummary> | null;
  handlePageChange: (page: number, size: number) => void;
}

const SearchResult: React.SFC<Props> = ({ q, posts, handlePageChange }) => {
  console.log(posts);

  if (posts == null) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <div>
        <h1 style={{color: '#777'}}>
          <Icon type="search" />
          <span className={styles.text}>{q}</span>
          <span>에 대한 </span>
          <span className={styles.text}>{posts.totalElements}건</span>
          <span>의 검색 결과</span>
        </h1>
      </div>
      <List
        pagination={{
          position: 'bottom',
          pageSize: posts.size,
          current: posts.page + 1,
          total: posts.totalElements,
          onChange: handlePageChange
        }}
        dataSource={posts.content}
        renderItem={(item: IPostSummary) => (
          <List.Item>
            <List.Item.Meta
              style={{ flex: '5 1' }}
              title={<Link to={`/posts/${item.id}`}>{item.title}</Link>}
              description={
                <span>
                  <Icon type="user" />
                  {item.createdBy.username}
                </span>
              }
            />
            <span>
              <Icon type="clock-circle" />
              {moment(item.createdAt).from(moment.now())}
            </span>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SearchResult;
