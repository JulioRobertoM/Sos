export class QuerysServerOutside {

  cartera;

  constructor(){
  }

  getAuxCartera(fechaini:string, fechafin:string, cliente:string): string {
    this.cartera = 'select "SALDO ANTERIOR" as nombretd, mov.numnitcar, mov.femovcar as fechacar, '+
      '"" as docucar, '+
      'cast(sum(if(tip.naturtd = "D",mov.valorcar,mov.valorcar * 0 )) AS UNSIGNED) as debito,'+
      'cast(sum(if(tip.naturtd = "C",mov.valorcar,if(tip.codigotd="NI",mov.valorcar,mov.valorcar * 0 ))) AS UNSIGNED) as credito,'+
      'cli.nombrecli, mov.tm1car, mov.doauxcar, mov.prefi1car, mov.valorcar * 0 as debitoInt,'+
      'cast(now() as date) as fecha, cli.digitocli, cli.direccioncli, cli.telefonocli, '+
      '"" as codigotd,mov.valorcar * 0 as notin,'+
      'mov.valorcar as vrfaccar,"" as prefijocar,mov.cuotacar,"" as tmcar,ciu.nombreciu '+
      'from carmovi as mov  '+
      'left join tipodocu as tip on mov.tmcar = tip.codigotd '+
      'left join geclientes as cli on mov.numnitcar = cli.codcli '+
      'left join geciudades as ciu on cli.codciudadcli = ciu.codigociu '+
      'where mov.femovcar < "' + fechaini + '" and mov.swcar <> "1" '+
      'and mov.numnitcar = "' + cliente + '" '+
      'group by 1, 2 '+
      'union all '+
      'select tip.nombretd, mov.numnitcar, mov.femovcar as fechacar, mov.docucar,'+
      'cast(if(tip.naturtd = "D",mov.valorcar,mov.valorcar * 0 ) AS UNSIGNED) as debito,'+
      'cast(if(tip.naturtd = "C",mov.valorcar,mov.valorcar * 0 )  AS UNSIGNED) as credito,'+
      'cli.nombrecli, mov.tm1car, mov.doauxcar, mov.prefi1car, '+
      'if(tip.naturtd  = "",mov.valorcar,mov.valorcar * 0) as debitoInt, '+
      'cast(now() as date) as fecha, cli.digitocli, cli.direccioncli, cli.telefonocli, '+
      'tip.codigotd, if(tip.codigotd = "NI",mov.valorcar,mov.valorcar * 0 ) as notin,'+
      'mov.valorcar as vrfaccar,mov.prefijocar,mov.cuotacar, mov.tmcar,ciu.nombreciu '+
      'from carmovi as mov  '+
      'left join tipodocu as tip on mov.tmcar = tip.codigotd  '+
      'left join geclientes as cli on mov.numnitcar = cli.codcli '+
      'left join geciudades as ciu on cli.codciudadcli = ciu.codigociu '+ 
      'left join rccabe as rcc on mov.docucar = rcc.numrc and mov.prefijocar = rcc.prefijorc '+
      'and rcc.tmrc = "RC"  '+
      'where mov.femovcar between "' + fechaini + '" and "'+fechafin + '" and mov.swcar <> "1" '+
      'and mov.numnitcar = "' + cliente + '" '+
      'order by 2, 3, 8, 9 ';

    return this.cartera;

  }

  getCartera(cliente:string): string {
    this.cartera = "select '01' as tipo, tip.nombretd, cast(mov.femovcar as date) as fechacar, "+
    "tip.codigotd, mov.prefijocar, mov.docucar, cast(mov.valortotal AS UNSIGNED) as vrfaccar, "+
    "cast(mov.valorpagado AS UNSIGNED) as vrpagcar, "+
    "cast(mov.fecvence as date) as vence, mov.numnitcar, cli.nombrecli, cli.digitocli,"+
    "cli.direccioncli, cli.telefonocli, "+ 
    "ciu.nombreciu, datediff(Now(),mov.fecvence) as mora, datediff(Now(),mov.femovcar) as diast,"+
    "mov.valortotal * 0000.00 as salcre, car.cuotacar as cuota "+
    "from carteras as mov "+
    "inner join carmovi car on car.numnitcar = mov.numnitcar  and "+ 
    "car.chedevcar = mov.chedevcar and car.docucar = mov.docucar and "+
    "car.tmcar = mov.tmcar and car.prefijocar = mov.prefijocar and car.cuotacar = mov.cuotacar "+ 
    "inner join tipodocu tip on mov.tmcar = tip.codigotd "+
    "inner join geclientes cli on mov.numnitcar = cli.codcli "+ 
    "inner join geciudades as ciu on cli.codciudadcli = ciu.codigociu "+
    "where mov.valortotal <> mov.valorpagado and car.swcar <> '1' and car.doauxcar = '' "+
    "and mov.numnitcar = '" + cliente + "' "+
    "group by car.numnitcar,car.docucar,car.tmcar,car.prefijocar,car.chedevcar,car.cuotacar "+
    "order by 10, 1, 3, 6 ";

    return this.cartera;

  }

  getPrueba(cliente:string): string {
    this.cartera = "select * from carteras "+
      "where numnitcar = '" + cliente + "' "
    return this.cartera;
  }

  getExistencias(fecha:string, codr:string): string {
    if (codr === '' || codr === 'undefined' || codr === 'null') {
      this.cartera = "select a.codr,a.descr,a.unid,b.posic as bodega,"+
      "sum(if (c.ensa='S',cant*-1,cant)) as existencia "+
      "from inrefinv as a,inkardex as b,intimovinv as c "+
      "where a.codr = b.codr and b.tm = c.tm "+
      "and b.fecha <= '" + fecha + "'"+
      "group by a.codr,b.posic "+
      "ORDER BY a.codr ";
    }
    else {
      this.cartera = "select a.codr,a.descr,a.unid,b.posic as bodega,"+
      "sum(if (c.ensa='S',cant*-1,cant)) as existencia "+
      "from inrefinv as a,inkardex as b,intimovinv as c "+
      "where a.id = b.idcodr and b.tm = c.tm "+
      "and b.fecha <= '" + fecha + "' and a.codr = '"+codr+ "'"+
      "group by a.codr,b.posic "+
      "ORDER BY a.codr ";
    }
    return this.cartera;

  }

  getRolMenu(idrole: number): string {
    this.cartera = "SELECT a.codigo, b.nombremenu, 1 as sel "+
      "FROM ge_rolmenu AS a "+
      "INNER JOIN ge_menu AS b ON a.codigo = b.codigo "+
      "WHERE a.idrole = '" + idrole + "' "+
      "union all "+
      "SELECT c.codigo, c.nombremenu, 0 as sel "+
      "FROM ge_menu AS c "+
      "WHERE c.codigo NOT IN (Select codigo from ge_rolmenu WHERE idrole = '" + idrole + "' ) "+
      "ORDER BY 1 "
    return this.cartera;
  }
}
