import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Input, Tooltip, Icon } from 'antd';

class EditableTagGroup extends React.Component {
  propTypes = {
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
  }

  state = {
    inputVisible: false,
    inputValue: '',
  };

  handleClose = (removedTag) => {
    const newTags = this.props.value.filter(tag => tag !== removedTag);
    this.triggerChange(newTags);
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const tags = this.props.value;
    const { inputValue } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      this.triggerChange([...tags, inputValue]);
    }
    this.setState({ inputVisible: false, inputValue: '' });
  }

  triggerChange = (changedValue) => {
    console.log(changedValue);
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  }

  saveInputRef = (input) => {
    this.input = input;
  };

  render() {
    const tags = this.props.value;
    const { inputVisible, inputValue } = this.state;

    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable={index !== 0} afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    );
  }
}

export default EditableTagGroup;
