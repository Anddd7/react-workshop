import React from 'react';
import PropTypes from 'prop-types';
import { Timeline, Icon, Tag } from 'antd';

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
          {note.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </div>
      }

    </Timeline.Item>
  );
}

const NoteList = ({ notes }) => (
  <div >
    <Timeline pending="Continue...">
      {notes.map(createTimeLineItem)}
    </Timeline>
  </div>
);
NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NoteList;
