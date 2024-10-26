import { Auth } from '@angular/fire/auth';
import { getAuth, signOut } from "firebase/auth";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Firestore, collection, addDoc, Timestamp, query, where, getDocs, orderBy } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private adminStatusSubject = new BehaviorSubject<boolean>(
    JSON.parse(localStorage.getItem('isAdmin') || 'false')  // Inicializa con el valor guardado
  );
  adminStatus$ = this.adminStatusSubject.asObservable();
  user!: object | null;
  auth!: Auth;

  constructor(private firestore: Firestore) {
    this.auth = getAuth();
    // Verificar el estado de admin al iniciar el servicio
    this.checkInitialAdminStatus();
  }

  private async checkInitialAdminStatus() {
    // Si hay un usuario autenticado, verifica su estado de admin
    if (this.auth.currentUser) {
      await this.isAdmin();
    }
  }

  public isLoggedIn() {
    return this.auth.currentUser;
  }

  public getCurrentUSername() {
    return this.auth.currentUser?.email?.split('@')[0];
  }

  public getCurrentUserEmail() {
    return this.auth.currentUser?.email;
  }

  public async isAdmin(): Promise<boolean> {
    try {
      if (!this.auth.currentUser) {
        this.setAdminStatus(false);
        return false;
      }

      const adminsRef = collection(this.firestore, 'admins');
      const q = query(adminsRef, where('user', '==', this.auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      const isAdmin = !querySnapshot.empty;
      this.setAdminStatus(isAdmin);
      return isAdmin;
    } catch (error) {
      console.error('Error checking admin status:', error);
      this.setAdminStatus(false);
      return false;
    }
  }

  private setAdminStatus(status: boolean) {
    localStorage.setItem('isAdmin', JSON.stringify(status));
    this.adminStatusSubject.next(status);
  }

  getAdminStatus(): boolean {
    return JSON.parse(localStorage.getItem('isAdmin') || 'false');
  }

  LogOut() {
    this.setAdminStatus(false);
    signOut(this.auth);
  }
}