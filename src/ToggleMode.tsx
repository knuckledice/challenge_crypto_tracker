import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

const BtnArea = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
    padding: 10px;
`;


function ToggleMode() {
    const setIsDark = useSetRecoilState(isDarkAtom);
    return (
    <BtnArea>
        <button onClick={() => setIsDark((prev) => !prev)}>{useRecoilValue(isDarkAtom) ? "To Beautiful Light" : "To Beautiful Dark"}</button>
    </BtnArea>);
}

export default ToggleMode;