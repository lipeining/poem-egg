'use strict';
module.exports = app => {
  const db = app.model;
  const DataTypes = app.Sequelize;
  const Model = app.model.define(
    'Rhythmic',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: '主键',
        autoIncrement: true,
      },
      name: {
        field: 'name',
        type: DataTypes.STRING(80),
        allowNull: false,
        defaultValue: '',
        comment: 'name',
      },
      type: {
        field: 'type',
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 0,
        comment: 'type',
      },
    },
    {
      tableName: 'tbl_rhythmic',
      timestamps: false,
    }
  );
  Model.associate = () => {
    db.Rhythmic.belongsToMany(db.Poetry, {
      through: { model: db.PoetryRhythmic, unique: false },
      foreignKey: 'rhythmicId',
      constraints: false,
    });
  };
  return Model;
};
