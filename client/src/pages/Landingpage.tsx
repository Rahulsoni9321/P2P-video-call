import Landing from '../Components/Landingpage'
import Appbar from '../Components/Appbar'

const Landingpage = () => {
  return (
    <div className='flex flex-col relative bg-black'>
        <Appbar></Appbar>
        <Landing></Landing>
    </div>
  )
}

export default Landingpage
