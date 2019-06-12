import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../shared/services/user/user.service';
import { GlobalService } from '../../shared/services/global/global.service';
import { Router } from '@angular/router';
import { ChartHomeComponent } from "./chart/chart.component";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PedidoService } from 'src/app/modules/sos/shared/services/pedidos/pedidos.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  sessionToken;
  user;
  breakpoint;
  tagSelectedHistory: number = 1;
  markChart: string = 'pedido';
  timeChart: string = 'm';
  
  @Output()
  totalRecords: EventEmitter<string> = new EventEmitter<string>();

  cards = [
    { title: 'Card 1', cols: 1, rows: 1 },
    { title: 'Card 1', cols: 1, rows: 1 },
    { title: 'Card 1', cols: 1, rows: 1 }
  ];

  constructor(private userService: UserService,
              private globalService: GlobalService,
              private pedidoService: PedidoService,
              private router: Router){
    this.sessionToken = localStorage.getItem('arcs.sessionToken');
  }

  ngOnInit() {
    this.breakpoint = (window.outerWidth <= 400) ? 3 : 1;
    this.globalService.getUser().then(user => {
        this.user = user;
      }
    );

  }

  ngOnChanges() {

  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 3 : 1;
  }

  getSession(){
    this.userService.getSession("arcs.cristhiamaya", "quichi").subscribe((res)=>{
      this.sessionToken = res.sessionToken;
      this.user = res.usuario;
      this.globalService.setSession(res);
    });
  }

  setNewSession(){
    localStorage.setItem("arcs.sessionToken", this.sessionToken);
    // this.globalService.usuario = this.session.usuario;
  }

  useSession(){
    this.userService.useSession().subscribe((response)=>{
      console.log("response", response);
    });
  }

  deleteSession(){
    this.sessionToken = "";
    this.user = "";
    this.globalService.deleteSession();
  }

  refreshSession(){
    this.userService.refreshSession().subscribe(({user, sessionToken, sessionExpiresIn, sessionCreatedAt})=>{
      localStorage.setItem('arcs.sessionToken', sessionToken);
      localStorage.setItem('arcs.sessionExpiresIn', sessionExpiresIn);
      localStorage.setItem('arcs.sessionCreatedAt', sessionCreatedAt);
      localStorage.setItem('arcs.user', JSON.stringify(user));      
    });
  }

  setHistoryTab(number: number): void {
    this.tagSelectedHistory = number;
  }
  
  goTo(): void {
    this.router.navigate([`/sos/pedidos`]);
  }

  setChartTab(mark: string): void {
    this.markChart = mark;
  }

  setChartTimeTab(time: string): void {
    this.timeChart = time;
  }

}
