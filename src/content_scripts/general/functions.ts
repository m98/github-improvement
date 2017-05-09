export class functions {
    //here we will define simple and public/general functions that we might need them constantly
    static getCookie(cname: string): string {
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

    static createLink(url: string, title: string, wrapWith: string, before: string = '', after: string = '') {
        let wrapElement: any = [{start: '', end: ''}];
        if (wrapWith) {
            wrapElement['start'] = '<' + wrapWith + '>';
            wrapElement['end'] = '</' + wrapWith + '>';
        }
        return '<a href="' + url + '">' + before + wrapElement['start'] + title + wrapElement['end'] + after + '</a>';

    }

    static createImageElement(url: string, attributes: string = '') {
        return '<img src="' + url + ' ' + attributes + '"/>';
    }
}