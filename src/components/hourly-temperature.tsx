import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import type { ForecastData } from "@/api/types";

interface HourlyTemperatureProps {
  data: ForecastData;
}

interface ChartData {
  time: string;
  temp: number;
  feels_like: number;
}

export const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  const chartData: ChartData[] = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <Card className="flex-1 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">
          24-Hour Temperature Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis
                dataKey="time"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}°`}
                domain={["auto", "auto"]}
              />
              <Tooltip
                wrapperClassName="!z-[9999]"
                content={({ active, payload, label }) => {
                  if (active && payload?.length) {
                    const [tempData, feelsLikeData] = payload;
                    return (
                      <div className="rounded-md bg-white dark:bg-slate-800 border p-3 text-sm shadow-md space-y-1">
                        <div className="font-semibold text-muted-foreground">
                          {label}
                        </div>
                        <div className="text-blue-600 dark:text-blue-400">
                          Temp: {tempData?.value}°
                        </div>
                        <div className="text-slate-500 dark:text-slate-300">
                          Feels Like: {feelsLikeData?.value}°
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#64748b"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
