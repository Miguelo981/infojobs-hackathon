import { CloseIcon } from '../Icons'

interface ConfirmationModalProps {
  visible: boolean
  title: string
  description: string
  onClose: (state: boolean) => void
}

export default function ConfirmationModal ({ visible, title, description, onClose }: ConfirmationModalProps) {
  const closeModal = () => {
    onClose(false)
  }

  return (
    <>
      {
      visible && (
        <div className='absolute top-0 left-0 z-50 h-screen w-screen bg-[#2D3133]/90 flex justify-center items-center'>
          <section className='bg-white p-5 w-fit rounded'>
            <header className='flex justify-between items-center mb-8'>
              <h2 className='text-black text-lg'>{title}</h2>
              <button onClick={closeModal} className='cursor-pointer'>
                <CloseIcon className='fill-primary' />
              </button>
            </header>
            <div>
              <p className='text-black'>{description}</p>
            </div>
            <footer className='flex items-center gap-x-2 mt-8 justify-end'>
              <button onClick={() => onClose(true)} className='primary-btn'>Confirmar</button>
              <button onClick={closeModal} className='primary-blank-btn'>Cancelar</button>
            </footer>
          </section>
        </div>
      )
    }
    </>
  )
}
