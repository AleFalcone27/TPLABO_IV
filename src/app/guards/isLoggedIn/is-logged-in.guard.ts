import { CanActivateFn,Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const isLoggedInGuard: CanActivateFn = async (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const isLoggedIn = await authService.isLoggedIn()
    
    if (isLoggedIn) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  } catch (error) {
    console.error('Error en IsLoggedIn guard:', error);
    router.navigate(['/home']);
    return false;
  }
};
