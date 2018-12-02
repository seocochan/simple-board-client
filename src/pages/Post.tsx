import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { PostCommentsContainer, PostContainer } from 'containers';

import styles from './Post.module.less';

interface Props extends RouteComponentProps<{ postId: string }> {}

const Post: React.SFC<Props> = ({ match }) => {
  return (
    <div className={styles.container}>
      <PostContainer postId={match.params.postId} />
      <PostCommentsContainer postId={match.params.postId} />
    </div>
  );
};

export default Post;
