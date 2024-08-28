import {createSelector, createSlice} from "@reduxjs/toolkit";
import {REDUX_CONTENT} from "../common/constants";

const content = createSlice(
    {
        name: REDUX_CONTENT,
        initialState: {
            data: [
                //  Test Data...
                {id: 1, tag: 'tag1', src: 'assets/test_cat_1.jpeg', description: "test description"},
                {id: 2, tag: 'tag2', src: 'assets/test_cat_1.jpeg', description: "test description"},
                {id: 3, tag: 'tag3', src: 'assets/test_cat_1.jpeg', description: "test description"},
                {id: 4, tag: 'tag3', src: 'assets/test_cat_1.jpeg', description: "test description"},
                {id: 5, tag: 'tag3', src: 'assets/test_cat_1.jpeg', description: "test description"},
                {id: 6, tag: 'tag3', src: 'assets/test_cat_1.jpeg', description: "test description"},
                {id: 7, tag: 'tag3', src: 'assets/test_cat_1.jpeg', description: "test description"},
                {id: 8, tag: 'tag3', src: 'assets/test_cat_2.jpeg', description: "test description"},
                {id: 9, tag: 'tag3', src: 'assets/test_cat_3.jpeg', description: "test description"},
                {id: 10, tag: 'tag3', src: 'assets/test_cat_4.jpeg', description: "test description"},
                {id: 11, tag: 'tag3', src: 'assets/test_cat_5.jpeg', description: "test description"},
            ],
        },
        reducers: {},
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

export default content.reducer;