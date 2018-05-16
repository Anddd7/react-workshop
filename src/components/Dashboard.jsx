import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Affix, Button, Modal, message } from 'antd';
import { getNotesSuccess, addNoteSuccess } from '../actions';
import API from '../api';

import NoteEdit from './dashboard/NoteEdit';
import NoteList from './dashboard/NoteListWithTimeLine';

class Dashboard extends React.Component {
  static propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  state = {
    visible: false,
    confirmLoading: false,
  }

  componentDidMount = () => API.get('/note')
    .then(res => this.props.dispatch(getNotesSuccess(res)))
    .catch(err => message.error(err.response));

  NoteEdit = React.createRef();

  showModal = () => this.setState({ visible: true })
  hiddenModal = () => this.setState({ visible: false, confirmLoading: false })

  handleOk = () => this.NoteEdit.current.validateFields((errors, values) => {
    if (!errors) {
      this.setState({ confirmLoading: true });
      API.post('/note', values)
        .then((res) => {
          this.props.dispatch(addNoteSuccess(res));
          this.hiddenModal();
        })
        .catch((err) => {
          message.error(err.response);
          this.hiddenModal();
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
