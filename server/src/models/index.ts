import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

// Import factory functions
import { User, UserFactory } from "./user";
import { Character, CharacterFactory } from "./character";
import { Enemy, EnemyFactory } from "./enemy";
import { Item, ItemFactory } from "./item";
import { Level, LevelFactory } from "./level";

// Initialize Sequelize instance
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
    process.env.DB_NAME || '', 
    process.env.DB_USER || '', 
    process.env.DB_PASSWORD || '', 
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
        logging: false,
    }
);

// Initialize all models
UserFactory(sequelize);
CharacterFactory(sequelize);
EnemyFactory(sequelize);
ItemFactory(sequelize);
LevelFactory(sequelize);

// Set up associations here, after all models have been initialized

// 1. User has many Characters
User.hasMany(Character, { foreignKey: 'userId', as: 'characters' });
Character.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// 2. Level has one Enemy
Level.hasOne(Enemy, { foreignKey: 'level_id', as: 'enemyDetails' });
Enemy.belongsTo(Level, { foreignKey: 'level_id', as: 'level' });

// 3. Characters can have Items (Many-to-Many)
Character.hasMany(Item, { as: 'items', foreignKey: 'characterId' });
Item.belongsTo(Character, { foreignKey: 'characterId' });

// 4. Level has many Items
Level.hasMany(Item, { foreignKey: 'level_id', as: 'loot' });
Item.belongsTo(Level, { foreignKey: 'level_id', as: 'level' });

// Export all models and the Sequelize instance
export {
    User,
    Character,
    Enemy,
    Item,
    Level,
    sequelize
};
