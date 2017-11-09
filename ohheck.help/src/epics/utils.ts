import 'whatwg-fetch';
import { ModelBase } from 'types/commontypes';
import { Observable } from 'rxjs/Observable';
import { logoutWithNote, setNotification } from 'actions/admin';
import { Notification } from 'types/admin';

export type serverResp = {
    success: boolean;
    message: string;
};

const makeHeader = (token?: string, contenttype?: string, accept?: string) => {
    let headers = new Headers();

    if (token) {
        headers.append('Authorization', `bearer ${token}`);
    }

    if (contenttype) {
        headers.append('Content-Type', contenttype);
    }

    if (accept) {
        headers.append('Accept', accept);
    }

    return headers;
}

export const get = <T>(endpoint: string, authToken?: string): Observable<T> =>
    Observable.from(
        fetch(endpoint, {
            method: 'GET',
            headers: makeHeader(authToken, 'application/json', 'application/json')
        }).then<T>(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                throw new Error(response.status.toString());
            } else {
                throw new Error(response.statusText);
            }
        })
    );

export const post = <T>(endpoint: string, body?: {}, authToken?: string): Observable<T> =>
    Observable.from(
        fetch(endpoint, {
            method: 'POST',
            headers: makeHeader(authToken, 'application/json', 'application/json'),
            body: JSON.stringify(body)
        }).then<T>(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                throw new Error(response.status.toString());
            } else {
                throw new Error(response.statusText.toString());
            }
        })
    );

export const genInner = <T>(action, state, endpoint: string, callback, errortext: string) =>
    get<T>(endpoint, state.getState().admin.bearer)
        .map(response => callback(response))
        .catch(error => {
            if (error.message === '401') {
                return Observable.of(logoutWithNote(Notification.info('Session expired. Please log in again.', 'epics', 'epics')));
            } else {
                return Observable.of(setNotification(Notification.error(errortext, 'epics', 'epics')))
            }
        });

export const genEpic = <T>(action$, state, type: string, endpoint: string, callback, errortext: string) =>
    action$.ofType(type).mergeMap(action => genInner(action, state, endpoint, callback, errortext));