import { Component } from '@angular/core';

interface Drawer {
  drawer: boolean,
  reload: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showProductDrawer = false;
  loading = false;

  toggleDrawer() {
    if (this.showProductDrawer) {
      this.showProductDrawer = false;
    }
    else {
      this.showProductDrawer = true;
    }
  }

  reloadTable() {
    if (this.loading) {
      this.loading = false;
    }
    else {
      this.loading = true;
    }
  }

  receiverFeedBack(feedBackIsOpen: Drawer) {
    this.showProductDrawer = feedBackIsOpen.drawer;
    this.loading = feedBackIsOpen.reload;
  }

  receiverLoading(loading: boolean) {
    this.loading = loading;
  }
}
