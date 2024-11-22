import { Sequelize, Model, DataTypes } from "sequelize"; // Added Sequelize
import sequelize from "../config/database";

interface CharacterAttributes {
    id: number;
    userId: number;
    characterName: string;
    level: number;
    health: number;
    mana: number;
    currentWeapon: string;
    // armor: string; 
}

export class Character extends Model<CharacterAttributes> implements CharacterAttributes {
    public id!: number;
    public userId!: number;
    public characterName!: string;
    public level!: number;
    public health!: number;
    public mana!: number;
    public currentWeapon!: string;
    // public armor!: string;
}

export function CharacterFactory(sequelize: Sequelize): typeof Character {
    Character.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            characterName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            level: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            health: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            mana: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            currentWeapon: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            modelName: 'Character',
            tableName: 'characters',
            sequelize,
        }
    );
    return Character;
}
