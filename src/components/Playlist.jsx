import React, { useEffect, useState } from "react";

const Playlist = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/playlist");
        const data = await response.json();

        if (data.error || !Array.isArray(data)) {
          setError("Error en la respuesta de la API.");
          setLoading(false);
          return;
        }

        setVideos(data);
        setLoading(false);
      } catch (err) {
        setError("Error al obtener los videos. Inténtalo más tarde.");
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <section className="max-w-[1920px] mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Lista de Reproducción
      </h1>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.videoId}
            className="bg-white shadow-md rounded-lg p-4 hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out border border-gray-200"
          >
            <div className="aspect-video">
              <iframe
                loading="eager"
                src={`https://www.youtube.com/embed/${video.videoId}`}
                title={`Reproductor del video: ${video.title}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h2 className="mt-4 text-lg font-medium text-center text-gray-700">
              {video.title || "Video sin título"}
            </h2>
          </div>
        ))}
      </main>
    </section>
  );
};

export default Playlist;
