import * as React from 'react';

import { Button, Form, Icon, Input, Upload } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { IPostResponse } from 'payloads';

interface Props extends FormComponentProps {
  post?: IPostResponse;
  subCategory: string;
  handleFormSubmit: (title: string, text: string) => void;
}

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  // return e && e.fileList;

  // TODO: 여기에 file[0]을 FileReader로 parse해서 setState하는 로직 작성
  return e && [e.fileList[e.fileList.length - 1]];
};

const PostForm: React.SFC<Props> = ({
  form: { getFieldDecorator, validateFields },
  post,
  subCategory,
  handleFormSubmit
}) => {
  const handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    validateFields((error: any, values: any) => {
      console.log(values);
      if (!error) {
        console.log('submit: ', values);
        handleFormSubmit(values.title, values.text);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator('title', {
          initialValue: post && post.title,
          rules: [
            { required: true, whitespace: true, message: '제목을 입력하세요' },
            { max: 40, message: '40자 이하로 작성해주세요' }
          ]
        })(
          <Input
            prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="제목"
            size="large"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('text', {
          initialValue: post && post.text,
          rules: [
            { required: true, whitespace: true, message: '내용을 입력하세요' },
            { max: 255, message: '255자 이하로 작성해주세요' }
          ]
        })(<Input.TextArea placeholder="내용" autosize={{ minRows: 4 }} />)}
      </Form.Item>
      {subCategory === 'screenshot' && (
        <Form.Item>
          {getFieldDecorator('image', {
            valuePropName: 'fileList',
            getValueFromEvent: normFile
          })(
            <Upload
              name="avatar"
              showUploadList={false}
              customRequest={() => null}
            >
              <Button>
                <Icon type="upload" /> 업로드
              </Button>
            </Upload>
          )}
        </Form.Item>

        // TODO: 여기에 이미지 프리뷰 컴포넌트 추가하기
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          완료
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create()(PostForm);
