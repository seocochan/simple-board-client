import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Button, Icon } from 'antd';
import { PostsContainer } from 'containers';
import { categoryMap } from 'values';

import styles from './Board.module.less';

interface Props extends RouteComponentProps {
  isAuthenticated: boolean;
}

const Board: React.SFC<Props> = ({ isAuthenticated, match, history }) => {
  const category = match.params[0];
  const subCategory = match.params[1];
  const handleClick = () => {
    history.push({
      pathname: '/edit/post',
      state: { category, subCategory }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <span>
            <Icon type={categoryMap[subCategory].icon} />
            {categoryMap[category].name}: {categoryMap[subCategory].name}
          </span>
        </h1>
        {isAuthenticated && (
          <Button icon="plus" onClick={() => handleClick()}>
            글 작성
          </Button>
        )}
      </div>
      <PostsContainer category={category} subCategory={subCategory} />
    </div>
  );
};

export default Board;
