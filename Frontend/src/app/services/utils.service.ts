import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

type toastPositions = 'top' | 'bottom' | 'middle';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private toastCtrl: ToastController) { }

  async createToast(message: string,
                    header: string = '',  
                    position: toastPositions = 'bottom', 
                    duration: number = 2000) {
    const toast = await this.toastCtrl.create({ header, message, position, duration });
    toast.present();
  }
}
