import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  hasError: boolean;
}

export const MessageError = styled.p`
  font-size: 14px;
  color: red;
  margin-bottom: 0px;
  margin-left: 2px;
  position: absolute;
  bottom: -12px;
`;

export const Container = styled.div`
  flex: 1;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 8px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const SelectComponent = styled.select<ContainerProps>`
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  outline: 0;

  ${(props) =>
    props.isFocused &&
    css`
      border: 1px solid #8fc5ff;
      box-shadow: 0 0 1px 1px #8fc5ff;
      transition: #ced4da 5s ease-in-out, box-shadow 5s ease-in-out;
    `}

  ${(props) =>
    props.isFocused &&
    props.hasError &&
    css`
      box-shadow: 0 0 1px 1px rgba(255, 0, 0, 0.6);
      border: 1px solid rgba(255, 0, 0, 0.6);
    `}

    ${(props) =>
    props.hasError &&
    css`
      border: 1px solid rgba(255, 0, 0, 0.6);
    `}
`;
