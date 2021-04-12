import * as alt from 'alt-server';
import * as chat from 'chat';
import SQL from '../../datenbank/database.mjs';
import {Account, BankAccount, Character} from "./entities/entities.mjs";
import {
    afly, deadSpawnPlayer,
    enterveh,
    leftveh,
    motor,
    playergiveWeapon,
    spawnPlayer,
    spawnPoint,
    vehicle
} from "./command/commandFunction.mjs";
import {Accountbank} from "./banksystem/bank.mjs";

export const db = new SQL('mysql', '127.0.0.1', '3306', 'root','','lernen_altv', [Account, Character,BankAccount]);

alt.on('ConnectionComplete', () => {
    console.log('Ich glaub es hat funktioniert gonzo xD');
});


alt.on('playerConnect', spawnPlayer);
alt.on('playerDeath', deadSpawnPlayer);
alt.on('playerEnteredVehicle', enterveh);
alt.on('playerLeftVehicle', leftveh);

//last position

//Waffe geben
chat.registerCmd('weapon', playergiveWeapon);

// Auto Spawnen
chat.registerCmd('v', vehicle);

// Leben setzten
chat.registerCmd('sethp', (player, args) =>{
     player.health = (parseInt(args[0]) + 100);
});

//spawn
chat.registerCmd('spawn',(player)=> {
    spawnPoint(player);
});

//afly
chat.registerCmd('afly',afly);

//montor an  / aus
chat.registerCmd('motor',motor);

//bank System
chat.registerCmd('bank', Accountbank);// Account anlegen
chat.registerCmd('setcash', Accountbank.deposit);// geld hinzufügen
chat.registerCmd('getcash', Accountbank.withdraw);// geld abheben
