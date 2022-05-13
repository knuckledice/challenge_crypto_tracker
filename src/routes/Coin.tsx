import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchTicker } from "../api";
import CoinChart from "./CoinChart";
import CoinPrice from "./CoinPrice";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.btnColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  color: ${(props) => props.theme.textColorAlt};
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.btnColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;


interface IParams {
    coinID: string;
}

interface IRouteState {
    name: string;
}

interface ICoinInfo {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface ITicker {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}

function Coin() {
    const { coinID } = useParams<IParams>();
    const { state } = useLocation<IRouteState>();
    const priceMatch = useRouteMatch("/:coinID/price");
    const chartMatch = useRouteMatch("/:coinID/chart");
    const { isLoading: infoIsLoading, data: infoData } = useQuery<ICoinInfo>(["info", coinID], () => fetchCoinInfo(coinID));
    const { isLoading: tickerIsLoading, data: tickerData } = useQuery<ITicker>(["ticker", coinID], () => fetchTicker(coinID));
    
    // const [coinInfo, setCoinInfo] = useState<ICoinInfo>();
    // const [priceInfo, setPriceInfo] = useState<IPriceInfo>();
    // const [loaded, setLoaded] = useState<boolean>(false);

    // useEffect(() => {
    //     (async () => {
    //         const coinInfo = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinID}`)).json();
    //         const priceInfo = await (await fetch(`https://api.coinpaprika.com/v1/ticker/${coinID}`)).json();
    //         setCoinInfo(coinInfo);
    //         setPriceInfo(priceInfo);
    //         setLoaded(true);
    //     })();
    // }, []);

    const loading = infoIsLoading && tickerIsLoading;
    return (
        <Container>
            <Header>
            <Link to={{
              pathname: `/`,
            }}><Title>&larr;Coins&#47; </Title></Link>
            
            <Title>{state?.name ? state.name : infoData?.name}</Title>
            </Header>
            {loading ? <Loader>Loading...</Loader> : (
                <>
                <Overview>
                    <OverviewItem>
                        <span>rank</span>
                        <span>{infoData?.rank}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>symbol</span>
                        <span>{infoData?.symbol}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>open source</span>
                        <span>{infoData?.open_source ? "YES" : "NO"}</span>
                    </OverviewItem>
                </Overview>
                <Description>{infoData?.description}</Description>
                <Overview>
                    <OverviewItem>
                        <span>total supply</span>
                        <span>{Number(tickerData?.total_supply).toLocaleString()}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>max supply</span>
                        <span>{Number(tickerData?.max_supply).toLocaleString()}</span>
                    </OverviewItem>
                </Overview>
                <Tabs>
                    <Tab isActive={priceMatch?.isExact ? true : false}>
                        <Link to={`/${coinID}/price`}>Price</Link>        
                    </Tab>
                    <Tab isActive={chartMatch?.isExact ? true : false}>
                        <Link to={`/${coinID}/chart`}>Chart</Link>        
                    </Tab>
                </Tabs>
                <Switch>
                    <Route path="/:coinID/price">
                        <CoinPrice coinID={coinID}/>
                    </Route>
                    <Route path="/:coinID/chart">
                        <CoinChart coinID={coinID} />
                    </Route>
                </Switch>
                </>
            )}
        </Container>
    );
}

export default Coin;