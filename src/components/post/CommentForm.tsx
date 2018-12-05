import * as React from 'react';

import { Button, Form, Input, Radio } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { roles } from 'values';

interface Props extends FormComponentProps {
  category: string;
  subCategory: string;
  handleCreate: (text: string, role?: string) => void;
}

const CommentForm: React.SFC<Props> = ({
  form: { getFieldDecorator, validateFields },
  category,
  subCategory,
  handleCreate
}) => {
  const handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    validateFields((error: any, values: { text: string; role?: string }) => {
      if (!error) {
        console.log('submit: ', values);
        handleCreate(values.text, values.role);
      }
    });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {subCategory === 'party' && (
          <Form.Item>
            {getFieldDecorator('role', {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '역할을 선택하세요'
                }
              ]
            })(
              <Radio.Group>
                {roles[category].map((role: string) => (
                  <Radio.Button key={role} value={role}>
                    {role}
                  </Radio.Button>
                ))}
              </Radio.Group>
            )}
          </Form.Item>
        )}
        <Form.Item>
          {getFieldDecorator('text', {
            rules: [
              {
                required: true,
                whitespace: true,
                message: '내용을 입력하세요'
              },
              { max: 255, message: '255자 이하로 작성해주세요' }
            ]
          })(<Input.TextArea placeholder="내용" autosize={{ minRows: 3 }} />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
            댓글 작성
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create()(CommentForm);
