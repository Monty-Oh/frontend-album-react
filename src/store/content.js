import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {
    ACTIVE_TAG_ALL,
    HTTP_RESULT_KEY_ALBUM_LIST,
    HTTP_RESULT_KEY_CONTENT_ID,
    HTTP_RESULT_KEY_DESCRIPTION,
    HTTP_RESULT_KEY_IMAGE_URL,
    HTTP_RESULT_KEY_TAG_LIST,
    HTTP_RESULT_KEY_TITLE,
    REDUX_CONTENT
} from "../common/constants";
import api from "../common/api";
import {BASE_URL} from "../common/api/urls";

const contentSlice = createSlice(
    {
        name: REDUX_CONTENT,
        initialState: {
            dataList: [],
            activeTag: ACTIVE_TAG_ALL
        },
        //  동기 작업
        reducers: {
            setActiveTag(state, action) {
                state.activeTag = action.payload;
            }
        },
        //  비동기 작업
        extraReducers: (builder) => {
            builder
                .addCase(fetchAlbumList.fulfilled, (state, action) => {
                    const convertedDataList = [];
                    action.payload[HTTP_RESULT_KEY_ALBUM_LIST].forEach((data) => {
                        const convertedData = {};
                        convertedData.id = data[HTTP_RESULT_KEY_CONTENT_ID];
                        convertedData.src = BASE_URL + data[HTTP_RESULT_KEY_IMAGE_URL];
                        convertedData.title = data[HTTP_RESULT_KEY_TITLE];
                        convertedData.description = data[HTTP_RESULT_KEY_DESCRIPTION];
                        convertedData.tagList = data[HTTP_RESULT_KEY_TAG_LIST];
                        convertedDataList.push(convertedData);
                    });
                    state.dataList = convertedDataList;
                })
        }
    }
);

//  Selector...
/**
 * 선택된 태그에 따라 데이터를 반환한다.
 * "전체" 태그라면 모든 데이터를 반환한다.
 * 하나의 앨범은 여러개의 태그를 가질 수 있다.
 */
const selectActiveTagData = createSelector(
    [state => state.content.dataList, state => state.content.activeTag],
    (dataList, activeTag) => {
        const groupedData = {};

        if (activeTag === ACTIVE_TAG_ALL) {
            dataList.forEach((data) => {
                data.tagList.forEach((tag) => {
                    if (groupedData[tag]) {
                        groupedData[tag].push(data);
                    }
                    else {
                        groupedData[tag] = [data];
                    }
                })
            });
        } else {
            groupedData[activeTag] = [];
            dataList.forEach((data) => {
                if (data.tagList.includes(activeTag)) {
                    groupedData[activeTag].push(data);
                }
            })
        }

        return groupedData;
    }
)

/**
 * 모든 태그의 리스트를 반환한다.
 */
const selectTagList = createSelector(
    [state => state.content.dataList],
    (dataList) => {
        const tagSet = new Set();
        dataList.forEach((data) => {
            data.tagList.forEach((tag) => tagSet.add(tag));
        });
        const tagList = [...tagSet];
        tagList.unshift(ACTIVE_TAG_ALL);
        return tagList;
    }
)


//  Fetch...
/**
 * Content 리스트를 요청한다.
 * 태크가 포함 시 해당 데이터만, 미포함시 전체 데이터를 요청한다.
 */
const fetchAlbumList = createAsyncThunk(
    "content/album",
    async ({tags}) => {
        const response = await api.content.requestAlbumList(tags);
        return response.data;
    }
)

const selector = {selectActiveTagData, selectTagList};
const fetch = {fetchAlbumList};
const action = contentSlice.actions;

export const content = {selector, fetch, action};
export default contentSlice.reducer;