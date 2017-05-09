export class user {
    static username = function () {
        //Return username, username is saved in a cookie named "dotcom_user"
        return new Promise<string>(resolve => {
            chrome.runtime.sendMessage({getCookie: "dotcom_user"}, function (response) {
                resolve(response);
            });
        });
    }
}

