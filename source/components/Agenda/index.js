import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Agenda from './presenter';

function mapStateToProps(state) {
	const portal = state.portal;
	const app = state.app;
	return {
		portal,
		app
	};
}

function mapDispatchToProps(dispatch) {
	return {
		doSetPortals: bindActionCreators(actions.setPortals, dispatch),
		doSetFilter: bindActionCreators(actions.setFilter, dispatch),
		doSetCenter: bindActionCreators(actions.setCenter, dispatch),
		doSetDistance: bindActionCreators(actions.setDistance, dispatch),
		doSetSelected: bindActionCreators(actions.setSelected, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Agenda);