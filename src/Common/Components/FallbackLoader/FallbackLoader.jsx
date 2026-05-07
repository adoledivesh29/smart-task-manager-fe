import { CircularProgress } from '@mui/material'

const FallbackLoader = () => {
    return (
        <div className='fallback-loader-container'>
            <CircularProgress className='fallback-loader' size="30px" />
        </div >
    )
}

export default FallbackLoader
