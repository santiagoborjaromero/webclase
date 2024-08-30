// angular import
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoginInterface } from 'src/app/interfaces/login.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly usuarioSvc = inject(UsuariosService);

  // public method
  SignInOptions = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];

  frmForm = new FormGroup({
    Nombre_Usuario: new FormControl('', [Validators.required]),
    Contrasenia: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    
  }

  login = () => {
    let data: LoginInterface = {
      Nombre_Usuario: this.frmForm.controls["Nombre_Usuario"].value,
      Contrasenia: this.frmForm.controls["Contrasenia"].value
    }
    this.usuarioSvc.login(data);
  }
}
