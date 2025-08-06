import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Adventures() {
  const router = useRouter();

  useEffect(() => {
    // This will redirect to the home page with the adventures filter active
    router.replace('/?filter=adventures');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>My Adventures | Michael Hoefert</title>
        <meta name="description" content="Michael Hoefert's Adventures" />
      </Head>
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Redirecting to adventures...</p>
      </div>
    </div>
  );
}
