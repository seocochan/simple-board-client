import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { SearchResult } from 'components/posts';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction, RootState } from 'store';
import { actions as postsActions, PostsState } from 'store/modules/posts';

interface Props extends RouteComponentProps {
  posts: PostsState;
  PostsActions: typeof postsActions;
  q: string;
  page: number;
  size: number;
}

class SearchContainer extends React.Component<Props, {}> {
  private handlePageChange = (page: number, size: number) => {
    const { history, q } = this.props;
    history.push(`/search?q=${q}&page=${page}&size=${size}`);
  };

  public componentDidMount() {
    const { PostsActions, q, page, size } = this.props;
    PostsActions.searchPosts(q, page - 1, size);
  }

  public componentDidUpdate(prevProps: Props) {
    const { PostsActions, q, page, size } = this.props;
    if (
      prevProps.q !== q ||
      prevProps.page !== page ||
      prevProps.size !== size
    ) {
      PostsActions.searchPosts(q, page - 1, size);
    }
  }

  public render() {
    const { posts, q } = this.props;

    return (
      <SearchResult
        q={q}
        posts={posts.postsData}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchContainer));
