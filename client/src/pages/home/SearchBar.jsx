import Button from "../ui/Button";

import Input from "../ui/Input";

function SearchBar() {
  return (
    <div
      className="
bg-white
rounded-3xl
shadow-xl
p-6
grid
grid-cols-1
md:grid-cols-5
gap-5
"
    >
      <Input label="Destination" placeholder="Goa" />

      <Input type="date" label="Check In" />

      <Input type="date" label="Check Out" />

      <Input type="number" label="Guests" placeholder="2" />

      <Button variant="primary" fullWidth>
        Search
      </Button>
    </div>
  );
}

export default SearchBar;
