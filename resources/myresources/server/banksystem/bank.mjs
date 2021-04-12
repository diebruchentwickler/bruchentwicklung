import * as alt from 'alt-server';
import * as chat from 'chat';
import {Account, BankAccount} from "../entities/entities.mjs";
import {db} from "../server.mjs";

export function Accountbank(player) {

    db.selectData('BankAccount',['bankAccountId'], async (account) =>{
        player.dbSqlId
        await db.fetchAllByField('altAccountName', currentNameAlt, 'BankAccount', async (data) => {

        });
    });

    player.name = player;
    player.balance = parseFloat(balance);
    let note = `${player.name} du hast ein Bankkonto mit einem Startkapital von ${player.balance}$ angelegt!`;
    alt.emitClient(player, 'notifi', note);

}

Accountbank.deposit = function(player, amount) {
    player.balance += parseFloat(amount);
    let note = `Einzahlung: ${player.name} du hast jetzt ${player.balance} $`;
    alt.emitClient(player, 'notifi', note);
    alt.log(`Einzahlung: ${player.name} du hast jetzt ${player.balance} $`);
};

Accountbank.withdraw = function(player, amount) {
    player.balance -= parseFloat(amount);
    if(player.balance < 0 ){
        let note = `Abhebung: ${player.name} du bist jetzt ${player.balance} $ im Minus!`;
        alt.emitClient(player, 'notifi', note);
    } else {
        let note = `Abhebung: ${player.name} du hast jetzt ${player.balance} $`;
        alt.emitClient(player, 'notifi', note);
    }
};




