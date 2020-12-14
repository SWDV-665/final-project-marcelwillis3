import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'
import { PCBuildServiceProvider } from '../../providers/pcbuilder-service/pcbuilder-service'
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "PC Building Advisor";
  components = [];
  errorMessage: string;

  constructor(public navCtrl: NavController,
              private iab: InAppBrowser,
              public dataService: PCBuildServiceProvider,
              public inputDialogService: InputDialogServiceProvider) {
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

  openStoreBrowser(){
    this.iab.create('https://www.newegg.com/Components/Store/ID-1')
  }

}
