import Button from "../ui/Button";

function ListingFooter({ price }) {
  return (
    <div
      className="
        flex
        justify-between
        items-center
        mt-6
      "
    >
      <div>
        <h2 className="text-2xl font-bold text-primary">₹{price}</h2>

        <p className="text-secondary">per night</p>
      </div>

      <Button>Book Now</Button>
    </div>
  );
}

export default ListingFooter;
