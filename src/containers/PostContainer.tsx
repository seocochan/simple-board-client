import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { message } from 'antd';
import { PostContent } from 'components/post';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction, RootState } from 'store';
import { AuthState } from 'store/modules/auth';
import { actions as postActions, PostState } from 'store/modules/post';

interface Props extends RouteComponentProps {
  auth: AuthState;
  post: PostState;
  PostActions: typeof postActions;
  postId: string;
}

class PostContainer extends React.Component<Props, {}> {
  public componentDidMount() {
    const { PostActions, postId } = this.props;
    PostActions.loadPost(postId);
  }

  private handleUpdatePost = (
    postId: string,
    category: string,
    subCategory: string
  ) => {
    this.props.history.push({
      pathname: '/edit/post',
      search: `?postId=${postId}`,
      state: { category, subCategory }
    });
  };

  private handleDeletePost = async (postId: string) => {
    const { PostActions, history } = this.props;
    await PostActions.deletePost(postId);
    history.goBack();
  };

  private handleRecommend = async (postId: string) => {
    const { PostActions, post, auth } = this.props;
    if (post.postData == null) {
      return;
    }

    if (!auth.isAuthenticated) {
      message.info('로그인이 필요한 서비스입니다');
      return;
    }
    if (!post.postData.isRecommended) {
      await PostActions.createRecommend(postId);
      message.success('이 글을 추천했습니다');
      return;
    } else {
      await PostActions.deleteRecommend(postId);
      message.success('추천을 취소했습니다');
      return;
    }
  };

  public render() {
    const {
      auth: { currentUser },
      post
    } = this.props;

    return (
      <>
        <PostContent
          post={post.postData}
          currentUserId={currentUser && currentUser.id}
          handleUpdatePost={this.handleUpdatePost}
          handleDeletePost={this.handleDeletePost}
          handleRecommend={this.handleRecommend}
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
  )(PostContainer)
);
