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

        if (data.error) {
          setError(data.error);
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
    return <p className="text-center text-blue-500">Cargando videos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Lista de Reproducción
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.videoId}
            className="bg-white shadow-lg rounded-lg p-4 hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out border-2 border-gray-300"
          >
            <iframe
              src={`https://www.youtube.com/embed/${video.videoId}`}
              title={video.title}
              className="w-full h-48 md:h-56"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h2 className="mt-4 text-lg font-semibold text-center">
              {video.title}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Playlist;
