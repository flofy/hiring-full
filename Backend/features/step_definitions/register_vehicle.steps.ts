import { Given, When, Then } from '@cucumber/cucumber';
import { Fleet } from "../../src/Domain/Fleet/Fleet";
import assert from 'assert';

// Steps spécifiques à l'enregistrement de véhicules
Given('the fleet of another user', function() {
    this.another_fleet = new Fleet(2);
});

Given('this vehicle has been registered into the other user\'s fleet', function() {
    this.another_fleet.registerVehicle(this.vehicle);
});

When('I register this vehicle into my fleet', function() {
    this.fleet.registerVehicle(this.vehicle);
});

When('I try to register this vehicle into my fleet', function() {
    try {
        this.fleet.registerVehicle(this.vehicle);
        this.already_registered = false;
    } catch (error) {
        this.already_registered = true;
    }
});

Then('this vehicle should be part of my vehicle fleet', function() {
    assert(this.fleet.hasVehicle(this.vehicle));
});

Then('I should be informed that this vehicle has already been registered into my fleet', function() {
    assert(this.already_registered);
});