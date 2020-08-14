import React from 'react';
import { MySearch } from './MySearch'
import { MyHeader } from "components";

function Search() {
    return (
        <>
        <MyHeader></MyHeader>
        <div style={{ minHeight: "100vh" }}>
            <MySearch></MySearch>
        </div>
        </>
    );
}

export { Search }