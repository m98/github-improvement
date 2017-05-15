//This is the main index, and design the API, the API will call from outside of this index.ts, out of general directory

///<reference path="../../../node_modules/@types/jquery/index.d.ts" />
///<reference path="../../../node_modules/@types/chrome/index.d.ts" />

import {detectUrl} from "./detectUrl";
import {URL} from "./url";
import {user} from './user';
import {templateCreator} from './templateCreator';
import {icons} from "./icons";

//API class is our main class which provides list of APIs to use:
export class API {
    constructor() {
        //Anything to run here?
    }

    public async getUserReceivedEvents(page: number) {
        if (detectUrl.isHomePage()) {
            let username = await user.username();
            $.ajax({
                dataType: 'json',
                url: URL.api + URL.userReceivedEvents(username) + '?page=' + page,
                success: function (result) {
                    let HTMLTemplate: string = templateCreator.userReceivedEvents(result);

                    if (page == 1) {
                        $(".mt-4").prepend(
                            '<div id="dashboard-feed"></div>' +
                            '<button class="new-ajax-pagination">' +
                            '<span>More</span>' +
                            icons.loading +
                            '</button>'
                        );
                    }

                    $(".new-ajax-pagination").removeClass("loading-button");

                    $("#dashboard-feed").append(HTMLTemplate);
                }
            });
        }
    }

    public askForStar() {

        return templateCreator.arrowDialog(
            "If you liked the project, please give us an <b>Star</b>",
            'top',
            'position:absolute !important; top:50px; width:365px; text-align:center;',
            'dialog-askForStar'
        );
    }
}


