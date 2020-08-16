import React from 'react';
import { MySearch } from './MySearch'
import { MyHeader } from "components";

function Search() {
    return (
        <>
        <MyHeader></MyHeader>
        <MySearch></MySearch>
        </>
    );
}

export { Search }