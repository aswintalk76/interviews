const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_buy_course', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    certificate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: "0=pending,1=done\t"
    },
    createdAt: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'createdAt'
    },
    updatedAt: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updatedAt'
    }
    , created: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created'
    },
    updated: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updated'
    }
  }, {
    sequelize,
    tableName: 'user_buy_course',
    timestamps: true,
    hooks: {
      beforeCreate: (record, options) => {
        record.dataValues.created = Math.round(new Date().getTime() / 1000);
        record.dataValues.updated = Math.round(new Date().getTime() / 1000);
      },
      beforeUpdate: (record, options) => {
        record.dataValues.updated = Math.round(new Date().getTime() / 1000);
      },
      beforeBulkCreate: (records, options) => {
        if (Array.isArray(records)) {
          records.forEach(function (record) {
            record.dataValues.created = Math.round(
              new Date().getTime() / 1000
            );
            record.dataValues.updated = Math.round(
              new Date().getTime() / 1000
            );
          });
        }
      },
      beforeBulkUpdate: (records, options) => {
        if (Array.isArray(records)) {
          records.forEach(function (record) {
            record.dataValues.updated = Math.round(
              new Date().getTime() / 1000
            );
          });
        }
      },
    },
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
