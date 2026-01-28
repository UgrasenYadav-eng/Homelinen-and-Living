import Header from '@/components/Application/Website/Header'
import Footer from '@/components/Application/Website/Footer'
import { Kumbh_Sans } from 'next/font/google'

const kumbh = Kumbh_Sans({
  weight: ['400','500','600','700','800'],
  subsets: ['latin']
})

export default function Layout({ children }) {
  return (
    <div className={`${kumbh.className} min-h-screen flex flex-col`}>

      <Header />

      <main className="flex-1 pt-[90px] lg:pt-[160px]">
        {children}
      </main>

      <Footer />

    </div>
  );
}
