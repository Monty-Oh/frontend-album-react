import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {ACTIVE_TAG_ALL, REDUX_CONTENT} from "../common/constants";
import {requestAlbumList} from "../common/api/content";

const contentSlice = createSlice(
    {
        name: REDUX_CONTENT,
        initialState: {
            data: [
                //  Test Data...
                // {id: 1, tag: '원신', src: 'assets/test_cat_1.jpeg', description: "test description"},
                // {id: 2, tag: '젠레스 존 제로', src: 'assets/test_cat_1.jpeg', description: "test description"},
                // {id: 3, tag: 'MonsterHunter:World', src: 'assets/test_cat_1.jpeg', description: "test description"},
                // {id: 4, tag: 'MonsterHunter:World', src: 'assets/test_cat_1.jpeg', description: "test description"},
                // {id: 5, tag: 'MonsterHunter:World', src: 'assets/test_cat_1.jpeg', description: "test description"},
                // {id: 6, tag: 'MonsterHunter:World', src: 'assets/test_cat_1.jpeg', description: "test description"},
                // {id: 7, tag: 'MonsterHunter:World', src: 'assets/test_cat_1.jpeg', description: "test description"},
                // {id: 8, tag: 'MonsterHunter:World', src: 'assets/test_cat_2.jpeg', description: "test description"},
                // {id: 9, tag: 'MonsterHunter:World', src: 'assets/test_cat_3.jpeg', description: "test description"},
                // {id: 10, tag: 'MonsterHunter:World', src: 'assets/test_cat_4.jpeg', description: "test description"},
                // {id: 11, tag: 'MonsterHunter:World', src: 'assets/test_cat_5.jpeg', description: "test description"},
            ],
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
                    console.log(state.payload);
                })
        }
    }
);

//  Selector...
/**
 * 선택된 태그에 따라 데이터를 반환한다.
 * "전체" 태그라면 모든 데이터를 반환한다.
 */
const selectActiveTagData = createSelector(
    [state => state.content.data, state => state.content.activeTag],
    (data, activeTag) => {
        const groupedData = {};
        data.forEach((value) => {
            if (activeTag === ACTIVE_TAG_ALL || activeTag === value.tag) {
                if (groupedData[value.tag]) groupedData[value.tag].push(value);
                else groupedData[value.tag] = [value];
            }
        });
        return groupedData;
    }
)

/**
 * 모든 태그의 리스트를 반환한다.
 */
const selectTagList = createSelector(
    [state => state.content.data],
    (data) => {
        const tagList = [...new Set(data.map((value) => value.tag))];
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
        const response = await requestAlbumList(tags);
        return response.data;
    }
)

export const contentSelector = {selectActiveTagData, selectTagList};
export const contentFetch = {fetchAlbumList};
// export const contentAction = {setActiveTag}
// export const {setActiveTag} = contentSlice.actions;
export const contentAction = contentSlice.actions;
export default contentSlice.reducer;