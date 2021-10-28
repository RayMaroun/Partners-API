import { PartnerDTO } from "../dto/partner.dto";
import { Partner } from "../models/Partner";

/**
 * Interface for PartnerService
 */
export interface IPartnersService {
  getPartners(range: number, coordinates: string): PartnerDTO[];
  getPartnerById(partnerId: number): Partner;
}