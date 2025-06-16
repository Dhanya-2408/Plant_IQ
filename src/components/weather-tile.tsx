interface WeatherTileProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export const WeatherTile = ({ label, value, icon }: WeatherTileProps) => {
  return (
    <div className="flex items-center gap-3 bg-white/60 dark:bg-slate-700 rounded-lg p-4 shadow-sm">
      <div className="bg-white dark:bg-slate-800 p-2 rounded-full shadow">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
};
