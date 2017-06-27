import {
    SET_ERROR,
    DISMISS_ERROR,
    AUTHENTICATE,
    LOGOUT,
    GROUPS_FETCH,
    GROUPS_FETCH_FULFILLED,
    SUBUNITS_FETCH,
    SUBUNITS_FETCH_FULFILLED,
    IDOLS_FETCH,
    IDOLS_FETCH_FULFILLED,
    SURVEYS_FETCH,
    SURVEYS_FETCH_FULFILLED,
    RESPONSES_FETCH,
    RESPONSES_FETCH_FULFILLED
} from '../constants/admin';

export const setError = error => ({ type: SET_ERROR, error });
export const dismissError = () => ({ type: DISMISS_ERROR });

export const authenticate = () => ({ type: AUTHENTICATE });
export const logout = () => ({ type: LOGOUT });

export const groupsFetch = () => ({ type: GROUPS_FETCH });
export const groupsFetchFulfilled = groups => ({ type: GROUPS_FETCH_FULFILLED, groups })

export const subunitsFetch = () => ({ type: SUBUNITS_FETCH });
export const subunitsFetchFulfilled = subunits => ({ type: SUBUNITS_FETCH_FULFILLED, subunits });

export const idolsFetch = () => ({ type: IDOLS_FETCH });
export const idolsFetchFulfilled = idols => ({ type: IDOLS_FETCH_FULFILLED, idols });

export const surveysFetch = () => ({ type: SURVEYS_FETCH });
export const surveysFetchFulfilled = surveys => ({ type: SURVEYS_FETCH_FULFILLED, surveys });

export const responsesFetch = id => ({ type: RESPONSES_FETCH, id });
export const responsesFetchFulfilled = responses => ({ type: RESPONSES_FETCH_FULFILLED, responses });