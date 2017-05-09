//The API that calls functions needed.
import {API} from './general/API';

//If this web page is GitHub run the script bellow:
$(document).ready(function () {
    console.warn("Document is ready!");
    let mainClass = new API();
    mainClass.getUserReceivedEvents();
});

