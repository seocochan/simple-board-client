import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { message } from 'antd';
import { PostEditorContainer } from 'containers';
import * as qs from 'qs';

type Category = {
  category: string;
  subCategory: string;
};

type Query = {
  postId?: string;
};

interface Props extends RouteComponentProps {}

const PostEditor: React.SFC<Props> = ({ location, history }) => {
  const categories: Category | undefined = location.state;
  const query: Query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!categories) {
    message.warn('잘못된 접근입니다');
    history.replace('/');
    return null;
  }

  return (
    <div>
      <PostEditorContainer
        category={categories.category}
        subCategory={categories.subCategory}
        postId={query.postId}
      />
    </div>
  );
};

export default PostEditor;
