import { useState, useEffect } from 'react';
import Axios from 'axios';
import './listItem.scss';
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from '@material-ui/icons';

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await Axios.get('http://localhost:5004/api/movies/find/' + item, {
          headers: {
            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjQ0NDI0YTUxZTRhNWExMmJlYTNmZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyNjcxNTQ1MCwiZXhwIjoxNjI3MTQ3NDUwfQ.4uvl4tomVSh1RT97mK407wQI59FmxuXt2_H-dIY67xw'
          }
        });
        setMovie(res.data)
      } catch (err) {
        console.log(err)
      }
    };
    getMovie()
  },[item])
  
  return (
    <div
      className='listItem'
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movie.img}
        alt=''
      />
      {isHovered && (
        <>
          <video src={movie.trailer} autoPlay={true} loop />
          <div className='itemInfo'>
            <div className='icons'>
              <PlayArrow className='icon' />
              <Add className='icon' />
              <ThumbUpAltOutlined className='icon' />
              <ThumbDownOutlined className='icon' />
            </div>
            <div className='itemInfoTop'>
              <span>{movie.duration}</span>
              <span className='limit'>+{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className='desc'>
            {movie.desc}
            </div>
            <div className='genre'>{movie.genre}</div>
          </div>
        </>
      )}
    </div>
  );
}
