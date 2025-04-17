import { v4 as uuidv4 } from 'uuid';
import { CreateFleetCommand } from './CreateFleetCommand';
import { FleetRepository } from '../../../Domain/Fleet/FleetRepository';
import { IFleet } from '../../../types';

export class CreateFleetHandler {
  private fleetRepository: FleetRepository;
  
  constructor(fleetRepository: FleetRepository) {
    this.fleetRepository = fleetRepository;
  }

  handle(command: CreateFleetCommand): string {
    const fleetId = uuidv4();
    
    const fleet: IFleet = {
      id: fleetId,
      userId: command.userId,
      vehicles: []
    };
    
    this.fleetRepository.save(fleet);
    
    return fleetId;
  }
}