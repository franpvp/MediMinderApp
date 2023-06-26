import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { StorageService } from 'src/app/services/storage-service/storage.service';

import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ApirestService } from 'src/app/services/apirest-service/apirest.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{



  constructor(private menuController : MenuController) {
  }

  ngOnInit() {
  }

  closeMenu() {
    this.menuController.enable(true, 'main-content');
  }

}
