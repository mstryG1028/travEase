import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { successToast, errorToast } from "../../utils/toast";
import { becomeHost, createListing } from "../../services/listing.service";

import useAuth from "../../hooks/useAuth";
import Button from "../../components/ui/Button";

function BecomeHost() {
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


      successToast("Property listed successfully.");

      await fetchUser();

      navigate("/");
    } catch (err) {
      console.log(err);

      errorToast(err?.response?.data?.message || "Unable to create listing.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-[var(--border)] rounded-xl p-3 bg-[var(--surface)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition";

  return (
    <section className="min-h-screen bg-[var(--background)] py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mt-4 text-5xl font-bold text-[var(--text-primary)]">
            Add New Listing
          </h1>
        </div>

        <form
          onSubmit={submitHandler}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Property Details */}
          <div className="p-8 border-b border-[var(--border)]">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Property Details
            </h2>

            <div className="space-y-5">
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
                placeholder="Describe your property..."
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
            </div>
          </div>

          {/* Address */}
          <div className="p-8 border-b border-[var(--border)]">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Location
            </h2>

            <div className="space-y-5">
              <input
                className={inputClass}
                placeholder="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />

              <div className="grid md:grid-cols-3 gap-5">
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
            </div>
          </div>

          {/* Capacity */}
          <div className="p-8 border-b border-[var(--border)]">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Capacity
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
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
          </div>

          {/* Pricing */}
          <div className="p-8 border-b border-[var(--border)]">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Pricing
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
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
          </div>

          {/* Contact */}
          <div className="p-8 border-b border-[var(--border)]">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Contact Information
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
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
          </div>

          {/* Image */}
          <div className="p-8 border-b border-[var(--border)]">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Property Image
            </h2>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--background)] p-6 text-[var(--text-primary)] file:mr-4 file:rounded-xl file:border-0 file:bg-[var(--primary)] file:px-5 file:py-3 file:font-semibold file:text-white cursor-pointer"
            />
          </div>

          {/* Footer */}
          <div className="p-8 flex justify-end bg-[var(--background)]">
            <Button
              type="submit"
              loading={loading}
              className="px-10 py-3 rounded-xl"
            >
              Publish Listing
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default BecomeHost;
