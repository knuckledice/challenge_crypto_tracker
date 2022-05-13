import { useQuery } from "react-query";
import { fetchHistorical } from "../api";
import Chart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ICoinChartProps {
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

function CoinChart({ coinID }: ICoinChartProps) {
    const { isLoading, data } = useQuery<IDayOHLC[]>(["dayOHLC", coinID], () => fetchHistorical(coinID));
    const isDark = useRecoilValue(isDarkAtom);
    return (
        <div>
            {isLoading ? "Loading..." : (
                <Chart
                    type="candlestick"
                    series = {[{
                        data: data?.map((d) => [Date.parse(d.time_close), d.open, d.high, d.low, d.close]) as any
                      }]}
                    
                    options={{
                        theme: {
                            mode: isDark ? "dark" : "light",
                        },
                        chart: {
                            background: isDark ? "white" : "gray",
                            foreColor: isDark ? "black" : "white",
                            height: 500,
                            width: 500,
                            toolbar: {
                                show: false,
                            }
                        },
                        grid: {
                            show: false,
                        },
                        xaxis: {
                            type: "datetime",
                            categories: data?.map((ohlc) => ohlc.time_close),
                            labels: {
                                show: true,
                                rotate: 0,
                            },
                        },
                        stroke: {
                            curve: "smooth",
                            width: 2,
                        },
                        yaxis: {
                            show: false,
                        },
                        tooltip: {
                            y: {
                              formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
                                return value.toLocaleString("en-US", { maximumFractionDigits: 1, minimumFractionDigits: 1 });
                              }
                            }
                          }
                    }}
                    />
            )}
        </div>
    );
}

export default CoinChart;