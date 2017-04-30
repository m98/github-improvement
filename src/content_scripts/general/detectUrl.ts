export class detectUrl {
    static isGitHub() {
        return this.currentDomainName('all') === 'github.com';
    }

    static currentDomainName(type: string) {
        let currentLocation = window.location.hostname;
        if (type === 'all') {
            return currentLocation;
        } else if (type === 'domain') {
            let regEx: RegExp = /[.]com|www|[https://]|[http://]/g;
            //This regex will remove ".com" or "www" from hostname and at least for "www.github.com", will return "github"
            return currentLocation.replace(regEx, "")
        }

    }

    static getUrlInfo(url: string, type: string = "domain") {
        if (type === 'domain') {
            url = url.split('?')[0];
            if (url.split('.').length === 3) {
                url = url.split('.')[1];
            } else if (url.split('.').length == 2) {
                url = url.split('.')[0];
            }

            let regEx = /[.]com|www|https|http|:|\//g;
            return url.replace(regEx, "");

        } else if (type === 'pure') {
            //pure type will return the domain-Ex: https://www.google.com?q=something => www.google.com
            url = url.split("?")[0]; //First remove all query strings.
            let regEx = /https|http|:|\/\//g;
            url = url.replace(regEx, "");
            return url.split('/')[0]
        }
    }

}



