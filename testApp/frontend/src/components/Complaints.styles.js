import styled from 'styled-components'

export const complaintsColumns = [
    'account',
    'city',
    'opendate',
    'council_dist',
    'borough',
    'complaint_type',
    'descriptor',
  ];
  export const TableWrapper = styled.div`
    width: 80%;
    margin: 2rem auto;
    display: grid;
    box-shadow: 2px 11px 26px rgb(47 86 166 / 50%);
    padding: 1rem;
    thead {
        text-transform: capitalize;
    }
    thead th:nth-child(6) {
        width: 20%;
    }
    td {
        padding: 8px;
    }
  `
  
  export const HeaderWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 0.3rem;
    button {
      background-color: #2f56a6;
      min-width: 10rem;
      margin: 0 2rem;
      color: #fff;
      border: none;
      padding: 1rem;
      font-size: 01rem;
      text-transform: capitalize;
      font-weight: 500;
      cursor: pointer;
    }
  `;
export const LoginStyles = styled.div`
  width: max-content;
  display: flex;
  margin: 5rem auto;
  flex-direction: column;
  padding: 2rem;
  background-color: #fff;
  align-items: center;
  color: #2f56a6;
  border-radius: 10px;
  box-shadow: 2px 11px 26px rgb(47 86 166 / 50%);
  label {
    font-weight: 500;
  }
  input {
    margin: 1rem;
    line-height: 1.5rem;
  }
  button {
    background-color: #2f56a6;
    min-width: 10rem;
    color: #fff;
    border: none;
    padding: 0.5rem;
    text-transform: capitalize;
    font-weight: 500;
    cursor: pointer;
    width: 86%;
    margin-top: 1rem;
    border-radius: 10px;
  }
`;
export const LoginButton = styled.button`
  font-size: 1rem;
  line-height: 2.5rem;
  border-radius: 25px;
  border: none;
  background-color: #2f56a6;
  color: #fff;
  font-weight: 500;
  margin: 1rem;
  padding: 0 1.5rem;
`
export const MainHeader = styled.h1`
    border-bottom: '2px solid #e5e5e5';
    padding-bottom: '1rem';    
`