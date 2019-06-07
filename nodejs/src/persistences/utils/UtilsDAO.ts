import { IBuildOptions, Model } from "sequelize-typescript";
import { sequelize } from "../../sequelize";

//TABLAS AUXILIARES
interface ModelClass<T> {
  new(values?: any, options?: IBuildOptions): T;
}

class UtilsDAO {

  save(instance, Model){
    //CREATE
    if(!instance.id){
      if(Model.foreignKeys){
        instance = this.setForeignKeys(instance, Model);
      }
      return new Model(instance).save().then((instanceSaved)=>{
        instance.id = instanceSaved.id;
        if(Model.foreignKeys){
          instance = utilsDAO.deleteForeignKeys(instance, Model);
        }
        return instance;
      });  
    }
    //UPDATE
    else{
      return Model.update(instance, {where: {id: instance.id}}).then((totalUpdated)=>{
        return instance;
      });
    }
  }
  saveArray(array, Model){
    array.map((instance) => {
      instance = utilsDAO.setForeignKeys(instance, Model);
    });
    return Model.bulkCreate(array).then((savedInstances)=>{
      for(let i=0; i<savedInstances.length; i++){
        array[i].id = savedInstances[i].id;
        array[i] = utilsDAO.deleteForeignKeys(array[i], Model);
      }
      return array;
    });
  }
  setForeignKeys(instance, Model){
    Object.keys(Model.foreignKeys).forEach((key,index) => {
      const ref = Model.foreignKeys[key].ref;
      instance[key] = instance[ref] ? instance[ref]["id"] : null;
    });
    return instance;
  }
  deleteForeignKeys(instance, Model){
    Object.keys(Model.foreignKeys).forEach((key) => { delete instance[key] });
    return instance;
  }
  getModel<T>(modelName: string): ModelClass<T> & typeof Model {
    return sequelize._[modelName] as any;
  }
};

export const utilsDAO = new UtilsDAO();