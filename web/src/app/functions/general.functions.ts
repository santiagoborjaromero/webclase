import { Injectable, inject } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class General {

    encriptar(texto):string{
        if (texto){
            return btoa(texto)
        }
        return "";
    }

    desencriptar(texto):string{
        if (texto){
            return atob(texto)
        }
        return ""
    }


    toast(msg: string){
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: msg
          });
    }
}
