import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Agenda from './presenter';

function mapStateToProps(state) {
  const portal = state.portal;
  return {
    portal
  }
}

function mapDispatchToProps(dispatch) {
  return {
    doSetPortals: bindActionCreators(actions.setPortals, dispatch),
    doAddTask: bindActionCreators(actions.addTask, dispatch),
    doAddCategory: bindActionCreators(actions.addCategory, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Agenda);