'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Event extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Event.belongsToMany(models.Member, {
                through: models.Rsvp,
                as: 'members',
                foreignKey: 'eventId'
            });
        }
    }
    Event.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            date: DataTypes.DATE
        },
        {
            sequelize,
            modelName: 'Event'
        }
    );
    return Event;
};
