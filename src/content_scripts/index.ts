//The API that calls functions needed.
import {API} from './general/API';
import {detectUrl} from './general/detectUrl'
//If this web page is GitHub run the script bellow:
$(document).ready(function () {
    let mainClass = new API();

    if (detectUrl.isHomePage()) {
        mainClass.getUserReceivedEvents(1);

        let pagination: number = 1;
        $("body").on("click", ".new-ajax-pagination", function () {
            pagination++;
            mainClass.getUserReceivedEvents(pagination);
            $(this).addClass("loading-button");
        });
    }

    if (detectUrl.isOurRepo) {

        chrome.storage.sync.get("askForStar", function (result) {
            console.log(result);
            if (!result.askForStar) {
                //If this is the first time the user is in this page, ask to star the project
                $(".pagehead-actions").append(mainClass.askForStar());
                setTimeout(function () {
                    $(".dialog-askForStar").fadeOut();
                }, 5000);

                chrome.storage.sync.set({'askForStar': true}, function () {
                });

            }
        });
    }
});

