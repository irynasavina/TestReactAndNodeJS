const serverUrl = "http://localhost:3006/";

export default class Ajax {
    static get = (url, params) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', serverUrl + url + '?' + params);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                }
                else {
                    reject('Server response: ' + xhr.status)
                }
            };
            xhr.send();
        });
    }

    static post = (url, params) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', serverUrl + url);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    resolve(xhr.responseText)
                } else {
                    reject('Server response: ' + xhr.status)
                }
            }
            xhr.send(params);
        });
    }
}