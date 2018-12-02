import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { message } from 'antd';
import { PostEditorTemplate } from 'components/postEditor';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction, RootState } from 'store';
import { AuthState } from 'store/modules/auth';
import { actions as postActions, PostState } from 'store/modules/post';

interface Props extends RouteComponentProps {
  auth: AuthState;
  post: PostState;
  PostActions: typeof postActions;
  category: string;
  subCategory: string;
  postId?: string;
}

class PostEditorContainer extends React.Component<Props, {}> {
  public componentDidMount() {
    const { PostActions, post, postId } = this.props;
    if (postId && post.postData == null) {
      PostActions.loadPost(postId);
    }
  }

  private handleFormSubmit = async (title: string, text: string) => {
    const {
      PostActions,
      auth,
      postId,
      category,
      subCategory,
      history
    } = this.props;
    if (auth.currentUser == null) {
      return;
    }

    try {
      if (postId) {
        await PostActions.updatePost(postId, {
          title,
          text,
          category,
          subCategory
        });
      } else {
        await PostActions.createPost(auth.currentUser.id.toString(), {
          title,
          text,
          category,
          subCategory
        });
      }
      history.push(`/${category}/${subCategory}`);
    } catch (error) {
      message.error('에러가 발생했습니다');
      history.replace('/');
    }

    // try action(1 of 2) ~ push to postId
  };

  public render() {
    const { auth, post, postId, category, subCategory } = this.props;
    if (auth.currentUser == null) {
      return;
    }

    return (
      <>
        <PostEditorTemplate
          userId={auth.currentUser.id.toString()}
          postId={postId}
          post={post.postData}
          category={category}
          subCategory={subCategory}
          handleFormSubmit={this.handleFormSubmit}
        />
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  post: state.post
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  PostActions: bindActionCreators(postActions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostEditorContainer)
);
