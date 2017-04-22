export class detectUrl {
    static currentDomainName() {
        //This regex will remove ".com" or "www" from hostname and at least for "www.github.com", will return "github"
        let regEx = /[.]com|www/g;
        return window.location.hostname.replace(regEx, "")
    }
}
