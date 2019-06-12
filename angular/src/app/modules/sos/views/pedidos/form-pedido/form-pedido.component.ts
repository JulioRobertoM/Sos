
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource, MatSortable, MatSnackBar} from '@angular/material';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, state, style, transition} from '@angular/animations';
import {trigger} from '@angular/animations';
import { GlobalService } from 'src/app/modules/sos/shared/services/global/global.service';
import { UTILSService } from 'src/app/modules/sos/shared/services/utils/utils.service';
import { PedidoService } from 'src/app/modules/sos/shared/services/pedidos/pedidos.service';
import { Pedido } from 'src/app/modules/sos/shared/models/Pedidos';
import { User } from 'src/app/modules/sos/shared/models/User';
import { FormPedidosResolver } from 'src/app/modules/sos/views/pedidos/form-pedido/form-pedido.resolver';

@Component({
  selector: 'app-form-pedido',
  templateUrl: './form-pedido.component.html',
  styleUrls: ['./form-pedido.component.scss'],
})

export class FormPedidosComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog,
              private http: HttpClient,
              private globalService: GlobalService,
              private UTILS: UTILSService,
              private rsoResolver: FormPedidosResolver,
              private rsoService: PedidoService,
              public activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar) {

    this.rsoForm = this.rsoResolver.pedido ? this.rsoResolver.pedido : new Pedido();

  }

  user: User = null;

  rsoForm: Pedido = null;

  workSpace;

  ngOnInit() {

    this.globalService.getUser().then(user => {
      this.user = user;
      /// console.log(this.user);
    });

    this.workSpace = this.activatedRoute.parent.snapshot.paramMap.get('workSpace');

    // console.log(this.rsoForm);

  }

  setNewRso(event) {
    this.rsoForm = event;
  }

}
