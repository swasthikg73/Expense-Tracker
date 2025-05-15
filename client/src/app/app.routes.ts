import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BudgetDetailsComponent } from './pages/budget-details/budget-details.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: 'details/:id',
        component: BudgetDetailsComponent,
        canActivate: [authGuard]

    },
    {
        path: 'create-account',
        component: CreateAccountComponent
    }
];
