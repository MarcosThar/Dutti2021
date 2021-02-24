import { Component, ElementRef, OnInit } from '@angular/core';
import { PATHS_FRONT } from 'src/app/constants/pathsFront';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class PrincipalComponent implements OnInit {
  PATHS = PATHS_FRONT;
  show: boolean;

  constructor(private authService: AuthService,
    private _eref: ElementRef) { }

  ngOnInit(): void {
  }

  logout = (): void => this.authService.logout()

  toggleMenu = (force?: boolean): boolean => this.show = force !== undefined ? force : !this.show

  onClick(event): void {
    if (!this._eref.nativeElement.contains(event.target))
      this.toggleMenu(false)
  }

}
