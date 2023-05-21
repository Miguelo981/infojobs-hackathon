import { Inter } from 'next/font/google'
import Chat from '@/components/Chat/Chat'

const inter = Inter({ subsets: ['latin'] })

export default function Home () {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between bg-slate-900 p-24 ${inter.className}`}
    >
      <header>
        <h1 className='text-4xl font-bold mb-8'>Infojobs Assistant</h1>
        <Chat />
        {/* <form action='' className='flex gap-x-2'>
          <input className='text-black rounded-lg p-1' type='text' placeholder='Devuelveme 5 ofertas en españa para programador' value={search} onChange={handleSearchChange} />
          <button className='bg-blue-600 px-3 py-1 rounded-lg' type='button' onClick={handleSubmit}>Search</button>
        </form> */}
      </header>
    </main>

  )
}

/* export const getServerSideProps = async () => {
  const offers = await getOffers({
    country: 'espana'
  })

  console.log(offers)

  return {
    props: {
      offers
    }
  }
} */
