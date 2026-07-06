import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { successToast, errorToast } from "../../utils/toast";

import * as listingService from "../../services/listing.service";
import { useParams } from "react-router-dom";

import Button from "../../components/ui/Button";

function CreateListing() {
  const { id } = useParams();

  const isEdit = Boolean(id);

  const navigate = useNavigate();

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

      if (isEdit) {
        await listingService.updateListing(id, formData);

        successToast("Listing updated successfully.");
      } else {
        await listingService.createListing(formData);

        successToast("Listing created successfully.");
      }


      navigate("/my-listings");
    } catch (err) {
      console.log(err);

      errorToast(err?.response?.data?.message || "Unable to create listing.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isEdit) return;

    async function fetchListing() {
      try {
        const listing = await listingService.getSingleListing(id);

        setForm({
          title: listing.title,
          description: listing.description,
          propertyType: listing.propertyType,
          address: listing.address,
          city: listing.city,
          state: listing.state,
          country: listing.country,
          guests: listing.guests,
          bedrooms: listing.bedrooms,
          beds: listing.beds,
          bathrooms: listing.bathrooms,
          basePrice: listing.basePrice,
          currentPrice: listing.currentPrice,
          contactName: listing.contactPerson.name,
          contactPhone: listing.contactPerson.phone,
        });
      } catch (err) {
        console.log(err);
      }
    }

    fetchListing();
  }, [id]);

  const inputClass =
    "w-full border border-[var(--border)] rounded-xl p-3 bg-[var(--surface)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition";

  return (
    <section className="min-h-screen bg-[var(--background)] py-10">
      <div className="max-w-4xl mx-auto px-6">
        <h1>{isEdit ? "Edit Listing" : "Create Listing"}</h1>

        <form
          onSubmit={submitHandler}
          className="space-y-5 bg-[var(--surface)] border border-[var(--border)] p-8 rounded-2xl shadow"
        >
          <input
            className={inputClass}
            placeholder="Property Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            className={inputClass}
            rows={5}
            placeholder="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <select
            className={inputClass}
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
            className={inputClass}
            placeholder="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              className={inputClass}
              placeholder="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
            />

            <input
              className={inputClass}
              placeholder="State"
              name="state"
              value={form.state}
              onChange={handleChange}
              required
            />

            <input
              className={inputClass}
              placeholder="Country"
              name="country"
              value={form.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <input
              className={inputClass}
              type="number"
              placeholder="Guests"
              name="guests"
              value={form.guests}
              onChange={handleChange}
            />

            <input
              className={inputClass}
              type="number"
              placeholder="Bedrooms"
              name="bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
            />

            <input
              className={inputClass}
              type="number"
              placeholder="Beds"
              name="beds"
              value={form.beds}
              onChange={handleChange}
            />

            <input
              className={inputClass}
              type="number"
              placeholder="Bathrooms"
              name="bathrooms"
              value={form.bathrooms}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className={inputClass}
              type="number"
              placeholder="Base Price"
              name="basePrice"
              value={form.basePrice}
              onChange={handleChange}
            />

            <input
              className={inputClass}
              type="number"
              placeholder="Current Price"
              name="currentPrice"
              value={form.currentPrice}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className={inputClass}
              placeholder="Contact Person"
              name="contactName"
              value={form.contactName}
              onChange={handleChange}
            />

            <input
              className={inputClass}
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
            className="w-full border border-[var(--border)] rounded-xl p-3 bg-[var(--surface)] text-[var(--text-primary)] file:mr-4 file:px-4 file:py-2 file:border-0 file:rounded-lg file:bg-[var(--primary)] file:text-white file:cursor-pointer"
          />

          <Button type="submit" loading={loading}>
            {isEdit ? "Update Listing" : "Create Listing"}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default CreateListing;
