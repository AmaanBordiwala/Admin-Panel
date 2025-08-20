'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFormikContext } from 'formik';

const DomainInitializer: React.FC = () => {
  const searchParams = useSearchParams();
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    const domainFromUrl = searchParams.get('domain');
    if (domainFromUrl) {
      setFieldValue('Domain', domainFromUrl);
    }
  }, [searchParams, setFieldValue]);

  return null;
};

export default DomainInitializer;
