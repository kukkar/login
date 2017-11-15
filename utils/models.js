/*
 * @author Divya Garg
 * @created 5 October 2017
 * @version 1.0
 * @package CM API
 */

const Sequelize = require('sequelize');

class Models {
    
    constructor(sequelize) {
        this.mstchannelrateroom = sequelize.define('mstchannelrateroom', {
                RowId:          { type: Sequelize.INTEGER(11), primaryKey: true, autoIncrement: true },
                HID:            { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                ChannelName:    { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                CHRateCode:     { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                CHRateName:     { type: Sequelize.STRING(256), defaultValue: null, collate: 'utf8_unicode_ci' },
                CHRoomCode:     { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                CHRoomName:     { type: Sequelize.STRING(256), defaultValue: null, collate: 'utf8_unicode_ci' },
                UpdateType:     { type: Sequelize.STRING(25), defaultValue: null, collate: 'utf8_unicode_ci' },
                PAR:            { type: Sequelize.STRING(256), allowNull: false, collate: 'utf8_unicode_ci' }
            },
            {
                engine:         'InnoDB',
                charset:        'utf8',
                collate:        'utf8_unicode_ci',
                indexes: [
                    {
                        unique:       true,
                        fields:    [ "HID", "ChannelName", "CHRateCode", "CHRoomCode" ],
                        name:       "HID_ChannelName_CHRateCode_CHRoomCode"
                    }
                ]    
            });
        
        this.mstchannels = sequelize.define('mstchannels', {
                ChannelName:    { type: Sequelize.STRING(64), primaryKey: true, collate: 'utf8_unicode_ci' },
                Type:           { type: Sequelize.ENUM('master','slave'), allowNull: false, defaultValue: 'master', collate: 'utf8_unicode_ci' },
                Enabled:        { type: 'TINYINT(4)', allowNull: false, defaultValue: '1' },
                ConnectInfo:    { type: 'MEDIUMTEXT', collate: 'utf8_unicode_ci'},
                ChannelType:    { type: Sequelize.ENUM('xml','web'), allowNull: false, defaultValue: 'xml', collate: 'utf8_unicode_ci' },
                Created:        { type: 'TIMESTAMP', allowNull: false, defaultValue: '0000-00-00 00:00:00' },
                Modified:       { type: 'TIMESTAMP', allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
                IPWhitelist:    { type: Sequelize.STRING(64), defaultValue: null, collate: 'utf8_unicode_ci' },
                FullSync:       { type: 'TINYINT(4)', allowNull: false, defaultValue: '1' },
                AllowedMaxDays: { type: Sequelize.INTEGER(4).UNSIGNED, allowNull: false, defaultValue: '365' }
            },
            {
                engine:         'InnoDB',
                charset:        'utf8',
                collate:        'utf8_unicode_ci'
            });
        
        this.mstcomponentlock = sequelize.define('mstcomponentlock', {
                Name:           { type: Sequelize.STRING(64), primaryKey: true, collate: 'utf8_unicode_ci' },
                IsLocked:       { type: 'TINYINT(4)', allowNull: false, defaultValue: '0' },
                LastChange:     { type: 'TIMESTAMP', allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
            },
            {
                engine:         'InnoDB',
                charset:        'utf8',
                collate:        'utf8_unicode_ci'
            });
        
        this.mstproperties = sequelize.define('mstproperties', {
                HID:            { type: Sequelize.STRING(64), primaryKey: true, collate: 'utf8_unicode_ci' },
                Server:         { type: Sequelize.STRING(16), defaultValue: null, collate: 'utf8_unicode_ci' },
                Enabled:        { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
                RateType:       { type: Sequelize.ENUM('sellingRateWithTax','sellingRateWithoutTax','netRateWithTax','netRateWithoutTax'), allowNull: false, defaultValue: 'sellingRateWithoutTax' },
                CurrencyID:     { type: Sequelize.CHAR(3), allowNull: false, defaultValue: 'EUR', collate: 'utf8_unicode_ci'},
                CA:             { type: 'BINARY(1)', allowNull: false, defaultValue: '1' },
                PropertyLimit:  { type: Sequelize.INTEGER(8), defaultValue: '5' },
                defineMasters:  { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: '0' },
                ExtraInfo:      { type: 'TINYTEXT', collate: 'utf8_unicode_ci'},
                ExtraSettings:  { type: 'TINYTEXT', allowNull: false, collate: 'utf8_unicode_ci' },
                Created:        { type: 'TIMESTAMP', allowNull: false, defaultValue: '0000-00-00 00:00:00' },
                Modified:       { type: 'TIMESTAMP', allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
                houseInventoryMode: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: '1' }
            },
            {
                engine:         'InnoDB',
                charset:        'utf8',
                collate:        'utf8_unicode_ci'
            });
        
        this.mstpropertychannelformulae = sequelize.define('mstpropertychannelformulae', {
                FormulaID:      { type: Sequelize.STRING(64), primaryKey: true, collate: 'utf8_unicode_ci' },
                HID:            { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                ChannelName:    { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                CHRateCode:     { type: Sequelize.STRING(64), defaultValue: null, collate: 'utf8_unicode_ci' },
                CHRoomCode:     { type: Sequelize.STRING(64), defaultValue: null, collate: 'utf8_unicode_ci' },
                Type:           { type: Sequelize.ENUM('channel','other'), allowNull: false, defaultValue: 'channel', collate: 'utf8_unicode_ci' },
                StartDate:      { type: Sequelize.DATEONLY, allowNull: false, defaultValue: '0000-00-00' },
                EndDate:        { type: Sequelize.DATEONLY, allowNull: false, defaultValue: '0000-00-00' },
                Days:           { type: "SET('Sun','Mon','Tue','Wed','Thu','Fri','Sat')", allowNull: false, defaultValue: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat', collate: 'utf8_unicode_ci' },
                Formula:        { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                Created:        { type: 'TIMESTAMP', allowNull: false, defaultValue: '0000-00-00 00:00:00' },
                Modified:       { type: 'TIMESTAMP', allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
            },
            {
                engine:         'InnoDB',
                charset:        'utf8',
                collate:        'utf8_unicode_ci',
                indexes: [
                    {
                        unique:       true,
                        fields:    [ "HID", "ChannelName", "CHRateCode", "CHRoomCode", "Type", "StartDate", "EndDate", "Days" ],
                        name:       "UniqueRecord"
                    }
                ]    
            });
        
        // @TODO: Add unique index on HID, GroupName(128)
        this.mstpropertychannelgroups = sequelize.define('mstpropertychannelgroups', {
                GroupID:        { type: Sequelize.STRING(64), primaryKey: true, collate: 'utf8_unicode_ci' },
                HID:            { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                GroupName:      { type: Sequelize.STRING(256), allowNull: false, collate: 'utf8_unicode_ci' },
                Created:        { type: 'TIMESTAMP', allowNull: false, defaultValue: '0000-00-00 00:00:00' },
                Modified:       { type: 'TIMESTAMP', allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
            },
            {
                engine:         'InnoDB',
                charset:        'utf8',
                collate:        'utf8_unicode_ci'
            });
        
        this.mstpropertychannelrateroom = sequelize.define('mstpropertychannelrateroom', {
                HID:            { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                ChannelName:    { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                Rate:           { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                Room:           { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                CHRateCode:     { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                CHRateName:     { type: Sequelize.STRING(256), defaultValue: null, collate: 'utf8_unicode_ci' },
                CHRoomCode:     { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                CHRoomName:     { type: Sequelize.STRING(256), defaultValue: null, collate: 'utf8_unicode_ci' },
                PAR:            { type: Sequelize.STRING(256), defaultValue: null, collate: 'utf8_unicode_ci' },
                PriceType:      { type: Sequelize.ENUM('PricePerRoom','OccupancyPrice','NoPriceType'), allowNull: false, defaultValue: 'OccupancyPrice', collate: 'utf8_unicode_ci' },
                PricePerNightToOccupancyPrice: { type: Sequelize.ENUM('','A1','A2','A3','A4','A5','A6','A7','A8','A9','A10'), allowNull: false, collate: 'utf8_unicode_ci' },
                MasterPriceType:{ type: Sequelize.ENUM('PricePerRoom','OccupancyPrice'), allowNull: false, defaultValue: 'OccupancyPrice', collate: 'utf8_unicode_ci' },
                UpdateType:     { type: Sequelize.STRING(20), allowNull: false, collate: 'utf8_unicode_ci' },
                Created:        { type: 'TIMESTAMP', allowNull: false, defaultValue: '0000-00-00 00:00:00' },
                Modified:       { type: 'TIMESTAMP', allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
            },
            {
                engine:         'InnoDB',
                charset:        'utf8',
                collate:        'utf8_unicode_ci',
                indexes: [
                    {
                        unique:     true,
                        fields:     [ "HID", "ChannelName", "CHRoomCode", "CHRateCode", "PricePerNightToOccupancyPrice" ],
                        name:       "rateroomunique"
                    },
                    {
                        fields:     [ "ChannelName" ],
                        name:       "ChannelName"
                    },
                    {
                        fields:     [ "CHRateCode", "CHRoomCode" ],
                        name:       "CHRateCode"
                    }
                ]    
            });
        
        this.mstpropertychannels = sequelize.define('mstpropertychannels', {
                HID:            { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci', primaryKey: true },
                ChannelName:    { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci', primaryKey: true },
                ChannelGroup:   { type: Sequelize.STRING(255), allowNull: false, collate: 'utf8_unicode_ci' },
                CurrencyID:     { type: Sequelize.CHAR(3), allowNull: false, defaultValue: 'EUR', collate: 'utf8_unicode_ci' },
                Enabled:        { type: Sequelize.INTEGER(1), allowNull: false, defaultValue: '1' },
                ConnectInfo:    { type: 'TINYTEXT', allowNull: false, collate: 'utf8_unicode_ci' },
                ChannelpropertyID:  { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                RateType:       { type: Sequelize.ENUM('sellingRateWithTax','sellingRateWithoutTax','netRateWithTax','netRateWithoutTax'), allowNull: false, defaultValue: 'sellingRateWithoutTax', collate: 'utf8_unicode_ci' },
                ExtraSettings:  { type: 'TINYTEXT', allowNull: false, collate: 'utf8_unicode_ci' },
                UpdateType:     { type: Sequelize.STRING(20), allowNull: false, collate: 'utf8_unicode_ci' },
                Created:        { type: 'TIMESTAMP', allowNull: false, defaultValue: '0000-00-00 00:00:00' },
                Modified:       { type: 'TIMESTAMP', allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
                LastRateRoomRefresh: { type: 'TIMESTAMP', allowNull: false, defaultValue: '0000-00-00 00:00:00' },
                RestrictionType:{ type: Sequelize.STRING(100), allowNull: false }
            },
            {
                engine:         'InnoDB',
                charset:        'utf8',
                collate:        'utf8_unicode_ci',
                indexes: [
                    {
                        fields:     [ "ChannelGroup" ],
                        name:       "ChannelGroup"
                    }
                ]    
            });
        
        // @TODO: Add unique key UniqueRecord and index key PropertyCode_2
        this.mstpropertyformulae = sequelize.define('mstpropertyformulae', {
                FormulaID:      { type: Sequelize.STRING(64), primaryKey: true, collate: 'utf8_unicode_ci' },
                HID:            { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                Rate:           { type: Sequelize.STRING(1024), defaultValue: null, collate: 'utf8_unicode_ci' },
                Room:           { type: Sequelize.STRING(1024), defaultValue: null, collate: 'utf8_unicode_ci' },
                ChannelName:    { type: Sequelize.STRING(64), defaultValue: null, collate: 'utf8_unicode_ci' },
                ChannelGroup:   { type: Sequelize.STRING(64), defaultValue: null, collate: 'utf8_unicode_ci' },
                Type:           { type: Sequelize.ENUM('cutoff','markup','restrictions'), allowNull: false },
                StartDate:      { type: Sequelize.DATEONLY, allowNull: false, defaultValue: '0000-00-00' },
                EndDate:        { type: Sequelize.DATEONLY, allowNull: false, defaultValue: '0000-00-00' },
                Days:           { type: "SET('Sun','Mon','Tue','Wed','Thu','Fri','Sat')", allowNull: false, defaultValue: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat', collate: 'utf8_unicode_ci' },
                Formula:        { type: Sequelize.STRING(128), allowNull: false, collate: 'utf8_unicode_ci' },
                Created:        { type: 'TIMESTAMP', allowNull: false, defaultValue: '0000-00-00 00:00:00' },
                Modified:       { type: 'TIMESTAMP', allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
                OccupancyType:  { type: Sequelize.ENUM('A1','A2','A3','A4','A5','A6','A7','A8','A9','A10','C1','C2','C3','C4','C5','C6','C7','C8','C9','ALL'), allowNull: false, defaultValue: 'ALL', collate: 'utf8_unicode_ci' }
            },
            {
                engine:         'InnoDB',
                charset:        'utf8',
                collate:        'utf8_unicode_ci',
                indexes: [
                    {
                        fields:     [ "HID" ],
                        name:       "HID"
                    },
                    {
                        fields:     [ "ChannelGroup" ],
                        name:       "ChannelGroup"
                    }
                ]    
            }
        );

        this.mstpropertyrateroom = sequelize.define('mstpropertyrateroom', {
                HID:            { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci', primaryKey: true },
                Rate:           { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci', primaryKey: true },
                Room:           { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci', primaryKey: true },
                CurrentYearAllotment:     { type: Sequelize.STRING(2050), defaultValue: null, collate: 'utf8_unicode_ci' },
                NextYearAllotment:        { type: Sequelize.STRING(2050), defaultValue: null, collate: 'utf8_unicode_ci' },
                CAEnabled:      { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: '0' },
                Created:        { type: 'TIMESTAMP', allowNull: false, defaultValue: '0000-00-00 00:00:00' },
                Modified:       { type: 'TIMESTAMP', allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
            },
            {
                engine:         'InnoDB',
                charset:        'utf8',
                collate:        'utf8_unicode_ci'
            }
        );

        this.trnbatches = sequelize.define('trnbatches', {
                BatchID:        { type: Sequelize.STRING(64), primaryKey: true, collate: 'utf8_unicode_ci' },
                HID:            { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                Source:         { type: Sequelize.STRING(150), allowNull: false, collate: 'utf8_unicode_ci' },
                User:           { type: Sequelize.STRING(30), defaultValue: null, collate: 'utf8_unicode_ci' },
                Channels:       { type: 'TINYTEXT', allowNull: false, collate: 'utf8_unicode_ci' },
                Rateroom:       { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                Type:           { type: Sequelize.ENUM('GET','SET'), allowNull: false, defaultValue: 'SET', collate: 'utf8_unicode_ci' },
                Status:         { type: Sequelize.ENUM('spool','pending','active','done','error','nothingtodo'), allowNull: false, defaultValue: 'pending', collate: 'utf8_unicode_ci' },
                StartTime:      { type: Sequelize.DATE, allowNull: false },
                EndTime:        { type: Sequelize.DATE, allowNull: false },
                MinDate:        { type: Sequelize.DATEONLY, allowNull: false },
                MaxDate:        { type: Sequelize.DATEONLY, allowNull: false },
                DataPoints:     { type: Sequelize.INTEGER(15), allowNull: false },
                ReferenceID:    { type: Sequelize.STRING(200), allowNull: false, collate: 'utf8_unicode_ci' },
                Created:        { type: 'TIMESTAMP', allowNull: false, defaultValue: '0000-00-00 00:00:00' },
                Modified:       { type: 'TIMESTAMP', allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
                IsParent:       { type: Sequelize.BOOLEAN, allowNull: false },
                IsHistoryCreated:   { type: Sequelize.BOOLEAN, allowNull: false }
            },
            {
                engine:         'InnoDB',
                charset:        'utf8',
                collate:        'utf8_unicode_ci',
                indexes: [
                    {
                        unique:     true,
                        fields:     [ "BatchID", "HID" ],
                        name:       "BatchID"
                    },
                    {
                        fields:     [ "Status" ],
                        name:       "Status"
                    },
                    {
                        fields:     [ "Created", "Status" ],
                        name:       "trnbatches_created_status"
                    }
                ]
            }
        );

        this.trnbatchjobs = sequelize.define('trnbatchjobs', {
                BatchID:        { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                RowID:          { type: Sequelize.INTEGER(11), primaryKey: true, autoIncrement: true },
                JobID:          { type: Sequelize.INTEGER(4), allowNull: false, defaultValue: '0' },
                ChannelName:    { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                RateRoom:       { type: 'TINYTEXT', allowNull: false, collate: 'utf8_unicode_ci' },
                PAR:            { type: Sequelize.STRING(256), allowNull: false, collate: 'utf8_unicode_ci' },
                upStartDate:    { type: Sequelize.DATEONLY, allowNull: false },
                upEndDate:      { type: Sequelize.DATEONLY, allowNull: false },
                Status:         { type: Sequelize.ENUM('pending','nothingtodo','active','failed','success','partial'), allowNull: false, defaultValue: 'pending', collate: 'utf8_unicode_ci' },
                StartTime:      { type: Sequelize.DATE, allowNull: false },
                EndTime:        { type: Sequelize.DATE, allowNull: false },
                ConversionFactor:   { type: Sequelize.FLOAT, allowNull: false, defaultValue: '1' },
                CommonError:    { type: Sequelize.INTEGER(5), defaultValue: null },
                Created:        { type: 'TIMESTAMP', allowNull: false, defaultValue: '0000-00-00 00:00:00' },
                Modified:       { type: 'TIMESTAMP', allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
            },
            {
                engine:         'InnoDB',
                charset:        'utf8',
                collate:        'utf8_unicode_ci',
                indexes: [
                    {
                        unique:     true,
                        fields:     [ "BatchID", "ChannelName" ],
                        name:       "BatchID"
                    },
                    {
                        fields:     [ "ChannelName" ],
                        name:       "ChannelName"
                    },
                    {
                        fields:     [ "Status" ],
                        name:       "Status"
                    },
                    {
                        fields:     [ "CommonError" ],
                        name:       "CommonError"
                    },
                    {
                        fields:     [ "Created" ],
                        name:       "Created"
                    }
                ]
            }
        );

        this.trncachedata = sequelize.define('trncachedata', {
                Path:           { type: Sequelize.STRING(255), primaryKey: true, collate: 'utf8_unicode_ci' },
                Data:           { type: 'MEDIUMBLOB', allowNull: false },
                CacheDate:      { type: Sequelize.DATEONLY, allowNull: false },
                Created:        { type: 'TIMESTAMP', allowNull: false, defaultValue: '0000-00-00 00:00:00' },
                Modified:       { type: 'TIMESTAMP', allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
            },
            {
                engine:         'InnoDB',
                charset:        'utf8',
                collate:        'utf8_unicode_ci',
                indexes: [
                    {
                        fields:     [ "CacheDate" ],
                        name:       "Date"
                    },
                    {
                        fields:     [ "Created" ],
                        name:       "Created"
                    }
                ]
            }
        );

        this.trnformulacache = sequelize.define('trnformulacache', {
                ID:             { type: Sequelize.INTEGER(10), primaryKey: true, autoIncrement: true },
                HID:            { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                ChannelName:    { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                Type:           { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                Data:           { type: 'MEDIUMBLOB', allowNull: false },
                Path:           { type: Sequelize.STRING(255), defaultValue: null, collate: 'utf8_unicode_ci' },
                Counter:        { type: Sequelize.INTEGER(3), defaultValue: '0' },
                Created:        { type: Sequelize.DATE, allowNull: false, defaultValue: '0000-00-00 00:00:00' },
                RefreshDate:    { type: Sequelize.DATE, allowNull: false, defaultValue: '0000-00-00 00:00:00' },
                Modified:       { type: 'TIMESTAMP', allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
            },
            {
                engine:         'InnoDB',
                charset:        'utf8',
                collate:        'utf8_unicode_ci',
                indexes: [
                    {
                        unique:     true,
                        fields:     [ "HID", "ChannelName", "Type" ],
                        name:       "idx_HID_ChannelName_Type"
                    }
                ]
            }
        );

        this.trnhistorycache = sequelize.define('trnhistorycache', {
                ID:             { type: Sequelize.INTEGER(10), primaryKey: true, autoIncrement: true },
                BatchID:        { type: Sequelize.STRING(64), allowNull: false, collate: 'utf8_unicode_ci' },
                Data:           { type: 'MEDIUMBLOB', allowNull: false },
                Date:           { type: 'TIMESTAMP', allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
            },
            {
                engine:         'InnoDB',
                charset:        'utf8',
                collate:        'utf8_unicode_ci',
                indexes: [
                    {
                        unique:     true,
                        fields:     [ "BatchID" ],
                        name:       "BatchID"
                    },
                    {
                        fields:     [ "Date" ],
                        name:       "Date"
                    }
                ]
            }
        );

        this.trnnotifications = sequelize.define('trnnotifications', {
                NotificationID: { type: Sequelize.STRING(64), primaryKey: true, collate: 'utf8_unicode_ci' },
                HID:            { type: Sequelize.STRING(32), allowNull: false, collate: 'utf8_unicode_ci' },
                Message:        { type: Sequelize.TEXT, allowNull: false, collate: 'utf8_unicode_ci' },
                Criticality:    { type: Sequelize.ENUM('critical','error','warning','info'), allowNull: false, defaultValue: 'info', collate: 'utf8_unicode_ci' },
                Category:       { type: Sequelize.ENUM('BatchSuccess','BatchFail','BatchPartial','ChannelEnable','ChannelDisable','ChannelRemove','ChannelConnectError','RateRoomAdd','RateRoomDel','Other'), allowNull: false, defaultValue: 'Other', collate: 'utf8_unicode_ci' },
                Status:         { type: Sequelize.ENUM('new','processed'), allowNull: false, defaultValue: 'new', collate: 'utf8_unicode_ci' },
                Created:        { type: 'TIMESTAMP', allowNull: false, defaultValue: '0000-00-00 00:00:00' },
                Modified:       { type: 'TIMESTAMP', allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
            },
            {
                engine:         'InnoDB',
                charset:        'utf8',
                collate:        'utf8_unicode_ci',
                indexes: [
                    {
                        fields:     [ "Criticality" ],
                        name:       "Criticality"
                    },
                    {
                        fields:     [ "Category" ],
                        name:       "Category"
                    },
                    {
                        fields:     [ "Status" ],
                        name:       "Status"
                    }
                ]
            }
        );

        this.trnstats = sequelize.define('trnstats', {
                Date:                           { type: Sequelize.DATEONLY, allowNull: false },
                ConfiguredProperties:           { type: Sequelize.INTEGER(11), allowNull: false },
                ActiveProperties:               { type: Sequelize.INTEGER(11), allowNull: false },
                InactiveProperties:             { type: Sequelize.INTEGER(11), allowNull: false },
                CountryCode:                    { type: Sequelize.STRING(20), allowNull: false, collate: 'utf8_unicode_ci' },
                ConfiguredPropertiesInOTA:      { type: Sequelize.INTEGER(11), allowNull: false, defaultValue: '0' },
                ConfiguredPropertiesInMP:       { type: Sequelize.INTEGER(11), allowNull: false, defaultValue: '0' },
                ConfiguredPropertiesInOTAMP:    { type: Sequelize.INTEGER(11), allowNull: false },
                ActivePropertiesInOTA:          { type: Sequelize.INTEGER(11), allowNull: false },
                ActivePropertiesInMP:           { type: Sequelize.INTEGER(11), allowNull: false },
                ActivePropertiesInOTAMP:        { type: Sequelize.INTEGER(11), allowNull: false },
                InactivePropertiesInOTA:        { type: Sequelize.INTEGER(11), allowNull: false },
                InactivePropertiesInMP:         { type: Sequelize.INTEGER(11), allowNull: false },
                InactivePropertiesInOTAMP:      { type: Sequelize.INTEGER(11), allowNull: false },
                PropertiesMigrated:             { type: Sequelize.INTEGER(11), allowNull: false, defaultValue: '0' }
            },
            {
                engine:         'InnoDB',
                charset:        'utf8',
                collate:        'utf8_unicode_ci'
            }
        );

        this.mstpropertychannelrateroom.removeAttribute('id');
        this.trnstats.removeAttribute('id');

        this.mstproperties.belongsToMany(this.mstchannels, {through: this.mstpropertychannels, foreignKey: 'HID', otherKey: 'ChannelName'});
        this.mstchannels.belongsToMany(this.mstproperties, {through: this.mstpropertychannels, foreignKey: 'ChannelName', otherKey: 'HID'});
        this.mstproperties.hasMany(this.mstpropertychannelgroups, {foreignKey: 'HID'});
        this.mstproperties.hasMany(this.mstpropertyrateroom, {foreignKey: 'HID'});
        this.mstproperties.hasMany(this.trnbatches, {foreignKey: 'HID'});
        this.trnbatches.hasMany(this.trnbatchjobs, {foreignKey: 'BatchID'});
        this.trnbatches.hasMany(this.trnhistorycache, {foreignKey: 'BatchID'});
        this.mstproperties.hasMany(this.trnnotifications, {foreignKey: 'HID'});
    }
    
    get(tableName) {
        return this[tableName];
    }
}

module.exports = Models;