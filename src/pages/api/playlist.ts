import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
    const API_KEY = import.meta.env.YOUTUBE_API_KEY;
    const PLAYLIST_ID = "PL185NqasFGxEy2tkQSvwCd54uyuoOHOy9";
    const API_URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=50&key=${API_KEY}`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.error) {
            return new Response(JSON.stringify({ error: data.error.message }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const videos = data.items.map((item: any) => ({
            title: item.snippet.title,
            videoId: item.snippet.resourceId.videoId,
        }));

        return new Response(JSON.stringify(videos), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Error al obtener los datos" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
