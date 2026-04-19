import React from 'react';

interface SchemaOrgProps {
  type: 'Article' | 'FAQPage' | 'BreadcrumbList';
  data: any;
}

export default function SchemaOrg({ type, data }: SchemaOrgProps) {
  const schema = React.useMemo(() => {
    switch (type) {
      case 'FAQPage':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.map((faq: any) => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.a
            }
          }))
        };
      case 'Article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title,
          "description": data.description,
          "author": {
            "@type": "Organization",
            "name": "ClearLicence UK"
          },
          "publisher": {
            "@type": "Organization",
            "name": "ClearLicence UK",
            "logo": {
              "@type": "ImageObject",
              "url": "https://clearlicence.co.uk/logo.png"
            }
          },
          "datePublished": "2026-01-01T08:00:00+00:00"
        };
      case 'BreadcrumbList':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        };
      default:
        return null;
    }
  }, [type, data]);

  if (!schema) return null;

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
}
