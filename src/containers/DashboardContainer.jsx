import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';

const mapStateToProps = state => ({
  notes: state.notes,
});

export default connect(mapStateToProps)(Dashboard);
