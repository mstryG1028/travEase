import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Image as ImageIcon,
  MapPin,
  Play,
  Video,
} from "lucide-react";

import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";

import { getMemoryById } from "../../services/memory.service";

function MemoryDetails() {
  const { memoryId } = useParams();

  const navigate = useNavigate();

  const [memory, setMemory] = useState(null);

  const [loading, setLoading] = useState(true);

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    loadMemory();
  }, [memoryId]);

  async function loadMemory() {
    try {
      const res = await getMemoryById(memoryId);

      setMemory(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader />;

  if (!memory) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold">Memory Not Found</h2>
      </section>
    );
  }

  const media = memory.media;

  const current = media[selectedIndex];

  const photoCount = media.filter((m) => m.type === "image").length;

  const videoCount = media.filter((m) => m.type === "video").length;

  return (
    <section className="bg-theme min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back */}

        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          Back
        </Button>

        {/* Header */}

        <div className="mt-8 mb-8">
          <h1 className="text-4xl font-bold text-theme">
            {memory.title || "Untitled Memory"}
          </h1>

          <div className="mt-3 flex flex-wrap gap-6 text-secondary">
            <span className="flex items-center gap-2">
              <MapPin size={18} />
              {memory.listing.city}, {memory.listing.country}
            </span>

            <span className="flex items-center gap-2">
              <Calendar size={18} />
              {new Date(memory.booking.checkIn).toLocaleDateString()} -
              {new Date(memory.booking.checkOut).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT */}

          <div className="lg:col-span-2">
            <div className="bg-surface rounded-3xl overflow-hidden">
              <div className="aspect-video bg-black">
                {current.type === "image" ? (
                  <img
                    src={current.url}
                    alt=""
                    className="
                    w-full
                    h-full
                    object-cover
                    "
                  />
                ) : (
                  <video
                    controls
                    src={current.url}
                    className="
                    w-full
                    h-full
                    object-cover
                    "
                  />
                )}
              </div>
            </div>

            {/* Thumbnails */}

            <div
              className="
              grid
              grid-cols-5
              md:grid-cols-8
              gap-3
              mt-5
            "
            >
              {media.map((item, index) => (
                <button
                  key={item._id}
                  onClick={() => setSelectedIndex(index)}
                  className={`
                    relative

                    overflow-hidden

                    rounded-xl

                    ${selectedIndex === index ? "ring-4 ring-primary" : ""}
                  `}
                >
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      alt=""
                      className="
                      w-full
                      h-20
                      object-cover
                      "
                    />
                  ) : (
                    <>
                      <video
                        src={item.url}
                        className="
                        w-full
                        h-20
                        object-cover
                        "
                      />

                      <div
                        className="
                        absolute
                        inset-0

                        flex
                        items-center
                        justify-center

                        bg-black/40
                        "
                      >
                        <Play fill="white" className="text-white" />
                      </div>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT */}

          <div className="space-y-6">
            <div className="bg-surface rounded-3xl p-6">
              <h2 className="text-2xl font-semibold mb-5">Memory Details</h2>

              <div className="space-y-4">
                <div>
                  <p className="text-secondary">Caption</p>

                  <p className="mt-2">
                    {memory.caption || "No caption added."}
                  </p>
                </div>

                <hr className="border-theme" />

                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <ImageIcon size={18} />
                    Photos
                  </span>

                  <strong>{photoCount}</strong>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <Video size={18} />
                    Videos
                  </span>

                  <strong>{videoCount}</strong>
                </div>

                <hr className="border-theme" />

                <div>
                  <p className="text-secondary">Created</p>

                  <p className="mt-2">
                    {new Date(memory.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Future AI */}

            <div className="bg-surface rounded-3xl p-6">
              <h2 className="text-2xl font-semibold">✨ AI Memories</h2>

              <div className="mt-6 space-y-5">
                <div className="rounded-2xl border border-theme p-5">
                  <h3 className="font-semibold">AI Trip Recap</h3>

                  <p className="text-secondary mt-2">
                    Generate a beautiful story from your memories.
                  </p>

                  <Button className="mt-5" disabled>
                    Coming Soon
                  </Button>
                </div>

                <div className="rounded-2xl border border-theme p-5">
                  <h3 className="font-semibold">AI Collage</h3>

                  <p className="text-secondary mt-2">
                    Turn your memories into a beautiful collage.
                  </p>

                  <Button disabled>Coming Soon</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MemoryDetails;
