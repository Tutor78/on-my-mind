const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

// define comment columns and configuration
Comment.init(
    {
        // define the id column
        id: {
            // makes the id an integer
            type: DataTypes.INTEGER,
            // does not allow a false value
            allowNull: false,
            // makes this column the primary key
            primaryKey: true,
            // auto increments the value
            autoIncrement: true
        },
        // defines the comment content
        comment_content: {
            // makes the type a string
            type: DataTypes.STRING,
            // does not allow null value
            allowNull: false
        },
        // sets the user id that the comment belons to
        user_id: {
            // sets the type as an integer
            type: DataTypes.INTEGER,
            // references the primary key from the user table
            references: {
                model: 'user',
                key: 'id'
            }
        },
        // sets a foreign key for the post that this comment belongs to
        post_id: {
            // sets the type as an integer
            type: DataTypes.INTEGER,
            // references the primary key from the post table
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        // table configuration options

        // pass in the sequelize connection
        sequelize,
        // don't pluralize the table name
        freezeTableName: true,
        // use underscores instead of camelCasing
        underscored: true,
        // ensure the table name stays lowercase
        modelName: 'comment'
    }
);

module.exports = Comment;