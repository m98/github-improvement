import {icons} from './icons';
import {functions} from './functions';

export class templateCreator {
    static userReceivedEvents(data: any) {
        //API doc: https://developer.github.com/v3/activity/events/types/
        let HTMLTemplate: string = '<div class="received-events">';
        for (let i = 0; i < data.length; i++) {
            let currentIndex: any = data[i];

            HTMLTemplate +=
                '<div>' +
                '<a href="https://www.github.com/' + currentIndex.actor.login + '">' +
                '<img src="' + currentIndex.actor.avatar_url + '?v=3&s=40"/>' +
                '<span>' + currentIndex.actor.display_login + '</span>' +
                '</a>';

            if (currentIndex.type === 'WatchEvent') {
                HTMLTemplate += icons.star;
                HTMLTemplate += ''
            } else if (currentIndex.type === 'ForkEvent') {
                HTMLTemplate += icons.fork;
                HTMLTemplate += functions.createLink('https://www.github.com/', currentIndex.repo.name, "span");
            } else if (currentIndex.type === 'MemberEvent') {

            } else if (currentIndex.type === '')

                HTMLTemplate += '</div>';
        }
        HTMLTemplate += '</div>'; //.received-events div
        return HTMLTemplate;
    }

}