import { ReactComponent as EVIL } from '../assets/Evil.svg'
import { ReactComponent as SUN } from '../assets/Sun.svg'
import { ReactComponent as SMILEY } from '../assets/Smiley.svg'
import { useNavigate } from 'react-router-dom'

const EvilHeader = () => {
  const navigate = useNavigate()
  return (
    <div className='title-logo-container'>
      <EVIL className='logo' onClick={() => navigate('/')} />
      <div className='title-logos'>
        <SUN className='sun' />
        <SMILEY className='smiley' />
      </div>
    </div>
  )
}

export default EvilHeader
