import {createSelector, createSlice} from "@reduxjs/toolkit";
import {REDUX_CONTENT} from "../common/constants";

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
            activeTag: "전체"
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

export const selectGroupedData = createSelector(
    [state => state.content.data],
    (data) => {
        const groupedData = {};
        data.forEach((value) => {
            if (groupedData[value.tag]) groupedData[value.tag].push(value);
            else groupedData[value.tag] = [value];
        });
        return groupedData;
    }
)

export const selectTagList = createSelector(
    [state => state.content.data],
    (data) => {
        const tagList = [...new Set(data.map((value) => value.tag))];
        tagList.unshift("전체");
        return tagList;
    }
)

export const { setActiveTag } = content.actions;
export default content.reducer;