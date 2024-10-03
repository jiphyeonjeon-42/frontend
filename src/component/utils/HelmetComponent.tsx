import React from 'react';
import { Helmet } from 'react-helmet-async';

interface HelmetProps {
    title?: string;
    description?: string;
    keywords?: string;
    url?: string;
    img?: string;
    children?: React.ReactNode;
}

const HelmetComponent: React.FC<HelmetProps> = ({ title = "집현전", description="모두가 함께 만들어가는 42서울의 도서관 '집현전'입니다.", keywords="42 서울", url, img }) => {
    return (
        <Helmet>
          <title>{title}</title>
          <meta name='keywords' content={keywords} />
          <meta name='description' content={description} />
          {/* 오픈그래프(Open Graph) */}
          <meta property='og:type' content='website' />
          <meta property='og:url' content={url} />
          <meta property='og:image' content={img} />
          <meta property='og:title' content={title} />
          <meta property='og:description' content={description} />
        </Helmet>
      );
};


export default HelmetComponent;