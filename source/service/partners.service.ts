import { PartnerDTO } from '../dto/partner.dto';
import { IPartnersService } from '../interfaces/IPartnersService';
import { IPartnersRepository } from '../interfaces/IPartnersRepository';
import { Partner } from '../models/Partner';
import { PartnersRepository } from '../repository/partner.repository';

/**
 * The actual class that contains all the business logic related to partners.
 * Controller sanitize/validate(basic) and sends data to this class methods.
 */

export class PartnersService implements IPartnersService {
  private partnersRepository: IPartnersRepository;

  constructor() {
    this.partnersRepository = new PartnersRepository();
  }

  public getPartners(range: number, coordinates: string): PartnerDTO[] {
    let partners: PartnerDTO[];
    partners = this.partnersRepository.getPartners(range, coordinates);
    return partners;
  }

  public getPartnerById(partnerId: number): Partner {
    let partner: Partner;
    partner = this.partnersRepository.getPartnerById(partnerId);
    return partner;
  }

}
