import * as alt from 'alt-server';
import * as chat from 'chat';
import {db} from "../server.mjs";
import {Account, BankAccount, Character} from "../entities/entities.mjs";

//X:12.494 Y:-1110.130 Z: 29.797
const playerSpawn = {
    x: -275.522,
    y: 6635.835,
    z: 7.425
};

// weapon geben
export function playergiveWeapon(player, args){
    let weapon = 'weapon_'+ args[0];
    let note = 'du hast eine ' + args[0] + ' bekommen';
    alt.log(weapon);
    player.giveWeapon(alt.hash(weapon), 1000, true);
    alt.emitClient(player, 'notifi', note);
}
//v spawn
export function vehicle(player, args){
    let pos = player.pos;
    let vehicle = new alt.Vehicle(args[0],pos.x , pos.y , pos.z, 0, 0, 0);
    alt.emitClient(player,'setinv', vehicle);
    vehicle.engineOn = true;
}

export async function spawnPlayer(player) {
    player.model = 'mp_m_freemode_01';
    alt.emitClient(player, 'localPlayerName');

    if (!player.dbPos) {
        player.spawn(playerSpawn.x, playerSpawn.y, playerSpawn.z);
    } else {
        player.spawn(player.dbPos.x, player.dbPos.y, player.dbPos.z);
    }
};

alt.onClient('sendPlayerName', (player, currentName) => {
    db.selectData('Account', ['altAccountName'], async (data1) => {
        let currentNameAlt = JSON.stringify(currentName);
        let playerDataName;
        await db.fetchAllByField('altAccountName', currentNameAlt, 'Account', async (data) => {
            playerDataName = data;
            if (!playerDataName) {
                await db.upsertDataAsync({altAccountName: currentNameAlt}, 'Account');
            } else {
                player.dbSqlId = playerDataName[0].sqlId;
            }
        });
    });
    db.selectData('Character', ['position', 'accountId'], async (data) => {
        const currentPos = JSON.stringify(player.pos);
        console.log(currentPos);
        await db.upsertDataAsync({accountId: player.dbSqlId, position: currentPos}, 'Character');
        await db.fetchAllByField('position', currentPos, 'Character',async (data) =>{
            console.log(data);
            player.dbPos = data;
        });
    });
});

//nach Tod
export async function deadSpawnPlayer(player) {
  const currentPlayerHealth = player.health;
  if (currentPlayerHealth === 0) {

  }
}
//atower
export function spawnPoint(player){
    player.pos = {
    x: -275.522,
    y: 6635.835,
    z: 7.425
    };
}
// afly
export function afly(player){
    let pos = player.pos;
    let aflyo = 'oppressor2';

    if (!player.vehicle) {
        let vehicle = new alt.Vehicle(aflyo,pos.x, pos.y, pos.z, 0, 0, 0);
        alt.emitClient(player, 'setinv', vehicle);
        player.vehicleAfly = vehicle;
        vehicle.engineOn = true;
    } else if(player.vehicleAfly) {
        player.vehicleAfly.destroy();
        player.vehicleAfly = undefined;
        chat.broadcast('gonzo stinkt! und hat dein afly kapput gemacht');
    }
}
// motor an/aus
export function motor(player){
    player.activeVehicle.manualEngineControl = true;
    player.activeVehicle.engineOn = !player.activeVehicle.engineOn;
}
export function enterveh(player, vehicle, seat){
    player.activeVehicle = vehicle;
}

export function leftveh(player){
    player.activeVehicle = undefined;
}



