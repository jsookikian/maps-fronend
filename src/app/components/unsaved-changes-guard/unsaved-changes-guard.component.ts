import { Injectable } from '@angular/core';
import { Router, CanDeactivate } from '@angular/router';
import { EditComponent } from '../edit/edit.component';
@Injectable()
export class UnsavedChangesGuard implements CanDeactivate<EditComponent> {

  constructor(private router: Router) {}

  canDeactivate(component: EditComponent, deactivate) {
    // return window.confirm('You have unsaved changes. Still want to leave?');
    return deactivate;
  }
}