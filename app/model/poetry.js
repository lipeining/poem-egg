'use strict';
module.exports = app => {
  const db = app.model;
  const DataTypes = app.Sequelize;
  const Model = app.model.define(
    'Poetry',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: '主键',
        autoIncrement: true,
      },
      title: {
        field: 'title',
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: '',
        comment: 'title',
      },
      para: {
        field: 'para',
        type: DataTypes.STRING(80),
        allowNull: false,
        defaultValue: '',
        comment: 'para',
      },
      paragraphs: {
        field: 'paragraphs',
        type: DataTypes.STRING(4096),
        allowNull: false,
        defaultValue: '',
        comment: 'paragraphs',
      },
      uuid: {
        field: 'uuid',
        type: DataTypes.STRING(80),
        allowNull: false,
        defaultValue: '',
        comment: 'uuid',
      },
      rhythmic: {
        field: 'rhythmic',
        type: DataTypes.STRING(80),
        allowNull: false,
        defaultValue: '',
        comment: 'rhythmic',
      },
      author: {
        field: 'author',
        type: DataTypes.STRING(80),
        allowNull: false,
        defaultValue: '',
        comment: 'author',
      },
      authorId: {
        field: 'author_id',
        type: DataTypes.INTEGER(11),
        allowNull: true,
        comment: 'authorId',
      },
    },
    {
      tableName: 'tbl_poetry',
      timestamps: false,
    }
  );
  Model.associate = () => {
    db.Poetry.belongsTo(db.Author, {
      as: 'Author',
      foreignKey: 'authorId',
      targetKey: 'id',
      constraints: false,
    });
    db.Poetry.belongsToMany(db.Rhythmic, {
      through: { model: db.PoetryRhythmic, unique: false },
      foreignKey: 'poetryId',
      constraints: false,
    });
  };
  return Model;
};
