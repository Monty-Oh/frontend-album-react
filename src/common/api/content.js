import {AUTHORIZATION, LOCAL_STORAGE_KEY_ACCESS_TOKEN} from "../constants";
import {axiosInstance} from "./axios";
import {CONTENT_ALBUM_LIST_URL} from "./urls";

/**
 * 앨범 리스트 요청
 */
export const requestAlbumList = async (tags) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
    const axiosConfig = {
        params: {
            tag: [...tags],
        },
        headers: {
            [AUTHORIZATION]: `Bearer ${token}`,
        },
    };
    return await axiosInstance.get(CONTENT_ALBUM_LIST_URL, axiosConfig)
};