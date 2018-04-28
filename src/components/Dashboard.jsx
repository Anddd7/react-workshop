import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Affix, Button, Timeline, Icon, Modal, Tag } from 'antd';
import API from '../api/index';

import NoteEdit from './NoteEdit';

function createTimeLineItem(note) {
  const doing = note.status === 'DOING';

  return (
    <Timeline.Item
      dot={<Icon type={doing ? 'clock-circle-o' : 'check-square'} style={{ fontSize: '16px' }} />}
      color={doing ? 'red' : 'green'}
      key={note.id}
    >
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      {
        note.tags &&
        <div>
          <hr />
          {note.tags.map(tag => <Tag>{tag}</Tag>)}
        </div>
      }
    </Timeline.Item>
  );
}

const Content = ({ notes }) => (
  <div >
    <Timeline pending="Continue...">
      {notes.map(createTimeLineItem)}
    </Timeline>
  </div>
);
Content.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
};
Content.defaultProps = {
  notes: [],
};

class Dashboard extends React.Component {
  state = {
    notes: [],
    visible: false,
    confirmLoading: false,
  }

  componentDidMount = () => {
    API.get('/note')
      .then(res => this.setState({
        notes: res.obj,
      }));
  }

  showModal = () => this.setState({ visible: true })

  NoteEdit = React.createRef();
  handleOk = () => {
    this.NoteEdit.current.validateFields((err, values) => {
      if (!err) {
        this.setState({ confirmLoading: true });
        API.post('/note', values)
          .then((res) => {
            console.log(res);
            this.setState({
              notes: this.state.notes.concat([res.obj]),
              confirmLoading: false,
              visible: false,
            });
          });
      }
    });
  }
  handleCancel = () => this.setState({ visible: false })

  render = () => (
    <div className="dashboard">
      <Row type="flex" justify="space-around" align="middle">
        <Col sm={24} md={20} lg={16} xl={12} className="notes-content">
          <Affix className="text-right" offsetTop={0} >
            <Button type="primary" icon="plus" onClick={this.showModal} >Note!</Button>
          </Affix>
          <Content notes={this.state.notes} />
        </Col>
      </Row>
      <Modal
        title="Give me a Note."
        visible={this.state.visible}
        confirmLoading={this.state.confirmLoading}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <NoteEdit ref={this.NoteEdit} />
      </Modal>
    </div>
  )
}

export default Dashboard;
