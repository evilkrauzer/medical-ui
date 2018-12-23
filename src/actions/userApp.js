
export const CHOOSE_STUDY='CHOOSE_STUDY';

export const chooseStudy = study => dispatch => {
    return dispatch({type: CHOOSE_STUDY, study})
}