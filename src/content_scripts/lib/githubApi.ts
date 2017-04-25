//https://api.github.com/
import {functions} from "./functions"
export class githubApi {
    static api = "https://api.github.com/";

    static userReceivedEvents = function (username: string = functions.getCookie('dotcom_user')) : string {
        if(!username){
            username=functions.getCookie('dotcom_user');
        }
        //return user received events URL.  Ex: https://api.github.com/users/m98/received_events
        return "users/" + username + "/received_events";
    }
}