import {axiosInstance} from "./axios";
import {CONTENT_ALBUM_LIST_URL} from "./urls";

/**
 * 앨범 리스트 요청
 */
const requestAlbumList = async (tags) => {
    const axiosConfig = {
        params: {
            tag: [...tags],
        },
    };
    return await axiosInstance.get(CONTENT_ALBUM_LIST_URL, axiosConfig)
};

export const content = {requestAlbumList};