// import Chat from '@/components/Chat/Chat'
import dynamic from 'next/dynamic'

const Chat = dynamic(async () => await import('@/components/Chat/Chat'), { ssr: false })

export default function Home () {
  return (
    <main
      className='flex min-h-screen flex-col items-center justify-between p-24 bg-white'
    >
      <Chat />
      <p style={{marginTop: '25px', color: 'black' }}>Ejemplo de busqueda: Devuelveme 5 ofertas de programador en malaga cobrando 1200€</p>
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
