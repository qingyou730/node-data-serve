const sequelize = require("./db");
const { DataTypes } = require("sequelize");
//创建一个模型对象
// country: '中国', province: '北京', city: '北京市', isp: '阿里巴巴'
const Inter = sequelize.define(
  "Inter",
  {
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accessNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    paranoid: true //从此以后，该表的数据不会真正的删除，而是增加一列deletedAt，记录删除的时间
  }
);

module.exports = Inter;
