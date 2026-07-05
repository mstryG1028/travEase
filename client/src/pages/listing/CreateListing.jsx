import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { successToast, errorToast } from "../../utils/toast";
import { becomeHost,createListing } from "../../services/listing.service";
import useAuth from "../../hooks/useAuth";

function CreateListing() {
  const navigate = useNavigate();

  const { fetchUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    propertyType: "Hotel",

    address: "",
    city: "",
    state: "",
    country: "",

    guests: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,

    basePrice: "",
    currentPrice: "",

    contactName: "",
    contactPhone: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (key === "contactName") return;
        if (key === "contactPhone") return;

        formData.append(key, form[key]);
      });

      formData.append(
        "contactPerson",
        JSON.stringify({
          name: form.contactName,
          phone: form.contactPhone,
        }),
      );

      if (image) {
        formData.append("image", image);
      }

      await becomeHost(formData);
      try {
        await createListing(formData);
        successToast("Property listed successfully.");
      } catch (error) {
        errorToast(error);
      }
      await fetchUser();

      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Unable to create listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">Become a Host</h1>

      <form
        onSubmit={submitHandler}
        className="space-y-5 bg-white p-8 rounded-2xl shadow"
      >
        <input
          className="w-full border p-3 rounded-xl"
          placeholder="Property Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          className="w-full border p-3 rounded-xl"
          rows={5}
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <select
          className="w-full border p-3 rounded-xl"
          name="propertyType"
          value={form.propertyType}
          onChange={handleChange}
        >
          <option>Hotel</option>
          <option>Villa</option>
          <option>Apartment</option>
          <option>Hostel</option>
          <option>Resort</option>
          <option>Homestay</option>
          <option>Cottage</option>
        </select>

        <input
          className="w-full border p-3 rounded-xl"
          placeholder="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-3 gap-4">
          <input
            className="border p-3 rounded-xl"
            placeholder="City"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />

          <input
            className="border p-3 rounded-xl"
            placeholder="State"
            name="state"
            value={form.state}
            onChange={handleChange}
            required
          />

          <input
            className="border p-3 rounded-xl"
            placeholder="Country"
            name="country"
            value={form.country}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <input
            className="border p-3 rounded-xl"
            type="number"
            placeholder="Guests"
            name="guests"
            value={form.guests}
            onChange={handleChange}
          />

          <input
            className="border p-3 rounded-xl"
            type="number"
            placeholder="Bedrooms"
            name="bedrooms"
            value={form.bedrooms}
            onChange={handleChange}
          />

          <input
            className="border p-3 rounded-xl"
            type="number"
            placeholder="Beds"
            name="beds"
            value={form.beds}
            onChange={handleChange}
          />

          <input
            className="border p-3 rounded-xl"
            type="number"
            placeholder="Bathrooms"
            name="bathrooms"
            value={form.bathrooms}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            className="border p-3 rounded-xl"
            type="number"
            placeholder="Base Price"
            name="basePrice"
            value={form.basePrice}
            onChange={handleChange}
          />

          <input
            className="border p-3 rounded-xl"
            type="number"
            placeholder="Current Price"
            name="currentPrice"
            value={form.currentPrice}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            className="border p-3 rounded-xl"
            placeholder="Contact Person"
            name="contactName"
            value={form.contactName}
            onChange={handleChange}
          />

          <input
            className="border p-3 rounded-xl"
            placeholder="Phone Number"
            name="contactPhone"
            value={form.contactPhone}
            onChange={handleChange}
          />
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border p-3 rounded-xl"
        />

        <button
          disabled={loading}
          className="w-full bg-[var(--primary)] text-white rounded-xl py-3"
        >
          {loading ? "Creating..." : "Become a Host"}
        </button>
      </form>
    </section>
  );
}

export default CreateListing;
