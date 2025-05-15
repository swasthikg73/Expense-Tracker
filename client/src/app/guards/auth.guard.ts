import { UserService } from './../services/user.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const userService = inject(UserService);

  if (!userService.isLoggedIn()) {
    // console.log("Loggedin: ", userService.isLoggedIn());

    router.navigateByUrl('create-account');
    return false;
  }
  return true;
};
