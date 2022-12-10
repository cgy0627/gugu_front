import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createPost } from "../api/Diary";
import "../App.css";

function InsertDiary() {
  // 페이지 전환 시 쿼리스트링방식으로 값 받아오기위한 searchParams 객체 생성
  const [search, setSearch] = useSearchParams();

  // post 위치 위도(lat), 경도(long)
  const postLat = search.get("lat");
  const postLong = search.get("long");

  // post 내용
  const [content, setContent] = useState("");

  // post 첨부 이미지(1개)
  const [addedFile, setAddedFile] = useState([]);

  // 데이터 전송을 위한 form, file 객체 생성
  const formData = new FormData();
  const fileArr = new Array();

  const token = window.localStorage.getItem("token");

  const getContent = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setContent(e.target.value);
  };

  const getFile = () => {
    const input = document.querySelector("#imgFile");
    const files = input.files;
    const arr = Array.from(files);
    console.log(arr);

    for (let i = 0; i < arr.length; i++) {
      fileArr.push(arr[i]);
      console.log("arr[i] : " + arr[i]);
    }

    console.log("addedFile : " + addedFile);
    console.log("fileArr : " + fileArr);
  };

  const sendDiary = (e) => {
    e.preventDefault();

    formData.append("postLat", postLat);
    formData.append("postLong", postLong);
    formData.append("postContent", content);

    for (let i = 0; i < fileArr.length; i++) {
      formData.append("files", fileArr[i]);
    }

    // formdata 값 확인해 보는 법 !
    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }

    console.log("addedfile : " + addedFile);
    createPost(formData);
  };

  return (
    <div>
      <button
        className="write_button"
        onClick={() => (window.location.href = "/")}
      >
        취소
      </button>

      <form
        method="POST"
        onSubmit={(e) => sendDiary(e)}
        encType="multipart/form-data"
      >
        <button className="write_button" type="submit">
          저장
        </button>

        <div>
          Content :
          <input
            name="content"
            placeholder="content"
            onChange={getContent}
            value={content}
          ></input>
          <br />
          File Upload :
          <input
            type="file"
            name="imgFile"
            id="imgFile"
            multiple
            onChange={getFile}
          ></input>
        </div>
      </form>
    </div>
  );
}

export default InsertDiary;
