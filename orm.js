const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = new Sequelize('mysql://root:root@localhost:3306/jobAssign');



const ProductCategory = sequelize.define('ProductCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  modified_at: {
    type: DataTypes.DATE,
  },
  deleted_at: {
    type: DataTypes.DATE,
  },
});

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  SKU: {
    type: DataTypes.STRING,
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'ProductCategories',
      key: 'id',
    },
  },
  inventory_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'ProductInventories',
      key: 'id',
    },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
  },
  discount_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'ProductDiscounts',
      key: 'id',
    },
  },
  created_at: {
    type: DataTypes.DATE,
  },
  modified_at: {
    type: DataTypes.DATE,
  },
  deleted_at: {
    type: DataTypes.DATE,
  },
});

const ProductInventory = sequelize.define('ProductInventory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  modified_at: {
    type: DataTypes.DATE,
  },
  deleted_at: {
    type: DataTypes.DATE,
  },
});

const ProductDiscount = sequelize.define('ProductDiscount', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  discount_percent: {
    type: DataTypes.DECIMAL(5, 2),
  },
  active: {
    type: DataTypes.BOOLEAN,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  modified_at: {
    type: DataTypes.DATE,
  },
  deleted_at: {
    type: DataTypes.DATE,
  },
});


Product.belongsTo(ProductCategory, { foreignKey: 'category_id' });
Product.belongsTo(ProductInventory, { foreignKey: 'inventory_id' });
Product.belongsTo(ProductDiscount, { foreignKey: 'discount_id' });
ProductInventory.hasOne(Product, { foreignKey: 'inventory_id' });
ProductDiscount.hasMany(Product, { foreignKey: 'discount_id' });

sequelize.sync()
  .then(() => {
    console.log('Database and tables created successfully.');
  })
  .catch((error) => {
    console.error('Error creating database tables:', error);
  });

app.get('/', (req, res) => {
  res.send('Database and tables created successfully.'); 
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
