import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { PCBuildServiceProvider } from '../../providers/pcbuilder-service/pcbuilder-service'
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service'

@Component({
  selector: 'page-db',
  templateUrl: 'pc_components.html'
})
export class ComponentsPage {

  title = "PC Components Database";
  components = [];
  errorMessage: string;

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public dataService: PCBuildServiceProvider,
              public inputDialogService: InputDialogServiceProvider) {
            dataService.dataChanged$.subscribe((dataChanged: boolean) => {
              this.loadComponents()
            });
  }

  ionViewDidLoad(){
    this.loadComponents();
  }

  loadComponents(){
    this.dataService.getComponents().subscribe(
      components => this.components = components,
      error => this.errorMessage = <any>error);
  }

  removeComponent(id){
    this.dataService.removeComponent(id);
  }

  editComponent(component, index){
    console.log("Editing Component - ", component, index);
    const toast = this.toastCtrl.create({
      message: "Editing Component - " + index + "...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(component, index);
  }

  addComponent(){
    this.inputDialogService.showPrompt();
  }
}