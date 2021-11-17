import styled  from "styled-components/native";
export const StyledView = styled.View`
background-color: ${({ special }) => (special ? "red" : "white")};
/* flex: 1; */
justify-content: center;
align-items: center;
;
`
export const StyledText = styled.Text`
color: ${({ color }) => color ?? "black"};
font-size: 32px;

`


