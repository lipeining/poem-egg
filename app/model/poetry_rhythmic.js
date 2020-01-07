'use strict';
module.exports = app => {
  const db = app.model;
  const DataTypes = app.Sequelize;
  const Model = app.model.define(
    'PoetryRhythmic',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: '主键',
        autoIncrement: true,
      },
      poetryId: {
        field: 'poetry_id',
        type: DataTypes.INTEGER(11),
        allowNull: true,
        comment: 'poetryId',
      },
      rhythmicId: {
        field: 'rhythmic_id',
        type: DataTypes.INTEGER(11),
        allowNull: true,
        comment: 'rhythmicId',
      },
    },
    {
      tableName: 'tbl_poetry_rhythmic',
      timestamps: false,
    }
  );
  Model.associate = () => {
    db.PoetryRhythmic.belongsTo(db.Poetry, {
      foreignKey: 'poetryId',
      targetId: 'id',
      constraints: false,
    });
    db.PoetryRhythmic.belongsTo(db.Rhythmic, {
      foreignKey: 'rhythmicId',
      targetId: 'id',
      constraints: false,
    });
  };
  return Model;
};
