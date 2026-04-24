interface Props {
  title: string;
  description: string;
}

export const OgImage = ({ title, description }: Props) => (
  <div className="flex h-full w-full flex-col items-center justify-center bg-white text-slate-900 p-24" style={{ fontFamily: "Inter, Noto Sans JP, sans-serif" }}>
    <div className="flex flex-col text-center">
      <h1 className="text-6xl font-bold text-slate-900 tracking-tight" style={{ textOverflow: "ellipsis", lineClamp: 3, wordBreak: "keep-all" }}>
        {title}
      </h1>
      <p className="text-3xl font-medium text-slate-700 leading-relaxed tracking-tight" style={{ textOverflow: "ellipsis", lineClamp: 2, wordBreak: "keep-all" }}>
        {description}
      </p>
    </div>
  </div>
);
