import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0px auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: ${(props) => props.theme.btnColor};
    color: ${(props) => props.theme.textColor};
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        transition: color 0.2s ease-in;
        display: block;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        };
    };
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const Loading = styled.span`
    text-align: center;
    display: block;
`;

interface ICoinInfo {
    "id": string,
    "name": string,
    "symbol": string,
    "rank": number,
    "is_new": boolean,
    "is_active": boolean
    "type": string,
}

function Coins() {
    const { isLoading, data } = useQuery<ICoinInfo[]>("allCoins", fetchCoins);

    // const [coins, setCoins] = useState<ICoinInfo[]>([]);
    // const [loaded, setLoaded] = useState<boolean>(false);
    // useEffect(() => {
    //     (async () => {
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await response.json();
    //         setCoins(json.slice(0, 100));
    //         setLoaded(true);
    //     })();
    // }, []);

    const setIsDark = useSetRecoilState(isDarkAtom);

    return (
        <Container>
            <Header>
                <Title>Coins</Title>
            </Header>
            {isLoading ? <Loading>Loading...</Loading> : (
                <CoinsList>
                    {data?.slice(0, 100).map((coinInfo) => {
                        return (
                            <Coin key={coinInfo.id}>
                                <Link to={{
                                    pathname: `/${coinInfo.id}`,
                                    state: { name: coinInfo.name },
                                }}>{coinInfo.name} &rarr;</Link>
                            </Coin>
                        );
                    })
                    }
                </CoinsList>)}
        </Container>
    );
}

export default Coins;