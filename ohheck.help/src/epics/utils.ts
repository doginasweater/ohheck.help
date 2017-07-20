import 'whatwg-fetch';
import { ModelBase } from 'types/commontypes';
import { Observable } from 'rxjs/Observable';

const makeHeader = (token?: string) => {
    return token ? {
        'Authorization': `bearer ${token}`
    } : {};
}

export const get = <T>(endpoint: string, authToken?: string) => 
    Observable.from(fetch(endpoint, {
        method: 'GET',
        headers: {
            ...makeHeader(authToken),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then<T>(response => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 401) {
            throw new Error(response.status.toString());
        } else {
            throw new Error(response.statusText);
        }
    }));

export const post = <T>(endpoint: string, body?: {}, authToken?: string) =>
    Observable.from(fetch(endpoint, {
        method: 'POST',
        headers: {
            ...makeHeader(authToken),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    }).then<T>(response => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 401) {
            throw new Error(response.status.toString());
        } else {
            throw new Error(response.statusText)
        }
    }));