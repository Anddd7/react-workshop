import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Affix, Button, Modal } from 'antd';
import API from '../api/index';

import NoteEdit from './dashboard/NoteEdit';
import NoteList from './dashboard/NoteListWithTimeLine';

class Dashboard extends React.Component {
  propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  state = {
    // notes: [],
    visible: false,
    confirmLoading: false,
  }

  // componentDidMount = () => console.log(this.props)

  NoteEdit = React.createRef();

  showModal = () => this.setState({ visible: true })
  hiddenModal = () => this.setState({ visible: false })

  handleOk = () => this.NoteEdit.current.validateFields((err, values) => {
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
  })

  render = () => (
    <div className="dashboard">
      <Row type="flex" justify="space-around" align="middle">
        <Col sm={24} md={20} lg={16} xl={12} className="notes-content">
          <Affix className="text-right" offsetTop={0} >
            <Button type="primary" icon="plus" onClick={this.showModal} >Note!</Button>
          </Affix>
          <NoteList notes={this.props.notes} />
        </Col>
      </Row>
      <Modal
        title="Give me a Note."
        visible={this.state.visible}
        confirmLoading={this.state.confirmLoading}
        onOk={this.handleOk}
        onCancel={this.hiddenModal}
      >
        <NoteEdit ref={this.NoteEdit} />
      </Modal>
    </div>
  )
}

export default Dashboard;
