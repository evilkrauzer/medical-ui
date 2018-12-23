import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import UserApp from './components/UserApp';
import { chooseStudy } from './actions/userApp';
import { joinToStudy, sendDataToStudy, getStudies } from './actions/studies';
export default class UserAppContainer extends Component {
    static contextTypes = {
        store: PropTypes.object.isRequired
    };
    componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() => this.forceUpdate());

        this.context.store.dispatch(getStudies());
    }

    componentWillUnmount() {
        this.unsubscribe && this.unsubscribe();
    }

    handleChooseStudy = study => this.context.store.dispatch(chooseStudy(study));

    handleJoinToStudy = studyId => this.context.store.dispatch(joinToStudy(studyId));

    handleSendDataToStudy = (studyId, parameters) => this.context.store.dispatch(sendDataToStudy(studyId, parameters));
    render() {
        const store = this.context.store;
        const state = store.getState();

        return (
            <Fragment>
                <UserApp
                    currentStudy={state.userApp.currentStudy}
                    studies={state.studies}
                    onJoinToStudy={this.handleJoinToStudy}
                    onChooseStudy={this.handleChooseStudy}
                    onSendDataToStudy={this.handleSendDataToStudy}
                />
            </Fragment>
        );
    }
}
