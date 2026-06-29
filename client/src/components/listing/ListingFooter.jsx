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
        <h2 className="text-2xl font-bold">₹{price}</h2>

        <p className="text-gray-500">per night</p>
      </div>

      <Button>Book Now</Button>
    </div>
  );
}

export default ListingFooter;
