export const generateBadge = (listingType) => {

    switch (listingType) {

        case "Villa":
            return "Luxury Traveller";

        case "Resort":
            return "Resort Explorer";

        case "Hotel":
            return "City Traveller";

        default:
            return "Traveller";

    }

};