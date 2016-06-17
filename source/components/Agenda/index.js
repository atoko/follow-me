import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Agenda from './presenter';

function mapStateToProps(state) {
  const agenda = state.agenda;
  return {
    agenda
  }
}

function mapDispatchToProps(dispatch) {
  return {
    doAddTask: bindActionCreators(actions.addTask, dispatch),
    doAddCategory: bindActionCreators(actions.addCategory, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Agenda);