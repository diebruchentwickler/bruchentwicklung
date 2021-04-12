import orm from 'typeorm';

export const BaseColumnSchemaPart = {
    sqlId: {
        type: 'int',
        primary: true,
        generated: true
    },
    createdAt: {
        type: 'bigint',
        default: 0
    },
    lastUpdate: {
        type: 'timestamp',
        updateDate: true
    }
};


export const Account = new orm.EntitySchema({
   name: 'Account',
   columns: {
       ...BaseColumnSchemaPart,
       altAccountName: {
           type: 'longtext'
       }
   }
});

export const Character = new orm.EntitySchema({
   name: 'Character',
    columns: {
        ...BaseColumnSchemaPart,
        accountId:{
            type: 'bigint',
        },
       position: {
           type: 'longtext',
           nullable: true
       }
    }

});

export const BankAccount = new orm.EntitySchema({
    name: 'BankAccount',
    columns: {
        ...BaseColumnSchemaPart,
        accountId:{
            type: 'bigint',
        },
        bankAccountId:{
            type: 'bigint',
        },
        bankBalance:{
            type: 'bigint',
        }

    }

});