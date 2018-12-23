import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ResearcherApp from './components/ResearcherApp';
// import { initApp } from '/actions/init';

export default class ResearcherContainer extends Component {
    static propTypes = {
    };


    static contextTypes = {
        store: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe && this.unsubscribe();
    }

    render() {
        const store = this.context.store;
        const state = store.getState();

        return (
            <Fragment>
                <ResearcherApp
                />
            </Fragment>
        );
    }
}
