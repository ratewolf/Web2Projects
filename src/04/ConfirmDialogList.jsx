import React from "react";
import ConfirmDialog from "./ConfirmDialog";

function ConfirmDialogList() {
    return(
      <div>
          <ConfirmDialog>내용</ConfirmDialog><br/>
          <ConfirmDialog>방송</ConfirmDialog><br/>
          <ConfirmDialog>게시글</ConfirmDialog><br/>
      </div>
    );
}

export default ConfirmDialogList;