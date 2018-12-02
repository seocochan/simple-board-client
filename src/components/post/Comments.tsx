import * as React from 'react';

import { Button, Icon, List, Popconfirm } from 'antd';
import { LoadingIndicator } from 'components/common';
import * as moment from 'moment';
import { ICommentResponse } from 'payloads';

interface Props {
  comments: ICommentResponse[] | null;
  userId?: number;
  handleRemove: (commentId: string, index: number) => void;
  commentForm: React.ReactChild;
}

const Comments: React.SFC<Props> = ({
  comments,
  userId,
  handleRemove,
  commentForm
}) => {
  if (comments == null) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <h2>{comments.length}개의 댓글</h2>
      {commentForm}
      <List
        dataSource={comments}
        renderItem={(item: ICommentResponse, index: number) => (
          <List.Item
            actions={
              userId && userId === item.createdBy.id
                ? [
                    <Popconfirm
                      key="1"
                      title="진짜로?"
                      onConfirm={() => handleRemove(item.id.toString(), index)}
                    >
                      <Button icon="delete" type="dashed" shape="circle" />
                    </Popconfirm>
                  ]
                : undefined
            }
          >
            <List.Item.Meta
              style={{ flex: '5 1' }}
              title={item.text}
              description={
                <>
                  {item.role && (
                    <span style={{ marginRight: 8 }}>
                      <Icon type="team" style={{ marginRight: 4 }} />
                      {item.role}
                    </span>
                  )}
                  <span style={{ marginRight: 8 }}>
                    <Icon type="user" style={{ marginRight: 4 }} />
                    {item.createdBy.username}
                  </span>
                  <span>{moment(item.createdAt).from(moment.now())}</span>
                </>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Comments;
