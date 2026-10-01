import React from "react";
import ConfirmDialog from "./ConfirmDialog";

function ConfirmDialogList() {
    return(
        <div>
            <ConfirmDialog>내용</ConfirmDialog>
            <ConfirmDialog>방송</ConfirmDialog>
            <ConfirmDialog>게시글</ConfirmDialog>
        </div>
    );
}

export default ConfirmDialogList;