import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class DialogComponent {
  readonly dialog = inject(MatDialog);

  openDialog(): MatDialogRef<DialogAnimations> {
    return this.dialog.open(DialogAnimations, {
      width: '250px',
      enterAnimationDuration:0,
      exitAnimationDuration:0,
      disableClose: false,
    });
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  template: '<h2 mat-dialog-title> El juego termino </h2> <mat-dialog-content> ¿Deséas volver a jugar? </mat-dialog-content> <mat-dialog-actions> <button (click)="replay()" mat-button mat-dialog-close>Jugar</button> <button (click)="exit()" mat-button mat-dialog-close cdkFocusInitial>Salir</button> </mat-dialog-actions>',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimations {
  readonly dialogRef = inject(MatDialogRef<DialogAnimations>);

  exit(){
    this.dialogRef.close(false);
  }

  replay(){
    this.dialogRef.close(true);
  }
  
}