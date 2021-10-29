
import { PartnerDTO } from '../dto/partner.dto';
import localDataFile from '../data/localDataFile';
import { IPartnersRepository } from '../interfaces/IPartnersRepository';
import { Office } from '../models/Office';
import { Partner } from '../models/Partner';

export class PartnersRepository implements IPartnersRepository {
  private partnersList: Partner[] = [];

  constructor() {
    const partnersString = localDataFile.readData();
    const parsed = JSON.parse(partnersString);
    if (Array.isArray(parsed)) {
      parsed.forEach((partner) => {
        this.partnersList.push(
          new Partner(
            partner.id,
            partner.urlName,
            partner.organization,
            partner.customerLocations,
            partner.willWorkRemotely,
            partner.website,
            partner.services,
            partner.offices.map((office: any) => {
              return new Office(
                office.location,
                office.address,
                office.coordinates
              );
            })
          )
        );
      });
    }
  }

  public getPartnerById(id: number): Partner {
    return this.partnersList.filter(selectedPartner => selectedPartner.id === id)[0];
  }

  public getPartners(range: number, coordinates: string): PartnerDTO[] {
    let partners: Partner[] = [];
    let partnersBasicInfo: PartnerDTO[] = [];
    if (coordinates === "0,0" || range === 0) {
      partners = this.partnersList;
    }
    else {
      this.partnersList.forEach(partner => {
        partner.offices.forEach(office => {
          if (this.distanceFrom(coordinates, office.coordinates) <= range) {
            partners.push(partner);
          }
        });
      });
    }
    const distinctPartners = partners.filter(
      (partner, i, arr) => arr.findIndex(t => t.id === partner.id) === i
    );

    distinctPartners.sort((a, b) => (a.organization < b.organization ? -1 : 1));
    distinctPartners.forEach(sortedPartner => {
      let partnerBasicInfo: PartnerDTO = new PartnerDTO();
      partnerBasicInfo.id = sortedPartner.id;
      partnerBasicInfo.organization = sortedPartner.organization;
      sortedPartner.offices.forEach(office => {
        if (!partnerBasicInfo.locations) {
          partnerBasicInfo.locations = "'" + office.location + "'";
        }
        else {
          partnerBasicInfo.locations = partnerBasicInfo.locations + (", " + "'" + office.location + "'");
        }
      });
      partnersBasicInfo.push(partnerBasicInfo);
    });

    return partnersBasicInfo;
  }

  /**
   * Convert degrees to radius
   * @param deg Value to convert
   * @returns Radius value
   */
  private deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  /**
   * Calculate distance between two coordinate points
   * @param pointB Destination point
   * @returns Distance in KM
   */
  distanceFrom(coordinates1: string, coordinates2: string): number {
    let latlong1 = coordinates1.split(",");
    let latitude1 = parseFloat(latlong1[0]);
    let longitude1 = parseFloat(latlong1[1]);

    let latlong2 = coordinates2.split(",");
    let latitude2 = parseFloat(latlong2[0]);
    let longitude2 = parseFloat(latlong2[1]);

    const R = 6371e3; // Radius of the earth in km
    const dLat = this.deg2rad(latitude1 - latitude2);
    const dLon = this.deg2rad(longitude1 - longitude2);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(latitude2)) *
      Math.cos(this.deg2rad(latitude1)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    var km = d / 1000;
    return parseFloat(km.toFixed(1));
  }
}
