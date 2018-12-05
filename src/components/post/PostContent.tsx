import * as React from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumb, Button, Divider, Icon, Popconfirm } from 'antd';
import { LoadingIndicator } from 'components/common';
import * as moment from 'moment';
import { IPostResponse } from 'payloads';
import { categoryMap } from 'values';

import styles from './PostContent.module.less';

interface Props {
  post: IPostResponse | null;
  currentUserId: number | null;
  handleUpdatePost: (
    postId: string,
    category: string,
    subCategory: string
  ) => void;
  handleDeletePost: (postId: string) => void;
  handleRecommend: (postId: string) => void;
}

const PostContent: React.SFC<Props> = ({
  post,
  currentUserId,
  handleUpdatePost,
  handleDeletePost,
  handleRecommend
}) => {
  if (post == null) {
    return <LoadingIndicator />;
  }
  return (
    <div className="post">
      <Link to={`/${post.category}/${post.subCategory}`}>
        <Breadcrumb>
          <Breadcrumb.Item>{categoryMap[post.category].name}</Breadcrumb.Item>
          <Breadcrumb.Item>
            {categoryMap[post.subCategory].name}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Link>
      <div className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        {currentUserId === post.createdBy.id && (
          <>
            <Button
              icon="edit"
              type="dashed"
              shape="circle"
              onClick={() =>
                handleUpdatePost(
                  post.id.toString(),
                  post.category,
                  post.subCategory
                )
              }
            />
            <Popconfirm
              title="진짜로?"
              onConfirm={() => handleDeletePost(post.id.toString())}
            >
              <Button icon="delete" type="dashed" shape="circle" />
            </Popconfirm>
          </>
        )}
      </div>
      <div className={styles.meta}>
        <span className={styles.createdBy}>
          <Icon type="user" />
          {post.createdBy.username}
        </span>
        <span className={styles.createdAt}>
          <Icon type="clock-circle" />
          {moment(post.createdAt).format('LLL')}
        </span>
      </div>
      <Divider />
      <div className={styles.content}>
        {post.imageUrl && (
          <div className={styles.imageFrame}>
            <img
              className={styles.image}
              width="90%"
              alt="logo"
              src={process.env.REACT_APP_BUCKET_URL + post.imageUrl}
            />
          </div>
        )}
        <p>{post.text}</p>
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          shape="circle"
          size="large"
          icon="heart"
          type={post.isRecommended ? 'primary' : 'default'}
          onClick={() => handleRecommend(post.id.toString())}
        >
          {post.recommends}
        </Button>
      </div>
      <Divider />
    </div>
  );
};

export default PostContent;
