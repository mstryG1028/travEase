import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";

import { getListingById, updateListing } from "../../services/listing.service";

import { successToast, errorToast } from "../../utils/toast";

import React from "react";

const EditListing = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    propertyType: "",
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
  });

  useEffect(() => {
    fetchListing();
  }, []);

  async function fetchListing() {
    try {
      const response = await getListingById(id);

      const listing = response.data.data;

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
      });
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (image) {
        formData.append("image", image);
      }

      await updateListing(id, formData);

      successToast("Listing Updated");

      navigate("/my-listings");
    } catch (error) {
      errorToast(error);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Loader />;

  return (
    <section className="min-h-screen bg-[var(--background)] py-10">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-8">
          Edit Listing
        </h1>

        <form
          onSubmit={handleSubmit}
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
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="
    w-full
    border
    border-theme
    rounded-xl
    p-3
    bg-surface
    text-theme
  "
            />
          </div>

          <Button type="submit" loading={saving} fullWidth>
            Update Listing
          </Button>
        </form>
      </div>
    </section>
  );
};

export default EditListing;
