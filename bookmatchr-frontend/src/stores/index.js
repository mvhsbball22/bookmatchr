import { configure } from 'mobx';

import SessionStore from './sessionStore';
import UserStore from './userStore';
import BookStore from './bookStore';

configure({ enforceActions: true });

class RootStore {
  constructor() {
    this.sessionStore = new SessionStore(this);
    this.userStore = new UserStore(this);
    this.bookStore = new BookStore(this);
  }
}

export default new RootStore();