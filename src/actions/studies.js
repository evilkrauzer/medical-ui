export const getStudies = studyId => dispatch => {
    fetch('http://localhost:50582/api/researche/all/?authKey='+localStorage.getItem('auth-key'))
    .then(function(response) { return response.json(); })
    .then(function(data){
      dispatch({type:"GET_STUDIES_SUCCESS", studies:data});
    })
}
     


export const JOIN_TO_STUDY_SUCCESS='JOIN_TO_STUDY_SUCCESS'
export const joinToStudy = studyId => dispatch => {
     fetch('http://localhost:50582/api/researche/user/join/'+studyId+'/?authKey='+localStorage.getItem('auth-key'), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })   
}

export const sendDataToStudy = (studyId, parameters) => dispatch => {
    const indications = parameters;
    if(indications){
      indications['ResearchId'] = studyId;
    }
    return fetch('http://localhost:50582/api/researche/user/add/?authKey='+localStorage.getItem('auth-key'), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...indications
        })
      })   
}
