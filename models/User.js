const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    // creates a method to check a password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// define the user columns and configuration
User.init(
    {
        // define an id column
        id: {
            // makes id type integer
            type: DataTypes.INTEGER,
            // does not allow  null value
            allowNull: false,
            // makes this column the primary key
            primaryKey: true,
            // auto increments the values
            autoIncrement: true
        },
        // defines a username column
        username: {
            // makes username a string
            type: DataTypes.STRING,
            // does not allow a null value
            allowNull: false,
            // ensures the username is unique
            unique: true,
        },
        // defines email column
        email: {
            // defines the type for the email
            type: DataTypes.STRING,
            // ensures the email is not null
            allowNull: false,
            // makes sure the email is unique
            unique: true,
            // validates that the user has entered an email
            validate: {
                isEmail: true
            }
        },
        // defies a password column
        password: {
            // sets the password type to string
            type: DataTypes.STRING,
            // ensures the password is not null
            allowNull: false,
            // makes sure the password is at least 5 characters long
            validate: {
                len: [5]
            }
        }
    },
    {
        // this is the table configuration

        hooks: {
            // set up hooks for hashing the password used when creating a user
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // set up hook for when a user is updated to hash a new password
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return;
            }
        },

        // pass in the sequelize connection
        sequelize,
        // don't automatially make createdAt/updatedAt columns
        timestamps: false,
        // don't pluralize the table name
        freezeTableName: true,
        // use underscores and not camelCasing
        underscored: true,
        // make sure the table name stays lowercase
        modelName: 'user'
    }
);

module.exports = User;