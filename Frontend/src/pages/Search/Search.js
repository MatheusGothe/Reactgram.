import './Search.css'

// hooks
import { useEffect} from 'react'
import { useSelector,useDispatch} from 'react-redux'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'
import { useQuery } from '../../hooks/useQuery'

// components
import LikeCommentContainer from  '../../components/LikeECommentContainer'  
import PhotoItem from '../../components/PhotoItem'
import { Link } from 'react-router-dom'

// redux
import { searchUsers,like,deslike,comment,removeComment } from '../../slices/userSlice'

const Search = () => {

  const query = useQuery()
  const search = query.get("q")

  const dispatch = useDispatch()

  const resetMessage = useResetComponentMessage(dispatch)

  const { user} = useSelector(state => state.auth)
  const { photos, loading} = useSelector(state => state.photo)

  // Load photos
  useEffect(() => {

    dispatch(searchUsers(search))

  },[dispatch,search ] )


  return (
    <div>Search {search} </div>
  )
}

export default Search