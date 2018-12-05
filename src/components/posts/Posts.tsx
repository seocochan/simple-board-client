import * as React from 'react';
import { Link } from 'react-router-dom';

import { Icon, List } from 'antd';
import { LoadingIndicator } from 'components/common';
import * as moment from 'moment';
import { IPagedResponse, IPostSummary } from 'payloads';

import styles from './Posts.module.less';

interface Props {
  posts: IPagedResponse<IPostSummary> | null;
  subCategory: string;
  handlePageChange: (page: number, size: number) => void;
}

const Posts: React.SFC<Props> = ({ posts, subCategory, handlePageChange }) => {
  if (posts == null) {
    return <LoadingIndicator />;
  }

  return (
    <div>
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
              avatar={
                subCategory === 'screenshot' ? (
                  <Link to={`/posts/${item.id}`}>
                    <div className={styles.imageFrame}>
                      <img
                        width={272}
                        alt="logo"
                        src={
                          item.imageUrl &&
                          process.env.REACT_APP_BUCKET_URL + item.imageUrl
                        }
                      />
                    </div>
                  </Link>
                ) : null
              }
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

export default Posts;
