import { useQuery } from "react-query";
import { fetchHistorical } from "../api";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import styled from "styled-components";

const CoinInfoList = styled.li`
  font-size: 24px;
  color: ${(props) => props.theme.textColorAlt};
  padding: 2px;
`;

interface ICoinPriceProps {
    coinID: string;
}

interface IDayOHLC {
    close: number;
    high: number;
    low: number;
    market_cap: number;
    open: number;
    time_close: string;
    time_open: string;
    volume: number;
}

function CoinPrice({ coinID }: ICoinPriceProps) {
    const { isLoading, data } = useQuery<IDayOHLC[]>(["dayOHLC", coinID], () => fetchHistorical(coinID));
    const isDark = useRecoilValue(isDarkAtom);
    const highPrices = data?.map((d) => d.high);
    const lowPrices = data?.map((d) => d.low);
    const highest = highPrices ? Math.max(...highPrices) : null;
    const lowest = lowPrices ? Math.min(...lowPrices) : null;
    return (
        <ul>
            <CoinInfoList>Highest Price: {highest}</CoinInfoList>
            <CoinInfoList>Lowest Price: {lowest}</CoinInfoList>
        </ul>
    );
}

export default CoinPrice;