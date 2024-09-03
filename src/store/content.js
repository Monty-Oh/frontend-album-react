import {createSelector, createSlice} from "@reduxjs/toolkit";
import {ACTIVE_TAG_ALL, REDUX_CONTENT} from "../common/constants";

const content = createSlice(
    {
        name: REDUX_CONTENT,
        initialState: {
            data: [
                //  Test Data...
                {id: 1, tag: '원신', src: 'assets/test_cat_1.jpeg', description: "test description"},
                {id: 2, tag: '젠레스 존 제로', src: 'assets/test_cat_1.jpeg', description: "test description"},
                {id: 3, tag: 'MonsterHunter:World', src: 'assets/test_cat_1.jpeg', description: "test description"},
                {id: 4, tag: 'MonsterHunter:World', src: 'assets/test_cat_1.jpeg', description: "test description"},
                {id: 5, tag: 'MonsterHunter:World', src: 'assets/test_cat_1.jpeg', description: "test description"},
                {id: 6, tag: 'MonsterHunter:World', src: 'assets/test_cat_1.jpeg', description: "test description"},
                {id: 7, tag: 'MonsterHunter:World', src: 'assets/test_cat_1.jpeg', description: "test description"},
                {id: 8, tag: 'MonsterHunter:World', src: 'assets/test_cat_2.jpeg', description: "test description"},
                {id: 9, tag: 'MonsterHunter:World', src: 'assets/test_cat_3.jpeg', description: "test description"},
                {id: 10, tag: 'MonsterHunter:World', src: 'assets/test_cat_4.jpeg', description: "test description"},
                {id: 11, tag: 'MonsterHunter:World', src: 'assets/test_cat_5.jpeg', description: "test description"},
            ],
            activeTag: ACTIVE_TAG_ALL
        },
        reducers: {
            setActiveTag(state, action) {
                state.activeTag = action.payload;
            }
        },
        extraReducers: (builder) => {

        }
    }
);

/**
 * 선택된 태그에 따라 데이터를 반환한다.
 * "전체" 태그라면 모든 데이터를 반환한다.
 */
export const selectActiveTagData = createSelector(
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
export const selectTagList = createSelector(
    [state => state.content.data],
    (data) => {
        const tagList = [...new Set(data.map((value) => value.tag))];
        tagList.unshift(ACTIVE_TAG_ALL);
        return tagList;
    }
)

export const {setActiveTag} = content.actions;
export default content.reducer;