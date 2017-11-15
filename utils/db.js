/*
 * @author Divya Garg
 * @created 29 September 2017
 * @version 1.0
 * @package CM API
 */

const Promise = require('promise');
const Sequelize = require('sequelize');
const models = require('./models');

let DbInstance = null; // single instance of class

class Db {
    /**
     * @description function will handle any database request
     * @param {type} data
     * @returns {Promise}
     */
    constructor(host, port, dbname, username, password) {
      if(!DbInstance){
          DbInstance = this;
          DbInstance.host = host;
          DbInstance.port = port;
          DbInstance.dbname = dbname;
          DbInstance.username = username;
          DbInstance.password = password;
          if (DbInstance.sequelize === undefined || typeof DbInstance.sequelize !== 'object') {
              DbInstance.sequelize = null;
          }
      }
    }
    
    connect() {
        return new Promise((resolve, reject) => {
            if (DbInstance.sequelize !== null && DbInstance.sequelize !== undefined && typeof DbInstance.sequelize === 'object') {
                return resolve();
            }
            const opts = {
                define: {
                    timestamps: false,
                    underscored: true,
                    freezeTableName: true,
                    operatorsAliases: false
                }
            }
            DbInstance.sequelize = new Sequelize(
                'mysql://' + DbInstance.username + ':' + DbInstance.password + '@' + DbInstance.host + ':' + DbInstance.port + '/' + DbInstance.dbname,
                opts);
            DbInstance.sequelize
            .authenticate()
            .then(() => {
                DbInstance.models = new models(DbInstance.sequelize);
                DbInstance.sequelize.sync().then(() => {
                    DbInstance.addCompositeForeignKeys()
                    .then(DbInstance.addTestData.bind(DbInstance))
                    .then(() => {
                        return resolve();
                    })
                    .catch(err => {
                        reject(err);
                    })
                })
                .catch(err => {
                    let oErr = new Error('Internal server error.');
                    oErr.code = 500;
                    GLOBAL.logger.logError('Unable to sync to the database: ', err);
                    reject(oErr);
                });
            })
            .catch(err => {
                let oErr = new Error('Internal server error.');
                oErr.code = 500;
                GLOBAL.logger.logError('Unable to connect to the database: ', err);
                reject(oErr);
            });
        });
    }
    
    query(sQuery, aParams) {
        return new Promise((resolve, reject) => {
            const that = DbInstance;
            that.connect()
            .then(() => {
                if (aParams !== undefined) {
                    return that.sequelize.query(sQuery, aParams);
                }
                return that.sequelize.query(sQuery);
            })
            .then(rows => {
                return resolve(rows);
            })
            .catch(err => {
                let oErr = new Error('Internal server error.');
                oErr.code = 500;
                GLOBAL.logger.logError('Database error: ', err);
                reject(oErr);
            })
        });
    }
    
    select(sModel, objWhere, aJoins, aOrder, aGroup, iLimit, iOffset) {
        return new Promise((resolve, reject) => {
            const that = DbInstance;
            that.connect()
            .then(() => {
                const objParams = { where: objWhere };
                if ( aJoins !== undefined && typeof aJoins === 'object' ) {
                    objParams.include = aJoins;
                }
                if ( aOrder !== undefined && typeof aOrder === 'object' ) {
                    objParams.order = aOrder;
                }
                if ( aGroup !== undefined && typeof aGroup === 'object' ) {
                    objParams.group = aGroup;
                }
                if ( iLimit !== undefined && iLimit > 0 ) {
                    objParams.limit = iLimit;
                }
                if ( iOffset !== undefined && iOffset >= 0 ) {
                    objParams.offset = iOffset;
                }
                that.models.get(sModel).findAll(objParams)
                .then(objResult => {
                    return resolve(objResult);
                })
                .catch(err => {
                    reject(err);
                })
            })
            .catch(err => {
                reject(err);
            })
        });
    }
    
    update(sModel, objValues, objWhere) {
        return new Promise((resolve, reject) => {
            const that = DbInstance;
            that.connect()
            .then(() => {
                that.models.get(sModel).update(aValues, {
                    where: objWhere,
                    returning: true
                })
                .then(objResult => {
                    return resolve(objResult);
                })
                .catch(err => {
                    reject(err);
                })
            })
            .catch(err => {
                reject(err);
            })
        });
    }
    
    upsert(sModel, objValues) {
        return new Promise((resolve, reject) => {
            const that = DbInstance;
            that.connect()
            .then(() => {
                that.models.get(sModel).upsert(objValues)
                .then(() => {
                    return resolve();
                })
                .catch(err => {
                    reject(err);
                })
            })
            .catch(err => {
                reject(err);
            })
        });
    }
    
    insert(sModel, objValues) {
        return new Promise((resolve, reject) => {
            const that = DbInstance;
            that.connect()
            .then(() => {
                that.models.get(sModel).create(objValues)
                .then(() => {
                    return resolve();
                })
                .catch(err => {
                    reject(err);
                })
            })
            .catch(err => {
                reject(err);
            })
        });
    }
    
