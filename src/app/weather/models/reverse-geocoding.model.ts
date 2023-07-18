export interface ReverseGeocoding {
  summary: {
    numResults: number;
    queryTime: number;
  };
  addresses: [
    {
      address: {
        streetName: string;
        crossStreet: string;
        municipalitySubdivision: string;
        municipality: string;
        countrySubdivision: string;
        postalCode: string;
        countryCode: string;
        country: string;
        countryCodeISO3: string;
        freeformAddress: string;
        localName: string;
        street: string;
      };
      position: string;
    }
  ];
}
