import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Category from './presenter';

function mapStateToProps(state) {
	debugger;
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    doAddTask: bindActionCreators(actions.addTask, dispatch)
  };
}
export default Category;