
import { PartnerDTO } from "../dto/partner.dto";
import { Partner } from "../models/Partner";
import { IRepository } from "./IRepository";
  /**
 * Repository interface.
 */
export interface IPartnersRepository extends IRepository<Partner> {
  /**
   * Receives an ID and fetch data from file by that ID.
   *
   * @param id Id of the partner
   * 
   * @returns Partner
   */
   getPartnerById(id: number): Partner;

   /**
    * Get partners from file.
    *
    * @param range Range to search in
    * @param coordinates Coordinates to filter on
    *
    * @returns Array of Partners
    */
   getPartners(range: number, coordinates: string): PartnerDTO[];
}