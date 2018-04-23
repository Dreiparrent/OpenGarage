import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../../../shared/community/community.service';
import { IProfile } from '../../../shared/community/community-interfaces';

@Component({
    selector: 'app-community-messages',
    templateUrl: './community-messages.component.html',
    styleUrls: ['./community-messages.component.scss']
})
export class CommunityMessagesComponent implements OnInit {

    ownName = 'Random Person';
    hoverNumber = -1;

    searchProfile: IProfile = {
        name: '',
        location: '',
        connections: 0,
        imgUrl: '',
        about: '',
        skills: [],
        passions: []
    };

    messages: IMessageDisplay[] = [
        {
            sender: 'Baxter Cochennet',
            message: 'This is the first message of the chat'
        },
        {
            sender: 'Andrei Parrent',
            message: 'I am asking who can help with accounting'
        },
        {
            sender: 'Random Person',
            message: 'Baxter can help'
        },
        {
            sender: 'Baxter Cochennet',
            message: 'I can help'
        },
    ];

    constructor(private comService: CommunityService) { }

    ngOnInit() {
    }

    nameClick(name: string) {
        this.comService.updateSearch([name], []);
    }

    mouseOver(i: number, name?: string) {
        this.hoverNumber = i;
        // TODO: fix this to use actual profile data if chosen
        if (name)
            this.searchProfile = this.comService.members.getValue().find(p => p.name === name);
        // $(this.profileElem.children[i]).addClass('text-primary');
    }
    mouseOut(i: number) {
        this.hoverNumber = -1;
    }

}
interface IMessageDisplay {
    message: string;
    sender: string;
}