import { useEffect, useState } from "react";

import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";
import MemorySection from "../../components/memory/MemorySection";

import { getMyMemories } from "../../services/memory.service";

function MyMemories() {
  const [loading, setLoading] = useState(true);

  const [memories, setMemories] = useState([]);

  
  useEffect(() => {
    loadMemories();
  }, []);

  async function loadMemories() {
    try {
      setLoading(true);

      const res = await getMyMemories();

      setMemories(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="min-h-screen bg-theme py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-primary">My Flashbacks</h1>

          <p className="mt-2 text-secondary">
            Relive your favourite travel memories.
          </p>
        </div>

        {memories.length === 0 ? (
          <EmptyState
            title="No Flashbacks Yet"
            description="Complete a booking and create your first flashback."
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {memories.map((memory) => (
              <MemoryCard
                key={memory._id}
                memory={memory}
                onClick={() => {
                  // setSelectedMemory(memory);
                  // setGalleryOpen(true);
                }}
              />
            ))}
          </div>
        )}

        {/* <MemoryGallery
          open={galleryOpen}
          onClose={() => {
            setGalleryOpen(false);
            setSelectedMemory(null);
          }}
          memory={selectedMemory}
          refresh={loadMemories}
        /> */}
      </div>
    </section>
  );
}

export default MyMemories;
