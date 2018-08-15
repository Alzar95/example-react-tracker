import * as reducerType from '../../unit/reducerType';

let initialState = [];

const loadUsers = (state = initialState, action) => {
    switch(action.type) {
        case reducerType.LOAD_USERS_SUCCESS:
            return action.payload.openSpellWindow;
        default:
            return state;
    }
};

export default loadUsers;