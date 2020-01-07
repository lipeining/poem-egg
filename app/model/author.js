'use strict';
module.exports = app => {
  const db = app.model;
  const DataTypes = app.Sequelize;
  const Model = app.model.define(
    'Author',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: '主键',
        autoIncrement: true,
      },
      uuid: {
        field: 'uuid',
        type: DataTypes.STRING(80),
        allowNull: false,
        defaultValue: '',
        comment: 'uuid',
      },
      name: {
        field: 'name',
        type: DataTypes.STRING(80),
        allowNull: false,
        defaultValue: '',
        comment: 'name',
      },
      desc: {
        field: 'desc',
        type: DataTypes.STRING(4096),
        allowNull: false,
        defaultValue: '',
        comment: 'desc',
      },
    },
    {
      tableName: 'tbl_author',
      timestamps: false,
    }
  );
  Model.associate = () => {
    db.Author.hasMany(db.Poetry, {
      as: 'Author',
      foreignKey: 'authorId',
      sourceKey: 'id',
      constraints: false,
    });
  };
  return Model;
};
