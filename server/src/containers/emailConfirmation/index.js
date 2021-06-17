import React, { Component } from 'react';
import EmailConfirmation from '../../components/emailConfirmation';
import {Email_ConfirmationAc} from '../../actions/registerAction';
import {connect} from "react-redux";

class EmailConfirmCont extends Component {
    componentDidMount = () => {
        const token = this.props.match.params.token;
        this.props.emailConfirm(token);
    }
    render() {
        return (
            <EmailConfirmation status={this.props.status} />
        )
    }
}

const mapStateToProps = (state) => (
{
    "status" : state.register.emailConfirmation,
});
const mapDispatchToProps = {
    "emailConfirmation": Email_ConfirmationAc
};
const mergeProps = (stateProps, dispatchProps, otherProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...otherProps,
    "emailConfirm" : function (token) {
        dispatchProps.emailConfirmation(token);
    }
});

export default connect(mapStateToProps, mapDispatchToProps,mergeProps)(EmailConfirmCont);