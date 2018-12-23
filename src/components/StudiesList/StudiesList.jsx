import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class StudiesList extends Component {
    static propTypes = {
        studiesList: PropTypes.array
    };

    renderStudy(study){
        return (<div></div>);
    }

    render() {
        return (
            <div className='test'>
            </div>
        );
    }
}
