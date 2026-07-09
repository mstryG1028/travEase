import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Calendar, MapPin, Pencil, Trash2 } from "lucide-react";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
import ConfirmModal from "../../components/ui/ConfirmModal";
import CreateMemoryModal from "../../components/memory/CreateMemoryModal";
import MemoryGallery from "../../components/memory/MemoryGallery";

import { getMemory, deleteMemory } from "../../services/memory.service";

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function MemoryDetailsPage() {
  const { memoryId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [memory, setMemory] = useState(null);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    loadMemory();
  }, [memoryId]);

  async function loadMemory() {
    try {
      setLoading(true);

      const res = await getMemory(memoryId);

      setMemory(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      await deleteMemory(memoryId);

      navigate("/my-memories");
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) return <Loader />;

  if (!memory) {
    return (
      <EmptyState
        title="Memory not found"
        description="This memory does not exist."
      />
    );
  }

  return (
    <section className="min-h-screen bg-theme py-10">
      <div className="mx-auto max-w-7xl px-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-theme">{memory.title}</h1>

            <p className="mt-2 text-muted">
              {memory.caption || "No description added."}
            </p>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setEditOpen(true)}>Edit</Button>

            <Button variant="danger" onClick={() => setDeleteOpen(true)}>
              Delete
            </Button>
          </div>
        </div>

        <MemoryGallery memory={memory} refresh={loadMemory} />

        <div className="rounded-3xl border border-theme bg-surface p-6">
          <h2 className="mb-6 text-2xl font-semibold text-theme">
            Trip Information
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-muted">Property</p>

              <h3 className="mt-1 text-theme font-semibold">
                {memory.listing?.title}
              </h3>
            </div>

            <div>
              <p className="text-muted">Location</p>

              <h3 className="mt-1 text-theme font-semibold">
                {memory.listing?.city}, {memory.listing?.country}
              </h3>
            </div>

            <div>
              <p className="text-muted">Check In</p>

              <h3 className="mt-1 text-theme font-semibold">
                {formatDate(memory.booking?.checkIn)}
              </h3>
            </div>

            <div>
              <p className="text-muted">Check Out</p>

              <h3 className="mt-1 text-theme font-semibold">
                {formatDate(memory.booking?.checkOut)}
              </h3>
            </div>

            <div>
              <p className="text-muted">Created</p>

              <h3 className="mt-1 text-theme font-semibold">
                {formatDate(memory.createdAt)}
              </h3>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-theme bg-surface p-8">
          <h2 className="text-2xl font-bold text-theme">AI Flashback</h2>

          <p className="mt-3 text-muted">
            Soon you'll be able to generate an AI travel story, beautiful
            collage and cinematic recap using your uploaded memories.
          </p>

          <div className="mt-6 rounded-2xl bg-primary/10 p-6 text-primary font-semibold">
            🚀 Coming Soon
          </div>
        </div>
      </div>

      <CreateMemoryModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        editMode
        memory={memory}
        onSuccess={loadMemory}
      />

      <ConfirmModal
        open={deleteOpen}
        title="Delete Memory"
        description="Are you sure you want to delete this memory?"
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </section>
  );
}

export default MemoryDetailsPage;
