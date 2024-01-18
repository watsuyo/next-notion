import Link from 'next/link';
import React from 'react';

const NotionPage: React.FC = () => {
  return <div>
    <h1 className="text-4xl font-bold">Home</h1>
    <ul className="mt-4">
      <li className="mb-2"><Link className='text-blue-600 dark:text-blue-500 hover:underline' href="/news/423e522fe0c54e04a829249f1cb22260">【3/8（金）】VMware環境の運用負荷を軽減！基礎から学ぶ VMware Cloud on AWS</Link></li>
      <li className="mb-2"><Link className='text-blue-600 dark:text-blue-500 hover:underline' href="/news/e0f8d7406b294a5e8945c5c123630a22">【1/25リモート】クラスメソッドの会社説明会 〜フリーランスエンジニア/3月開始案件特集 〜 を開催します</Link></li>
    </ul>
  </div>
};

export default NotionPage;