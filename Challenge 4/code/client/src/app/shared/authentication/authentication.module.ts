import { UserAuthService } from './user-auth/user-auth.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        RegisterComponent,
        LoginComponent,
        LogoutComponent
    ],
    providers: [
        UserAuthService
    ],
    exports: [
        RegisterComponent,
        LoginComponent,
        LogoutComponent
    ]
})
export class AuthenticationModule { }
