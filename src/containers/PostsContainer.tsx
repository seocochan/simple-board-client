import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Posts } from 'components/posts';
import * as qs from 'qs';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction, RootState } from 'store';
import { actions as postsActions, PostsState } from 'store/modules/posts';

interface Props extends RouteComponentProps {
  posts: PostsState;
  PostsActions: typeof postsActions;
  category: string;
  subCategory: string;
}

class PostsContainer extends React.Component<Props, {}> {
  public componentDidMount() {
    const { PostsActions, category, subCategory, location } = this.props;
    const { page = 1, size = 10 } = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
    PostsActions.loadPosts(category, subCategory, page - 1, size);
  }

  public componentDidUpdate(prevProps: Props) {
    const { PostsActions, category, subCategory, location } = this.props;
    const { page = 1, size } = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
    if (
      prevProps.category !== category ||
      prevProps.subCategory !== subCategory ||
      prevProps.location.search !== location.search
    ) {
      PostsActions.loadPosts(category, subCategory, page - 1, size);
    }
  }

  private handlePageChange = (page: number, size: number) => {
    const { history, category, subCategory } = this.props;
    history.push(`/${category}/${subCategory}?page=${page}&size=${size}`);
  };

  public render() {
    const { posts, subCategory } = this.props;

    return (
      <Posts
        posts={posts.postsData}
        subCategory={subCategory}
        handlePageChange={this.handlePageChange}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  posts: state.posts
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  PostsActions: bindActionCreators(postsActions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostsContainer)
);
