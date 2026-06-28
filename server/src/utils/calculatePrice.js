export const calculatePrice = (

    basePrice,

    isWeekend,

    isFestival,

    demand = 1

) => {

    let price = basePrice;

    if (isWeekend)

        price *= 1.20;

    if (isFestival)

        price *= 1.40;

    price *= demand;

    return Math.round(price);

};