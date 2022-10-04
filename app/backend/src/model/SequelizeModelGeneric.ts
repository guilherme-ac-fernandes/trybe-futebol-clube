// import { CreationAttributes, Model, ModelStatic } from 'sequelize';

// interface IModel<T extends Model> {
//   create(obj: CreationAttributes<T>): Promise<T>,
// }

// Classe de Model abstrata para construção de forma genérica
// construiu na mentoria do Especialista Lucas Henrique de Abreu
// source: https://github.com/tryber/sd-020-b-live-lectures/blob/lectures-solid-poo-tdd-typescript-sequelize/src/model/SequelizeModel.ts
// abstract class SequelizeModel<T extends Model> implements IModel<T> {
//   protected _model: ModelStatic<T>;

//   constructor(model: ModelStatic<T>) {
//     this._model = model;
//   }

//   public async create(creationAtributes: CreationAttributes<T>): Promise<T> {
//     return this._model.create(creationAtributes);
//   }
// }

// export default SequelizeModel;
