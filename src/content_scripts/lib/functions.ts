export class functions {
    //In functions class, we will define simple and public/general functions that we might need them constantly
    static getCookie(cname: string) : string {
        //The function source: https://www.w3schools.com/js/js_cookies.asp
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";

    }
}