    delete(sModel, objWhere) {
        return new Promise((resolve, reject) => {
            const that = DbInstance;
            that.connect()
            .then(() => {
                that.models.get(sModel).destroy({
                    where: objWhere,
                    returning: true
                })
                .then(objResult => {
                    return resolve(objResult);
                })
                .catch(err => {
                    reject(err);
                })
            })
            .catch(err => {
                reject(err);
            })
        });
    }
    
    close() {
        DbInstance.sequelize.close();
    }
    
    addCompositeForeignKeys() {
        return new Promise((resolve, reject) => {
            if (GLOBAL.oConfigData.database.fresh === undefined || GLOBAL.oConfigData.database.fresh === false) {
                return resolve();
            }
            // Add composite foreign key via raw queries since this is not possible in sequelize
            Promise.all([
                DbInstance.query("ALTER TABLE `mstchannelrateroom` ADD CONSTRAINT mstpropertychannels_ibfk1 FOREIGN KEY (  `HID` ,  `ChannelName` ) REFERENCES mstpropertychannels (  `HID` ,  `ChannelName` )"),
                DbInstance.query("ALTER TABLE `mstpropertychannelformulae` ADD CONSTRAINT mstpropertychannels_ibfk2 FOREIGN KEY (  `HID` ,  `ChannelName` ) REFERENCES mstpropertychannels (  `HID` ,  `ChannelName` )"),
                DbInstance.query("ALTER TABLE `mstpropertychannelrateroom` ADD CONSTRAINT mstpropertychannels_ibfk3 FOREIGN KEY (  `HID` ,  `ChannelName` ) REFERENCES mstpropertychannels (  `HID` ,  `ChannelName` )"),
                DbInstance.query("ALTER TABLE `mstpropertyformulae` ADD CONSTRAINT mstpropertychannels_ibfk4 FOREIGN KEY (  `HID` ,  `ChannelName` ) REFERENCES mstpropertychannels (  `HID` ,  `ChannelName` )"),
                DbInstance.query("ALTER TABLE `trnformulacache` ADD CONSTRAINT mstpropertychannels_ibfk5 FOREIGN KEY (  `HID` ,  `ChannelName` ) REFERENCES mstpropertychannels (  `HID` ,  `ChannelName` )")
            ])
            .then(values => {
                resolve();
            })
            .catch(err => {
                let oErr = new Error('Internal server error.');
                oErr.code = 500;
                GLOBAL.logger.logError('Database error: ', err);
                reject(oErr);
            })
        });
    }
    
    addTestData() {
        return new Promise((resolve, reject) => {
            // Add test property 'frpar18011@demo' and test channel 'dummychannel1' in channelmanager database
            Promise.all([
                DbInstance.upsert('mstproperties', {
                    HID: 'frpar18011@demo',
                    Server: 'OVH41',
                    Enabled: 1,
                    RateType: 'sellingRateWithTax',
                    CurrencyID: 'EUR',
                    CA: '1',
                    PropertyLimit: 1200,
                    defineMasters: 0,
                    ExtraInfo: 'DEMO hotel for CMAPI',
                    ExtraSettings: '{\"email\":\"email@test.com\",\"fax\":\"3243243354\",\"resDeliveryMode\":\"both\"}',
                    Created: DbInstance.sequelize.fn('NOW'),
                    Modified: DbInstance.sequelize.fn('NOW'),
                    houseInventoryMode: 1
                }),
                DbInstance.upsert('mstchannels', {
                    ChannelName: 'dummychannel1',
                    Type: 'master',
                    Enabled: 1,
                    ConnectInfo: '{\"ChannelPropertyID\":\"Account ID of the property on the channel\"}',
                    ChannelType: 'xml',
                    Created: DbInstance.sequelize.fn('NOW'),
                    Modified: DbInstance.sequelize.fn('NOW'),
                    IPWhitelist: '10.20.1.2',
                    FullSync: 1,
                    AllowedMaxDays: 365
                })
            ])
            .then(DbInstance.upsert.bind(DbInstance, 'mstpropertychannels', {
                HID: 'frpar18011@demo',
                ChannelName: 'dummychannel1',
                ChannelGroup: '',
                ConnectInfo: '{\"ChannelPropertyID\":\"11456456\"}',
                ChannelpropertyID: '11456456',
                ExtraSettings: '[]',
                UpdateType: 'P,A,R',
                Created: DbInstance.sequelize.fn('NOW'),
                Modified: DbInstance.sequelize.fn('NOW'),
                LastRateRoomRefresh: DbInstance.sequelize.fn('NOW'),
                RestrictionType: ''
            }))
            .then(() => {
                return resolve();
            })
            .catch(err => {
                let oErr = new Error('Internal server error.');
                oErr.code = 500;
                GLOBAL.logger.logError('Database error: ', err);
                reject(oErr);
            })
        });
    }
}

module.exports = Db;