import * as React from 'react';

import { LoadingIndicator } from 'components/common';
import { IPostResponse } from 'payloads';
import { categoryMap } from 'values';

import styles from './PostEditorTemplate.module.less';
import PostForm from './PostForm';

interface Props {
  userId: string;
  postId?: string;
  post: IPostResponse | null;
  category: string;
  subCategory: string;
  handleFormSubmit: (title: string, text: string, imageUrl?: string) => void;
}

const PostEditorTemplate: React.SFC<Props> = ({
  postId,
  post,
  category,
  subCategory,
  handleFormSubmit
}) => {
  if (postId && post == null) {
    return <LoadingIndicator />;
  }

  return (
    <div className={styles.container}>
      <h1>
        {post == null ? '게시글 작성' : '게시글 수정'}:{' '}
        {categoryMap[category].name} - {categoryMap[subCategory].name}
      </h1>
      <div>
        <PostForm
          post={post && postId ? post : undefined}
          subCategory={subCategory}
          handleFormSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
};

export default PostEditorTemplate;
