
export default function StatCard({
  title,
  value,
  change,
  description,
}) {
  const isPositive = change >= 0;

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-3 text-2xl font-bold text-slate-900">
        {value}
      </p>

      <p
        className={`mt-2 text-sm font-medium ${
          isPositive ? "text-emerald-600" : "text-red-600"
        }`}
      >
        {isPositive ? "+" : ""}
        {change}%{" "}
        <span className="font-normal text-slate-500">
          {description}
        </span>
      </p>
    </article>
  );
}
