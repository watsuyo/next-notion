'use client'
export const runtime = 'edge'

import React from 'react';
import { usePathname } from 'next/navigation'
import NotionPageClient from '../../_components/NotionPageClient';

const NotionPage: React.FC = () => {
  const path = usePathname();
  const id = path.replace(/^\/news\//, '')

  return <NotionPageClient id={
    id
  } />;
};

export default NotionPage;