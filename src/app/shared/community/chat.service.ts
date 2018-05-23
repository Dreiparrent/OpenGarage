import { Injectable } from '@angular/core';
import { Payments, IUser } from './community-interfaces';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    // _sampleChat = new Subject<IChat[]>();
    _sampleChat = new BehaviorSubject<IChat[]>(sampleChat);
    _currentMessages: IMessage[];
    _messages = new Subject<IMessage[]>();
    set currentMessages(messages: IMessage[]) {
        this._currentMessages = messages;
        this._messages.next(messages);
    }
    get currentMessages() {
        return this._currentMessages;
    }

    constructor() {
        // this._sampleChat.next(sampleChat);
    }

    getChats(): BehaviorSubject<IChat[]> {
        return this._sampleChat;
    }
    setMessages() {
        this.currentMessages = this._sampleChat.getValue()[0].messages;
    }
    getMessages(): Observable<IMessage[]> {
        return this._messages;
    }
    sendMessage(message: string): Promise<boolean> {
        const tmpPromise = new Promise<boolean>((resolve, reject) => {
            setTimeout(() => {
                this.currentMessages.push({
                    text: message,
                    user: 'You'
                });
                const rands = [false, true, true, true];
                const random = Math.floor(Math.random() * rands.length);
                resolve(rands[random]);
            }, 2000);
        });
        return tmpPromise;
    }
}
export interface IMessage {
    text: string;
    user: string;
}
export interface IChat {
    user: IUser;
    subject: string;
    messages: IMessage[];
    id: string;
    lastMessage?: IMessage;
}
const me: IUser = {
    name: 'Andrei Parrent',
    location: 'Denver',
    connections: 9,
    imgUrl: '/assets/img/photos/andrei.jpg'
};
const you: IUser = {
    name: 'you',
    location: 'Denver',
    connections: 9,
    imgUrl: '/assets/img/photos/andrei.jpg'
};
const sampleChat: IChat[] = [
    {
        id: 'fake auto id',
        subject: 'A message',
        messages: [
            {
                text: 'I wanted to talk to you about a bunch of stuff',
                user: 'Andrei Parrent'
            }
        ],
        user: me
    },
    {
        id: 'fake id 2',
        subject: 'test2',
        messages: [
            {
                text: 'test',
                user: 'user'
            }
        ],
        user: you
    }
];