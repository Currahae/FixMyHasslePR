export class User {
    constructor(id, username, email, avatar, count_of_posts) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.avatar = avatar;
        this.count_of_posts = count_of_posts;
    }

    showData() {
        return [this.id, this.username, this.email, this.count_of_posts]
    }
}