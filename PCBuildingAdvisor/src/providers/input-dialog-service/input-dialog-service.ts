import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { PCBuildServiceProvider } from '../pcbuilder-service/pcbuilder-service';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(public alertCtrl: AlertController, public dataService: PCBuildServiceProvider) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  showPrompt(component?, index?){
    const prompt = this.alertCtrl.create({
      title: component ? 'Edit Component' : 'Add Component',
      message: component ? 'Edit component in list' : 'Add component to list',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: component ? component.name : null
        },
        {
          name: 'type',
          placeholder: 'Type',
          value: component ? component.type : null
        },
        {
          name: 'socket',
          placeholder: 'Socket',
          value: component ? component.socket : null
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked', data);
            if (index !== undefined){
              component.name = data.name;
              component.type = data.type;
              component.socket = data.socket;
              this.dataService.editComponent(component, index);
            }
            else{
              this.dataService.addComponent(data);
            }
          }
        },
        {
          text: 'OK',
          handler: data => {
            console.log('OK clicked', data);
          }
        }
      ]
    });
    prompt.present();

  }

}
