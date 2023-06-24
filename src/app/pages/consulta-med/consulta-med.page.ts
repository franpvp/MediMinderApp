import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { ApirestService } from 'src/app/services/apirest-service/apirest.service';

@Component({
  selector: 'app-consulta-med',
  templateUrl: './consulta-med.page.html',
  styleUrls: ['./consulta-med.page.scss'],
})
export class ConsultaMedPage implements OnInit {

  constructor(private api: ApirestService, private menuController: MenuController) { }

  ngOnInit() {
  }

  closeMenu() {
    this.menuController.enable(true, 'main-content');
  }

}
