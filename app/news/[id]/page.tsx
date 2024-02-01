'use client';

import React from 'react';
import { usePathname } from 'next/navigation'
import NotionPageClient from '../../_components/NotionPageClient';

const NotionPage: React.FC = () => {
  const path = usePathname();
  return <NotionPageClient path={
    path.replace(/^\/news\//, '')
  } />;
};

export default NotionPage;