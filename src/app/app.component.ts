import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showProductDrawer = false;

  toggleDrawer() {
    if (this.showProductDrawer) {
      this.showProductDrawer = false;
    }
    else {
      this.showProductDrawer = true;
    }
  }
}
