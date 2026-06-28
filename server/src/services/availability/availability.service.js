import availabilityRepository from "../../repositories/availability.repository.js";

import ApiError from "../../utils/ApiError.js";

// ==============================

function getDates(start, end) {
  let dates = [];

  let current = new Date(start);

  while (current <= new Date(end)) {
    dates.push(new Date(current));

    current.setDate(current.getDate() + 1);
  }

  return dates;
}

// ==============================

export async function blockDates(
  listingId,

  checkIn,

  checkOut,
) {
  let availability = await availabilityRepository.findByListing(listingId);

  if (!availability) {
    availability = await availabilityRepository.create({
      listing: listingId,

      blockedDates: [],
    });
  }

  const dates = getDates(
    checkIn,

    checkOut,
  );

  availability.blockedDates.push(...dates);

  await availabilityRepository.save(availability);
}

// ==============================

export async function unblockDates(
  listingId,

  checkIn,

  checkOut,
) {
  const availability = await availabilityRepository.findByListing(listingId);

  if (!availability) {
    return;
  }

  const dates = getDates(
    checkIn,

    checkOut,
  ).map((d) => d.toISOString());

  availability.blockedDates = availability.blockedDates.filter(
    (date) => !dates.includes(new Date(date).toISOString()),
  );

  await availabilityRepository.save(availability);
}

// ==============================

export async function calendar(listingId) {
  const availability = await availabilityRepository.findByListing(listingId);

  if (!availability) {
    throw new ApiError(
      404,

      "Calendar not found",
    );
  }

  return availability;
}

// ==============================

export async function ownerBlock(
  listingId,

  date,
) {
  let availability = await availabilityRepository.findByListing(listingId);

  if (!availability) {
    availability = await availabilityRepository.create({
      listing: listingId,

      blockedDates: [],
    });
  }

  availability.blockedDates.push(new Date(date));

  await availabilityRepository.save(availability);
}

export async function ownerUnblock(
  listingId,

  date,
) {
  const availability = await availabilityRepository.findByListing(listingId);

  availability.blockedDates = availability.blockedDates.filter(
    (d) => new Date(d).toISOString() !== new Date(date).toISOString(),
  );

  await availabilityRepository.save(availability);
}
