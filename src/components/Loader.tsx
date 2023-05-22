interface LoaderProps {
  visible: boolean
}

export default function Loader ({ visible }: LoaderProps) {
  return (
    <>
      {
      visible && (
        <div className='lds-ellipsis'><div /><div /><div /><div /></div>
      )
    }
    </>
  )
}
