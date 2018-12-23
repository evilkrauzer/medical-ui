import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from './state';
import PropTypes from 'prop-types';
import './styles.scss';

const states = {
    alreadyJoin: 0,
    started:1,
    notStarted:2,
    finished:3
}

export default class UserApp extends Component {
    static propTypes = {
        studies: PropTypes.array,
        currentStudy: PropTypes.object,

        onChooseStudy: PropTypes.func,
        onSendDataToStudy: PropTypes.func,
        onJoinToStudy: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {parameters: {}}
    }
    
    handleParameterChange = ev => {
        const parameters = this.state.parameters;
        parameters[ev.target.name] = ev.target.value;
        this.setState({parameters: parameters});
    }
    renderHeader() {
        return (
            <div className="header">
                <div className="layout-start">
                    <div className="header-name">
                        <div className="name-icon">
                        <svg className='icon-svg' height="20" viewBox="0 0 1792 1792" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M1280 1024h305q-5 6-10 10.5t-9 7.5l-3 4-623 600q-18 18-44 18t-44-18l-624-602q-5-2-21-20h369q22 0 39.5-13.5t22.5-34.5l70-281 190 667q6 20 23 33t39 13q21 0 38-13t23-33l146-485 56 112q18 35 57 35zm512-428q0 145-103 300h-369l-111-221q-8-17-25.5-27t-36.5-8q-45 5-56 46l-129 430-196-686q-6-20-23.5-33t-39.5-13-39 13.5-22 34.5l-116 464h-423q-103-155-103-300 0-220 127-344t351-124q62 0 126.5 21.5t120 58 95.5 68.5 76 68q36-36 76-68t95.5-68.5 120-58 126.5-21.5q224 0 351 124t127 344z"></path></svg>                        </div>
                        <div className="title">Warm Guys Company inc.</div>
                    </div>
                </div>
            </div>
        );
    }

    getStudyStateColor(state){
        switch (state){
            case states.alreadyJoin:
                return ' joined';
            case states.notStarted:
                return ' not-started';
            case states.started:
                return ' started'
            case states.finished:
                return ' finished'
            default:
                return ' unknown';
        }
    }

    renderStudy = study => {
        let itemClasses = 'study-item';
        let iconClass = 'study-icon'+ this.getStudyStateColor(study.state);


        if(this.props.currentStudy && this.props.currentStudy.contractId === study.contractId){
            itemClasses += ' is-selected';
        }
        

        return (
            <li className={itemClasses} onClick={()=>this.props.onChooseStudy(study)}>
                <div className={iconClass}></div>
                <div className='study-name'>{study.name}</div>
            </li>
        )
    }


    renderStudies = studies =>  {
        return (
            <div className='studies-list-container'>
                    <div className='studies-list-header'>
                        <h3>List of trials</h3>
                    </div>
                    <div className='studies-container'>
                        <ul className='studies-list'>
                            {this.props.studies? this.props.studies.map((study)=>this.renderStudy(study))
                            : null}
                        </ul>
                    </div>
            </div>
        )
    }

    renderStudyParameter(parameter) {
        return (
            <li>
                <span>{parameter}</span>
            </li>
        )
    }

    renderStudyParameterInput(parameter, index) {
        return (
            <li className='study-parameter'>
                <span>{index+1}. {parameter}</span>
                <input name={parameter} onChange={this.handleParameterChange} className='parameter-input'></input>
            </li>
        )
    }

    renderStudyParameters(study){
        return (
            <div className='study-parameters'>
                    <span>During the trial, please, fill all forms and send your data to blockchain =): </span>
                    <ul>
                        {study.params.map((parameter)=>this.renderStudyParameter(parameter))}
                    </ul>
                </div>
        );
    }

    renderStudyParametersInput(study){
        return (
            <div className='study-parameters'>
                    <span>Заполните следующие поля: </span>
                    <ul className='parameters-inputs'>
                        {study.params.map((parameter, i)=>this.renderStudyParameterInput(parameter, i))}
                    </ul>
                </div>
        );
    }


    renderStudyActions(study){

        const alreadyJoin = study.state === states.alreadyJoin;
        return (
            <div className='study-actions'>
              {study.state !== states.started && study.state !== states.finished? 
              (
                <button disabled={alreadyJoin} className='join-button' 
                onClick={()=>this.props.onJoinToStudy(study.contractId)}>
                {alreadyJoin? 'You are already in!': 'Join in!'}
              </button>): null}

              {study.state === states.started? 
              (
                  <button disabled={alreadyJoin} className='send-data-button' 
                  onClick={()=>this.props.onSendDataToStudy(study.contractId, this.state.parameters)}>
                  Отправить данные
                </button>
              )
              :null}
            </div>
        );
    }

    getStudyStateText(state){
        switch (state){
            case states.alreadyJoin:
                return 'You are already joined!';
            case states.notStarted:
                return 'Registration in progress...';
            case states.started:
                return 'Clinical trial in progress'
            case states.finished:
                return 'Research completed!';
            default:
                return 'unknown'
        }
    }

    renderStudyHeader(study){
        return (
            <div className='study-header'>
            <div className='study-first-header'>
                <h1>Clinical trial {study.contractId}
                </h1>
            </div>
            <div className='study-second-header'>
                <h2>{study.name} ({this.getStudyStateText(study.state)})</h2>
            </div>
            <hr></hr>
        </div>
     );
    }

    renderStudyDescription(study){

        return (
            <div className='study-description'>
                {this.renderStudyHeader(study)}
                <div className='study-description-body'>
                    <div className='study-description-text'><p>{study.description}</p></div>
                </div>
                {study.state === states.started? this.renderStudyParametersInput(study):
                    this.renderStudyParameters(study)}
                {this.renderStudyActions(study)}
            </div>
        );
    }

    renderHelloPage(){
        return (
            <div className='study-header'>
            <div className='study-first-header'>
                <h1>Welcome!
                </h1>
            </div>
            <div className='study-second-header'>
                <h2>Choose clinical trial to enter</h2>
            </div>
            <hr></hr>
            </div>
        )
    }

    render() {
        return (
            <div className='app-container'>
                {this.renderHeader()}
                <div className='container-body'>
                    {this.renderStudies()}
                    <div className='right-body'>
                        {this.props.currentStudy? 
                            this.renderStudyDescription(this.props.currentStudy)
                            :this.renderHelloPage()
                        }
                    </div>
                </div>
            </div>
        );
    }
}
