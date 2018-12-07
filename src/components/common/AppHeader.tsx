import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { Icon, Layout, Menu, message } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction, RootState } from 'store';
import { actions as authActions, AuthState } from 'store/modules/auth';
import { ACCESS_TOKEN } from 'values';

import styles from './AppHeader.module.less';
import SearchInput from './SearchInput';

interface Props extends RouteComponentProps {
  auth: AuthState;
  AuthActions: typeof authActions;
}

class AppHeader extends React.Component<Props, {}> {
  private handleLogout = () => {
    const { AuthActions, history } = this.props;

    localStorage.removeItem(ACCESS_TOKEN);
    AuthActions.logout();

    history.push('/');
    message.success('로그아웃 되었습니다');
  };

  private handleClick = (e: ClickParam) => {
    if (e.key === 'logout') {
      this.handleLogout();
    }
  };

  public render(): React.ReactNode {
    const { currentUser } = this.props.auth;

    let menuItems;
    if (currentUser) {
      menuItems = [
        <Menu.SubMenu key="/ow/*" title="오버워치">
          <Menu.Item key="/ow/information">
            <Link to="/ow/information">
              <Icon type="info-circle" />
              정보
            </Link>
          </Menu.Item>
          <Menu.Item key="/ow/party">
            <Link to="/ow/party">
              <Icon type="team" />
              파티
            </Link>
          </Menu.Item>
          <Menu.Item key="/ow/screenshot">
            <Link to="/ow/screenshot">
              <Icon type="picture" />
              스샷
            </Link>
          </Menu.Item>
        </Menu.SubMenu>,
        <Menu.SubMenu key="/lol/*" title="리그오브레전드">
          <Menu.Item key="/lol/information">
            <Link to="/lol/information">
              <Icon type="info-circle" />
              정보
            </Link>
          </Menu.Item>
          <Menu.Item key="/lol/party">
            <Link to="/lol/party">
              <Icon type="team" />
              파티
            </Link>
          </Menu.Item>
          <Menu.Item key="/lol/screenshot">
            <Link to="/lol/screenshot">
              <Icon type="picture" />
              스샷
            </Link>
          </Menu.Item>
        </Menu.SubMenu>,
        <Menu.SubMenu
          key="/me"
          title={
            <span>
              <Icon type="user" />내 계정
            </span>
          }
        >
          <Menu.Item key="logout">로그아웃</Menu.Item>
        </Menu.SubMenu>
      ];
    } else {
      menuItems = [
        <Menu.Item key="/login">
          <Link to="/login">로그인</Link>
        </Menu.Item>,
        <Menu.Item key="/signup">
          <Link to="/signup">회원가입</Link>
        </Menu.Item>
      ];
    }

    return (
      <Layout.Header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.title}>
            <Link to="/">빡겜의 민족</Link>
          </div>
          {currentUser && <SearchInput mobile={false} />}
          <Menu
            mode="horizontal"
            theme="dark"
            selectedKeys={[this.props.location.pathname]}
            style={{ lineHeight: '56px', marginLeft: 'auto' }}
            onClick={this.handleClick}
          >
            {menuItems}
          </Menu>
        </div>
      </Layout.Header>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  AuthActions: bindActionCreators(authActions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppHeader)
);
