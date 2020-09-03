import style from 'styled-components';

export const CardWrapper = style.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
  width: 600px;
  margin: 0 auto;
`;

export const CardFooter = style.div`
  margin: 20px auto;
`;

export const CardInlineText = style.span`
  margin-right: 10px;
`;

export const AuthFormWrapper = style.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
  width: 600px;
  margin: 0 auto;
  padding: 10px 30px 30px 30px;
  border: 1px solid #039be5;
  box-shadow: 0px 0px 10px #0277bd;
  border-radius: 5px;
`;

export const InputField = style.div.attrs((props) => ({
  className: 'input-field',
}))``;

export const ErrorBanner = style.div`
    width: 100%;
    color:#fff;
    background-color: #f44336;
    ${(props) =>
      props.show
        ? `padding: 10px;`
        : `
       height: 0;
       padding: 0;
    `};
    border-radius: 5px;
    margin: 5px 0px 10px 0;
    transition: .1s ease;
`;

export const TodoListWrapper = style.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 600px;
    margin: 0 auto;
}`;
