// filepath: /home/flofy/Documents/contrats/full/Backend/features/step_definitions/common.steps.ts
import { Given } from '@cucumber/cucumber';
import { Fleet } from "../../src/Domain/Fleet/Fleet";
import { Vehicle } from '../../src/Domain/Vehicle/Vehicle';

Given('my fleet', function() {
    this.fleet = new Fleet(1);
});

Given('a vehicle', function() {
    this.vehicle = new Vehicle("6052XAD");
});

Given('I have registered this vehicle into my fleet', function() {
    this.fleet.registerVehicle(this.vehicle);
});