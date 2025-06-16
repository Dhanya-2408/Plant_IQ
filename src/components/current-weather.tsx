import { Card, CardContent } from "./ui/card";
import {
  ArrowDown,
  ArrowUp,
  Droplets,
  Wind,
  Thermometer,
  MapPin,
} from "lucide-react";
import type { WeatherData, GeocodingResponse } from "@/api/types";
import { WeatherTile } from "./weather-tile";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

export function CurrentWeather({ data, locationName }: CurrentWeatherProps) {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  const formatTemp = (value: number) => `${Math.round(value)}°`;

  return (
    <Card className="shadow-xl border-none bg-gradient-to-br from-blue-100 to-white dark:from-slate-900 dark:to-slate-800">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center gap-4 text-center md:text-left">
            <div className="relative aspect-square w-40 bg-white/30 rounded-xl shadow-inner flex items-center justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="h-32 w-32 object-contain"
              />
            </div>
            <p className="capitalize text-lg font-medium text-muted-foreground">
              {currentWeather.description}
            </p>

            <div className="flex items-center justify-center gap-2 text-primary">
              <MapPin className="h-4 w-4" />
              <span className="font-semibold text-lg">
                {locationName?.name}
              </span>
              {locationName?.state && (
                <span className="text-muted-foreground">
                  , {locationName.state}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {locationName?.country}
            </p>
          </div>

          {/* Weather details */}
          <div className="grid grid-cols-2 gap-4">
            <WeatherTile
              label="Temperature"
              value={formatTemp(temp)}
              icon={<Thermometer className="h-5 w-5 text-blue-500" />}
            />
            <WeatherTile
              label="Feels Like"
              value={formatTemp(feels_like)}
              icon={<Thermometer className="h-5 w-5 text-yellow-500" />}
            />
            <WeatherTile
              label="Min Temp"
              value={formatTemp(temp_min)}
              icon={<ArrowDown className="h-5 w-5 text-cyan-600" />}
            />
            <WeatherTile
              label="Max Temp"
              value={formatTemp(temp_max)}
              icon={<ArrowUp className="h-5 w-5 text-rose-500" />}
            />
            <WeatherTile
              label="Humidity"
              value={`${humidity}%`}
              icon={<Droplets className="h-5 w-5 text-blue-400" />}
            />
            <WeatherTile
              label="Wind"
              value={`${speed} m/s`}
              icon={<Wind className="h-5 w-5 text-indigo-400" />}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
