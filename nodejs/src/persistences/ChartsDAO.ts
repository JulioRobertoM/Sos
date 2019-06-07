import now = require("lodash/fp/now");
import { Sequelize } from "sequelize-typescript/lib/models/v4/Sequelize";
import { Pedido } from "../entities/Pedido";
import { User } from "../entities/User";

const Op = Sequelize.Op;

class ChartsDAO {

  public include: object[] = [];

  public getGraphs(mark: string, from: any, currentUser: User) {

    let entity;

    switch(mark) {
      case "pedido": {
        entity = Pedido;
        break;
      }
    }

    return entity.findAll({
      include: this.include,
      where: {
        [Op.or]: [
          {
            estado: {
              [Op.eq]: '0',
            }
          },
          {
            idusuario: currentUser.id
          },
          {
            estado: {
              [Op.eq]: 'C',
            }
          },
        ],
        fecha: {
          [Op.gte]: from,
        }
      },
      order: [
        ["id", "DESC"],
      ],
    });

  }

}

export const chartsDAO = new ChartsDAO();
