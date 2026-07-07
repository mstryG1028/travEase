class AmenitiesTool {
  async execute(listing) {
    return {
      amenities: listing.amenities,
      guests: listing.guests,
      bedrooms: listing.bedrooms,
      beds: listing.beds,
      bathrooms: listing.bathrooms,
      propertyType: listing.propertyType,
    };
  }
}

export default new AmenitiesTool();
