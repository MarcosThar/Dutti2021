import { Component, OnInit } from '@angular/core';
import { PATHS_FRONT } from 'src/app/constants/pathsFront';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  PATHS = PATHS_FRONT;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout = (): void => {
    this.authService.logout()
  }

}
