import 'whatwg-fetch';
import { ModelBase } from 'types/commontypes';

export const get = <T>(endpoint: string, auth?: string) => {
    const authHeader = auth ? {
        'Authorization': `bearer ${auth}`
    } : {};

    return fetch(endpoint, {
        method: 'GET',
        headers: {
            ...authHeader,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then<T>(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    });
}