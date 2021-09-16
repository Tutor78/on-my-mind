const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

// define post columns and configuration
Post.init(
    {
        // define an id column
        id: {
            // makes the id an integer
            type: DataTypes.INTEGER,
            // does not allow a null value
            allowNull: false,
            // makes this column the primary key
            primaryKey: true,
            // auto increments the value
            autoIncrement: true
        },
        // defines the post title
        title: {
            // makes the title a string
            type: DataTypes.STRING,
            // does not allow null values for the title
            allowNull: false
        },
        // defines the post content
        post_content: {
            // makes the data type text
            type: DataTypes.TEXT,
            // does not allow null values for the content
            allowNull: false
        },
        // defines the user id that owns the post
        user_id: {
            // sets the type as an integer
            type: DataTypes.INTEGER,
            // sets the reference to the id of the user
            references: {
                model: 'user',
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
        // ensure the table name stay lowercase
        modelName: 'post'
    }
);

module.exports = Post;