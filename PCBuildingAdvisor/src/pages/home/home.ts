import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PCBuildServiceProvider } from '../../providers/pcbuilder-service/pcbuilder-service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "PC Building Advisor";
  components = [];
  errorMessage: string;

  constructor(public navCtrl: NavController,
              public dataService: PCBuildServiceProvider) {
            dataService.dataChanged$.subscribe((dataChanged: boolean) => {
              this.loadComponents()
            });
  }

  ionViewWillEnter(){
    this.loadComponents();
  }

  loadComponents(){
    this.dataService.getComponents().subscribe(
      components => this.components = components,
      error => this.errorMessage = <any>error);
  }

}
