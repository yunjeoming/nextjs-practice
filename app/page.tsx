import Link from 'next/link';

export default async function Home() {
  return (
    <div className="p-4">
      <div>간단한 게시판을 Next.js로 구현했습니다.🎉</div>
      <div>
        글 목록으로 이동하기 👉 <Link href={'/list'}>글목록</Link>
      </div>
    </div>
  );
}
