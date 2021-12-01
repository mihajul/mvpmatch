const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate() {
      Product.belongsTo(sequelize.models.User, { foreignKey: 'sellerId' });
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      productName: DataTypes.STRING,
      amountAvailable: DataTypes.INTEGER,
      cost: DataTypes.INTEGER,
      sellerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );
  return Product;
};
