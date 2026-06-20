import { getProperties } from "@/lib/properties";

export default async function Home() {
  const properties = await getProperties();

  console.log(properties);

  return (
    <pre className="p-4 text-xs">
      {JSON.stringify(properties, null, 2)}
    </pre>
  );
}
