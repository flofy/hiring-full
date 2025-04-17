import { Given, When, Then } from "@cucumber/cucumber";
import { Location } from "../../src/Domain/Location/Location";
import assert from "assert";

Given("a location", function () {
	this.location = new Location({ lng: 10, lat: 20 });
});

Given("my vehicle has been parked into this location", function () {
	this.vehicle.setLocation(this.location);
});

When("I park my vehicle at this location", function () {
	this.vehicle.updateLocation(this.location);
});

When("I try to park my vehicle at this location", function () {
	try {
		this.vehicle.updateLocation(this.location);
		this.already_there = false;
	} catch (error) {
		this.already_there = true;
	}
});

Then(
	"the known location of my vehicle should verify this location",
	function () {
		assert(this.vehicle.location === this.location);
	},
);

Then(
	"I should be informed that my vehicle is already parked at this location",
	function () {
		assert(this.already_there);
	},
);
