import { thunkGetCourts } from '../../store/courts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'

function CourtsPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const courtsObj = useSelector(state => state.courts);
    const courtsArr = Object.values(courtsObj);

    useEffect (() => {
        dispatch(thunkGetCourts())
    }, [dispatch])

  if (sessionUser) {
    return (
        <>
        {courtsObj && courtsArr.map(court => {
            const handleEditClick = (e) => {
                e.preventDefault();
                history.push(`/court/${court.id}`)
              }
              const handleReviewClick = (e) => {
                e.preventDefault();
                history.push(`/reviews`)
              }
              const handleAddReviewClick = (e) => {
                e.preventDefault();
                history.push(`/reviews/create`)
              }
            return <ul key={court.id}>
                <li>{court.name}</li>
                <li>{court.description}</li>
                <li>{court.country}</li>
                <li>${court.price}.00/hour</li>
                <button type='button' onClick={handleEditClick}>Edit</button>
                <button type='button' onClick={handleReviewClick}>Reviews</button>
                <button type='button' onClick={handleAddReviewClick}>Add Review</button>
            </ul>
          })}
        </>
    );
} else {
    return (
        <>
        {courtsObj && courtsArr.map(court => {
            return <ul key={court.id}>
                <li>{court.name}</li>
                <li>{court.description}</li>
                <li>{court.country}</li>
                <li>${court.price}.00/hour</li>
            </ul>
          })}
        </>
    );
  }
}

export default CourtsPage;
