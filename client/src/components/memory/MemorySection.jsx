import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";

import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";
import ConfirmModal from "../ui/ConfirmModal";

import MemoryCard from "./MemoryCard";
import CreateMemoryModal from "./CreateMemoryModal";

import useMemories from "../../hooks/useMemories";

function MemorySection({ bookingId }) {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [deleteMemory, setDeleteMemory] = useState(null);

  const {
    memories,
    loading,
    createMemory,
    deleteMemory: removeMemory,
  } = useMemories(bookingId);

  const handleDelete = async () => {
    if (!deleteMemory) return;

    await removeMemory(deleteMemory._id);

    setDeleteMemory(null);
  };

  const handleView = (memory) => {
    navigate(`/bookings/${bookingId}/memories/${memory._id}`);
  };

  const handleEdit = (memory) => {
    navigate(`/bookings/${bookingId}/memories/${memory._id}`);
  };

  if (loading) {
    return (
      <div className="py-10 text-center text-theme">Loading memories...</div>
    );
  }

  return (
    <>
      <section className="mt-10 space-y-8">
        {/* Header */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-theme">📸 Flashbacks</h2>

            <p className="mt-2 text-muted">
              Relive your favourite moments from this trip. These memories are
              completely private and visible only to you.
            </p>
          </div>

          <Button onClick={() => setOpenCreateModal(true)}>
            + Save This Memory
          </Button>
        </div>

        {/* Empty */}

        {!loading && memories.length === 0 && (
          <EmptyState
            icon={<Camera size={70} />}
            title="No memories yet"
            description="Start building your private travel journal by uploading your first memory."
          />
        )}

        {/* Cards */}

        {memories.length > 0 && (
          <div
            className="
              grid
              gap-8

              md:grid-cols-2

              xl:grid-cols-3
            "
          >
            {memories.map((memory) => (
              <MemoryCard
                key={memory._id}
                memory={memory}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={() => setDeleteMemory(memory)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Create */}

      <CreateMemoryModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onCreate={createMemory}
      />

      {/* Delete */}

      <ConfirmModal
        open={!!deleteMemory}
        title="Delete Memory"
        description="Are you sure you want to permanently delete this memory? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setDeleteMemory(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default MemorySection;
