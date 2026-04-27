import { BASE_URL } from "@/constants/Config";

export const feedApi = {
    getAllVideos: (token: string) => 
        fetch(`${BASE_URL}/feeds/v1/videos/all/`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }),

    uploadVideo: (token: string, videoUri: string, title: string) => {
        const formData = new FormData();
        // @ts-ignore
        formData.append('video_file_path', {
            uri: videoUri,
            type: 'video/mp4',
            name: 'upload.mp4',
        });
        formData.append('attributes[title]', title);

        return fetch(`${BASE_URL}/feeds/v1/upload/video/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });
    }
}