import { CHOOSE_STUDY } from 'actions/userApp';

const userApp = (state={}, action) => {
    switch (action.type) {
     case CHOOSE_STUDY:{
         return {...state,
            currentStudy: action.study
        }
     }
      default:
        return state
    }
  }

  export default userApp
