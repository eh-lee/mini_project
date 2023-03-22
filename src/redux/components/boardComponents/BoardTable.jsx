import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function BoardTable({ board }) {
  const navigate = useNavigate();
  return (
    <>
      <TableBox>
        <Table>
          <Thead>
            <Tr>
              <ThM>게시물 번호</ThM>
              <ThM>기수-주특기</ThM>
              <ThL>제목</ThL>
              <ThM>닉네임</ThM>
              <ThL>작성시간</ThL>
            </Tr>
          </Thead>
          <Tbody>
            {board.map((item) => {
              return (
                <Tr
                  key={item.id}
                  onClick={() => {
                    navigate(`/detail/${item.id}`);
                  }}
                >
                  <Td>{item.id}</Td>
                  <Td>
                    {item.classNumber}-{item.specialty}
                  </Td>
                  <Td>{item.title}</Td>
                  <Td>{item.nickname}</Td>
                  <Td>{item.createdAt}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableBox>
    </>
  );
}

export default BoardTable;

const TableBox = styled.div`
  /* background-color: green; */
  /* width: 90%; */
  margin: auto;
  border-radius: 20px;
  padding: 40px 10px;
  max-width: 1000px;
`;

const Table = styled.table`
  width: 90%;
  margin: 0px auto;

  text-align: center;
  /* background-color: skyblue; */
`;
const Thead = styled.thead`
  border-bottom: 2px solid gray;
  border-top: 2px solid gray;
  font-size: 16px;
  padding: 10px 5px;
  font-weight: bold;
`;
const Tr = styled.tr`
  cursor: pointer;
  padding: 20px;
  border-top: 1px solid gray;
`;
const ThL = styled.th`
  padding: 10px 20px;
  text-align: center;
  width: 220px;
`;
const ThM = styled.th`
  padding: 10px 20px;
  text-align: center;
  width: 85px;
`;
const Tbody = styled.tbody`
  padding-top: 20px;
`;
const Td = styled.td`
  padding: 10px 20px;
`;
