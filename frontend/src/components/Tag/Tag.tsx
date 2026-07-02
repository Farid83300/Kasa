interface TagProps {
  label: string;
}

export default function Tag({ label }: TagProps) {
  return (
    <span className="inline-block rounded-lg border border-gray-300 px-4 py-2 text-sm">
      {label}
    </span>
  );
}
