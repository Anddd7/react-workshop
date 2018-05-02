import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import EditableTagGroup from '../common/EditableTagGroup';

const FormItem = Form.Item;
const { TextArea } = Input;

class NoteEditForm extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
  };

  checkPromise = () => new Promise(((resolve, reject) => {
    this.props.form.validateFields((err) => {
      if (!err) {
        resolve();
      } else {
        reject();
      }
    });
  }));

  checkTags = (rule, value, callback) => {
    console.log(value);
    if (value) {
      callback();
      return;
    }
    callback('Every tag should not be empty!');
  }

  render = () => {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout="vertical">
        <FormItem label="Title">
          {
            getFieldDecorator('title', {
              rules: [{
                required: true,
                message: 'Please input your title!',
                min: 1,
                max: 50,
              }],
            })(<Input />)
          }
        </FormItem>
        <FormItem label="Tags">
          {
            getFieldDecorator('tags', {
              rules: [{ type: 'array', validator: this.tags }],
              initialValue: [],
            })(<EditableTagGroup />)
          }
        </FormItem>
        <FormItem label="Content">
          {
            getFieldDecorator('content', {
              rules: [{ required: true, min: 1, message: 'Please input your content!' }],
            })(<TextArea rows={6} />)
          }
        </FormItem>
      </Form>
    );
  }
}

const NoteEdit = Form.create()(NoteEditForm);

export default NoteEdit;
