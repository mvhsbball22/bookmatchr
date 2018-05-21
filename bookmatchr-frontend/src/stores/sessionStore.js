//experimentalDecorators

import { observable, action, computed } from 'mobx';

class SessionStore {
    @observable authUser = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action setAuthUser = authUser => {
        this.authUser = authUser;
    }

    @computed get
    getUserId() {
        return this.authUser.uid;
    } 
}

export default SessionStore;

