import { useState } from "react";
import styled from "styled-components";

function BoardPagination({ page, totalPosts, limit, setPage }) {
  const numPages = Math.ceil(totalPosts / limit);
  const [currPage, setCurrPage] = useState(page);
  let firstNum = currPage - (currPage % 5) + 1;
  let lastNum = currPage - (currPage % 5) + 5;
  //console.log({"currPage is":currPage, "firsNum is" : firstNum, "page is" : page})

  return (
    <Pagination>
      <div>
        <NBtn
          onClick={() => {
            setPage(page - 1);
            setCurrPage(page - 2);
          }}
          disabled={page === 1}
        >
          &lt;
        </NBtn>
        <NBtn
          onClick={() => setPage(firstNum)}
          aria-current={page === firstNum ? "page" : null}
        >
          {firstNum}
        </NBtn>
        {Array(4)
          .fill()
          .map((_, i) => {
            if (i <= 2) {
              return (
                <NBtn
                  border="true"
                  key={i + 1}
                  onClick={() => {
                    setPage(firstNum + 1 + i);
                  }}
                  aria-current={page === firstNum + 1 + i ? "page" : null}
                >
                  {firstNum + 1 + i}
                </NBtn>
              );
            } else if (i >= 3) {
              return (
                <NBtn
                  border="true"
                  key={i + 1}
                  onClick={() => setPage(lastNum)}
                  aria-current={page === lastNum ? "page" : null}
                >
                  {lastNum}
                </NBtn>
              );
            }
          })}
        <NBtn
          onClick={() => {
            setPage(page + 1);
            setCurrPage(page);
          }}
          disabled={page === numPages}
        >
          &gt;
        </NBtn>
      </div>
    </Pagination>
  );
}

export default BoardPagination;

const Pagination = styled.div`
  /* background-color: brown; */
  display: flex;
  justify-content: center;
  margin: 30px;
  position: absolute;
  bottom: 0;
  left: 40%;
`;

const NBtn = styled.button`
  border: none;
`;
