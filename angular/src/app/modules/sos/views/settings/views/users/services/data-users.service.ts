import { Injectable } from '@angular/core';
import { User } from '../../../../../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class DataUsersService {

  constructor() { }

  user: User = new User();

}