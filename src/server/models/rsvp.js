'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Rsvp extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Rsvp.hasMany(models.Member, {
                as: 'members',
                foreignKey: 'id'
            });
            Rsvp.hasMany(models.Event, {
                as: 'events',
                foreignKey: 'id'
            });
        }
    }
    Rsvp.init(
        {
            eventId: DataTypes.INTEGER,
            memberId: DataTypes.INTEGER,
            status: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Rsvp'
        }
    );
    return Rsvp;
};
