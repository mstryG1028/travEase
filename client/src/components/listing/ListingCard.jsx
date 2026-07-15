import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

import Button from "../ui/Button";
import ListingImage from "./ListingImage";
import WishlistButton from "./WishListButton";
import ConfirmModal from "../ui/ConfirmModal";
import { deleteListing } from "../../services/listing.service";
import { successToast, errorToast } from "../../utils/toast";

function ListingCard({ listing, isOwner = false, onDelete }) {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  async function handleDelete() {
    try {
      await deleteListing(listing._id);

      successToast("Listing deleted successfully.");

      onDelete?.(listing._id);
      navigate("/my-listings");
      setShowDeleteModal(false);
    } catch (error) {
      errorToast(error?.response?.data?.message || "Unable to delete listing.");
    }
  }

  function handleEdit(e) {
    e.preventDefault();
    e.stopPropagation();

    navigate(`/listings/edit/${listing._id}`);
  }
  return (
    <div
      className="
      group
      bg-surface
      rounded-[26px]
      border
      border-theme
      overflow-hidden
      shadow-theme
      hover:shadow-theme-lg
      hover:-translate-y-2
      transition-theme
    "
    >
      <Link to={`/listings/${listing._id}`}>
        {/* Image */}
        <div className="relative">
          <ListingImage image={listing.image?.url} listingId={listing._id} />
          <WishlistButton listingId={listing._id} />
        </div>

        {/* Content */}
        <div className="px-5 py-5">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-theme line-clamp-1">
                {listing.title}
              </h2>

              <p className="mt-2 flex items-center gap-2 muted">
                <FaMapMarkerAlt className="text-xs" />
                {listing.city}, {listing.state}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400 text-sm" />

              <span className="font-semibold text-theme">
                {listing.averageRating?.toFixed(1) || "New"}
              </span>
            </div>
          </div>

          {/* Host */}
          <p className="mt-3 muted">
            Hosted by{" "}
            <span className="font-medium text-theme">
              {listing.owner?.fullName || "Unknown"}
            </span>
          </p>

          {/* Divider */}
          <div className="my-5 border-t border-theme" />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-theme">
                ₹{listing.currentPrice}
              </h2>

              <p className="text-sm muted">per night</p>
            </div>

            {!isOwner && (
              <button
                className="
                bg-primary
                px-5
                py-2.5
                rounded-full
                text-white
                text-sm
                font-semibold
                transition-theme
                hover:opacity-90
              "
              >
                Book
              </button>
            )}
          </div>
        </div>
      </Link>

      {/* Owner Actions */}
      {isOwner && (
        <div className="flex gap-3 p-5 pt-0">
          <Button fullWidth variant="outline" onClick={handleEdit}>
            Edit
          </Button>

          <Button
            fullWidth
            variant="danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </Button>
        </div>
      )}

      <ConfirmModal
        open={showDeleteModal}
        title="Delete Listing"
        message={`Are you sure you want to delete "${listing.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}

export default ListingCard;
