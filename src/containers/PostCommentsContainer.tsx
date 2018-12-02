import * as React from 'react';
import { connect } from 'react-redux';

import { message } from 'antd';
import { CommentForm, Comments } from 'components/post';
import { ICommentResponse, IPostResponse } from 'payloads';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction, RootState } from 'store';
import { AuthState } from 'store/modules/auth';
import { actions as postActions } from 'store/modules/post';

interface Props {
  auth: AuthState;
  comments: ICommentResponse[] | null;
  post: IPostResponse | null;
  PostActions: typeof postActions;
  postId: string;
}

class PostCommentsContainer extends React.Component<Props, {}> {
  private removeComment = async (commentId: string, index: number) => {
    const { PostActions } = this.props;
    await PostActions.deleteComment(commentId, index);
    message.success('댓글을 삭제했습니다');
  };

  private createComment = async (text: string, role?: string) => {
    const { PostActions, postId } = this.props;
    await PostActions.createComment(postId, { text, role });
    message.success('댓글을 등록했습니다');
  };

  public componentDidMount() {
    const { PostActions, postId } = this.props;
    PostActions.loadComments(postId);
  }

  public render() {
    const {
      auth: { currentUser },
      comments,
      post
    } = this.props;
    if (post == null) {
      return null;
    }

    return (
      <Comments
        comments={comments}
        userId={currentUser ? currentUser.id : undefined}
        handleRemove={this.removeComment}
        commentForm={
          <CommentForm
            category={post.category}
            subCategory={post.subCategory}
            handleCreate={this.createComment}
          />
        }
      />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  comments: state.post.comments,
  post: state.post.postData
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  PostActions: bindActionCreators(postActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostCommentsContainer);
