import * as reducerType from '../../unit/reducerType';

let initialState = {};

const currentUser = (state = initialState, action) => {
    switch(action.type) {
        case reducerType.CURRENT_USER:
            return action.payload.dataUser;
        default:
            return state;
    }
};

export default currentUser;