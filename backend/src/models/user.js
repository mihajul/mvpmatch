const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static ROLE_BUYER = 'buyer';

    static ROLE_SELLER = 'seller';

    static COINS = [100, 50, 20, 10, 5];

    static associate() {}
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      deposit: DataTypes.INTEGER,
      role: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
