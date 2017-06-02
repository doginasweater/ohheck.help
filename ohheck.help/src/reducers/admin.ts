import { SET_ERROR, DISMISS_ERROR, AUTHENTICATE, LOGOUT } from '../constants/admin';

interface IAdminStore {
    error: boolean;
    errorMessage: string;
    authenticated: boolean;
}

const AdminInitial: IAdminStore = {
    error: false,
    errorMessage: '',
    authenticated: false
};

export function admin(state = AdminInitial, action) {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.error
            };
        case DISMISS_ERROR:
            return {
                ...state,
                error: false,
                errorMessage: ''
            };
        case AUTHENTICATE:
            return {
                ...state,
                authenticated: true
            };
        case LOGOUT:
            return {
                ...state,
                authenticated: false
            };
        default:
            return state;
    }
}