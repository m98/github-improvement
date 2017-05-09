//This is the main index, and design the API, the API will call from outside of this index.ts, out of general directory

///<reference path="../../../node_modules/@types/jquery/index.d.ts" />
///<reference path="../../../node_modules/@types/chrome/index.d.ts" />

import {detectUrl} from "./detectUrl";
import {URL} from "./url";
import {user} from './user';
import {templateCreator} from './templateCreator';

//API class is our main class which provides list of APIs to use:
export class API {
    constructor() {
        //Anything to run here?
    }

    public async getUserReceivedEvents() {
        if (!getUserReceivedEventsFlag) {
            var getUserReceivedEventsFlag: boolean;
        }


        if (detectUrl.isGitHub()) {
            let username = await user.username();
            $.ajax({
                dataType: 'json',
                url: URL.api + URL.userReceivedEvents(username),
                success: function (result) {
                    let HTMLTemplate: string = templateCreator.userReceivedEvents(result);

                    if (!getUserReceivedEventsFlag) {
                        $(".mt-4").prepend('<div id="dashboard-feed"></div>');
                    }

                    $("#dashboard-feed").append(HTMLTemplate);
                    getUserReceivedEventsFlag = true;
                }
            });
        }

    }


}


