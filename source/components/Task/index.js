import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Task from './presenter';

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    votePortal: bindActionCreators(actions.votePortal, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Task);