import { FETCH_MOVIES_SUCCESS } from './actions';
import { FETCH_MOVIE_SUCCESS } from './actions';
import { FETCH_FAVMOVIE_SUCCESS } from './actions';

const initialState = {
  movies: [],
  movie: null,
  favourite: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload,
    };
    case FETCH_MOVIE_SUCCESS:
      return {
        ...state,
        movie: action.payload,
    };
    case FETCH_FAVMOVIE_SUCCESS:
      return {
        ...state,
        favourite: action.payload,
    };  
    default:
      return state;
  }
};

export default reducer;