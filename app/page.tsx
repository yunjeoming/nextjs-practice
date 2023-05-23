import Link from 'next/link';

export default async function Home() {
  return (
    <div>
      <div>
        <Link href={'/list'}>글목록</Link>
      </div>
    </div>
  );
}
