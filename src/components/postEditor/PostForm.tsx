import * as React from 'react';

import { Button, Form, Icon, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { IPostResponse } from 'payloads';
import * as UploadAPI from 'utils/api/upload';

import ImageInput from './ImageInput';

interface Props extends FormComponentProps {
  post?: IPostResponse;
  subCategory: string;
  handleFormSubmit: (title: string, text: string, imageUrl?: string) => void;
}

class PostForm extends React.Component<Props, {}> {
  private file: Blob | null;

  constructor(props: Props) {
    super(props);
    this.file = null;
  }

  private handleSubmit = (e: React.FormEvent<any>) => {
    const {
      form: { validateFields },
      handleFormSubmit,
      subCategory,
      post
    } = this.props;
    e.preventDefault();

    validateFields(async (error: any, values: any) => {
      if (error) {
        return;
      }

      if (subCategory === 'screenshot') {
        if (this.file) {
          const { data } = await UploadAPI.getSignedUrl(post && post.imageUrl);
          const { url, key } = data;
          await UploadAPI.uploadFile(url, this.file);
          handleFormSubmit(values.title, values.text, key);
        } else {
          handleFormSubmit(values.title, values.text, post && post.imageUrl);
        }
      } else if (subCategory === 'information' || subCategory === 'party') {
        handleFormSubmit(values.title, values.text);
      } else {
        return;
      }
    });
  };

  public render() {
    const {
      form: { getFieldDecorator },
      post,
      subCategory
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('title', {
            initialValue: post && post.title,
            rules: [
              {
                required: true,
                whitespace: true,
                message: '제목을 입력하세요'
              },
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
              {
                required: true,
                whitespace: true,
                message: '내용을 입력하세요'
              },
              { max: 255, message: '255자 이하로 작성해주세요' }
            ]
          })(<Input.TextArea placeholder="내용" autosize={{ minRows: 4 }} />)}
        </Form.Item>
        {subCategory === 'screenshot' && (
          <ImageInput
            setFile={(file: Blob) => (this.file = file)}
            imageUrl={post && process.env.REACT_APP_BUCKET_URL + post.imageUrl}
          />
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginTop: 8 }}>
            완료
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(PostForm);
