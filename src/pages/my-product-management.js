import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function ProductManagement() {
  const router = useRouter();

  useEffect(() => {
    // This will redirect to the home page with the product filter active
    router.replace('/?filter=product');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>My Product Management | Michael Hoefert</title>
        <meta name="description" content="Michael Hoefert's Product Management Portfolio" />
      </Head>
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Redirecting to portfolio...</p>
      </div>
    </div>
  );
}
