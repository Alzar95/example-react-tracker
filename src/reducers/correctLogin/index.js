import * as reducerType from '../../unit/reducerType';

let initialState = false;

const correctLogin = (state = initialState, action) => {
    switch(action.type) {
        case reducerType.CORRECT_LOGIN:
            return action.payload.correctLogin;
        default:
            return state;
    }
};

export default correctLogin;