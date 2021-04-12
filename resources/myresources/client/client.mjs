import * as game from "natives";
import * as alt from 'alt-client';

let vehicleToSetPlayerIntoVehicleOnCreation = null;

alt.onServer('setinv', (vehicle) => {
    vehicleToSetPlayerIntoVehicleOnCreation = vehicle;
});

alt.on('gameEntityCreate', (entity) => {
    if (vehicleToSetPlayerIntoVehicleOnCreation == entity) {
        game.setPedIntoVehicle(alt.Player.local.scriptID, vehicleToSetPlayerIntoVehicleOnCreation.scriptID, -1);
        vehicleToSetPlayerIntoVehicleOnCreation = null;
    }
});

alt.onServer('notifi',  (note) => {

    game.setNotificationTextEntry('STRING');
    game.addTextComponentSubstringPlayerName(note);
    game.drawNotification(false, true);

});

alt.onServer('localPlayerName', (player) => {
    const currentName = alt.Player.local.name;
    alt.emitServer('sendPlayerName', currentName);
});