import styled from 'styled-components'

export const BlockListPanel = styled.div`
  width: 100%;
  margin-top: ${(props: { width: number }) => (150 * props.width) / 1920}px;
  margin-bottom: ${(props: { width: number }) => (200 * props.width) / 1920}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ContentTitle = styled.div`
  display: flex;
  flex-direction: column;

  div {
    font-size: 50px;
    color: black;
    margin: 0 auto;
  }

  span {
    background: #46ab81;
    height: 4px;
    width: 197px;
    margin: 0 auto;
  }
`

export const ContentTable = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 58px;
`

export const TableTitleRow = styled.div`
  background: rgb(75, 188, 142);
  display: flex;
  flex-direction: row;

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 240px;
    height: 78px;

    div {
      width: auto;
      img {
        width: 23px;
        height: 23px;
      }

      div {
        color: white;
        font-size: 20px;
        margin-left: 10px;
      }
    }
  }
`

export const TableContentRow = styled.tr`
  display: flex;

  td {
    width: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const TableMinerContentPanel = styled.td`
  height: 78px;

  .table__miner__content {
    max-width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${(props: { color: string }) => props.color};
    text-decoration: none;
  }
`

export const BlocksPagition = styled.div`
  margin-top: 60px;
`
