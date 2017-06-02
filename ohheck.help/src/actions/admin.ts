import { SET_ERROR, DISMISS_ERROR, AUTHENTICATE, LOGOUT } from '../constants/admin';

export const setError = error => ({ type: SET_ERROR, error });
export const dismissError = () => ({ type: DISMISS_ERROR });
export const authenticate = () => ({ type: AUTHENTICATE });
export const logout = () => ({ type: LOGOUT });