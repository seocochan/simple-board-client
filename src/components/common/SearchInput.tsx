import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { Input, message } from 'antd';
import { SearchProps } from 'antd/lib/input';

interface Props extends RouteComponentProps {
  mobile: boolean;
}
interface State {
  q: string;
}

class SearchInput extends React.Component<Props, State> {
  public readonly state: State = {
    q: ''
  };

  private handleChange: SearchProps['onChange'] = e => {
    this.setState({ q: e.target.value });
  };

  private handleSearch: SearchProps['onSearch'] = (value, e) => {
    if (e) {
      e.preventDefault();
    }
    const q = value.trim();
    if (q.length > 0) {
      this.setState({ q: '' });
      this.props.history.push(`/search?q=${q}`);
    } else {
      message.info('검색어를 입력하세요');
    }
  };

  public render() {
    const { mobile } = this.props;
    const { q } = this.state;

    return (
      <Input.Search
        placeholder="검색"
        style={
          mobile
            ? {
                width: 320,
                height: 56,
                position: 'absolute',
                zIndex: 99,
                top: 0,
                left: 0
              }
            : {
                margin: '10px 12px',
                maxWidth: 280
              }
        }
        value={q}
        onChange={this.handleChange}
        onSearch={this.handleSearch}
      />
    );
  }
}

export default withRouter(SearchInput);
