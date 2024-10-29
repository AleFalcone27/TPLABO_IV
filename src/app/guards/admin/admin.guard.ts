import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const isAdmin = await authService.isAdmin();
    
    if (isAdmin) {
      return true;
    } else {
      router.navigate(['/home']);
      return false;
    }
  } catch (error) {
    console.error('Error en adminGuard:', error);
    router.navigate(['/home']);
    return false;
  }
};