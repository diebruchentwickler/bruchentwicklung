import * as alt from 'alt-server';
import * as chat from 'chat';
import {Account, BankAccount} from "../entities/entities.mjs";
import {db} from "../server.mjs";


export async function Accountbank(player) {
    let playerBankId = JSON.stringify(player.dbSqlId);
    let balance = 1000;
    player.name = player;
    player.balance = balance;
    const newData = {
        bankAccountId: playerBankId,
        bankBalance: balance
    };
    await db.fetchAllByField('bankAccountId', playerBankId, 'BankAccount', async (sendPlayerBankId) => {
        if (sendPlayerBankId.length < 1) {
            db.insertData(newData, 'BankAccount', async (data) => {
                let bankNote = `${player.name} du hast ein Bankkonto mit einem Startkapital von ${player.balance}$ angelegt!`;
                alt.emitClient(player, 'notifi', bankNote);
            });
        } else {
            player.bankId = sendPlayerBankId[0].sqlId;
            let bankNoteKonto = `${player.name} du hast bereits ein Konto angelegt!`;
            alt.emitClient(player, 'notifi', bankNoteKonto);
        }
        });



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




