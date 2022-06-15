import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl;

export class User {
    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public image?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ){}

    get urlImage() {
        if( this.google ) {
            return this.image;
        }

        if( this.image ) {
            return `${baseUrl}/upload/users/${this.image}`;
        } else {
            return `${baseUrl}/upload/users/noimage`;
        }
    }
}