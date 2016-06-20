import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Category from './presenter';

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    doAddTask: bindActionCreators(actions.addTask, dispatch),
    doAddTaskDetail: bindActionCreators(actions.addTaskDetail, dispatch)
  };
}
export default Category;