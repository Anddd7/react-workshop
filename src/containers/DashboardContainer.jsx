import { connect } from 'react-redux';
import { toggleTodo, VisibilityFilters } from '../actions';
import Dashboard from '../components/Dashboard';

const getVisibleNotes = (notes, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return notes;
    case VisibilityFilters.SHOW_COMPLETED:
      return notes.filter(t => t.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return notes.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
};

const mapStateToProps = state => ({
  notes: getVisibleNotes(state.notes, state.visibilityFilter),
});

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
