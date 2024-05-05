import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { MovieContext, MovieContextType } from "../../context";
import { getImageUrl } from "../../utils/cine-utility";
import MovieDetailsModal from "../MovieDetailsModal";
import Rating from "./movieCard/Rating";

export interface IMovieDetails {
  id: string;
  cover: string;
  title: string;
  description: string;
  genre: string;
  rating: number;
  price: number;
}

export default function MovieCard({ movie }: { movie: IMovieDetails }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<IMovieDetails | null>(
    null
  );
  const { state, dispatch } = useContext(MovieContext) as MovieContextType;

  function handleModalClose() {
    setSelectedMovie(null);
    setShowModal(false);
  }
  function handleMovieSelect() {
    setSelectedMovie(movie);
    setShowModal(true);
  }
  function handleAdd(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation();
    addToCart();
  }
  function addToCart() {
    const found = state?.cartData.find((el) => el.id === movie.id);

    if (!found) {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          ...movie,
        },
      });
      toast.success(`Movie ${movie.title} added successfully`, {
        position: "bottom-right",
      });
    } else {
      toast.error(
        `The movie ${movie.title} has been added to the cart already!`,
        {
          position: "bottom-right",
        }
      );
    }
  }

  return (
    <>
      {showModal && selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={handleModalClose}
          handleAdd={addToCart}
        />
      )}
      <figure className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl">
        <div onClick={handleMovieSelect} className="cursor-pointer">
          <img
            className="w-full object-cover"
            src={getImageUrl(movie.cover)}
            alt={movie.cover}
          />
          <figcaption className="pt-4">
            <h3 className="text-xl mb-1">{movie.title}</h3>
            <p className="text-[#575A6E] text-sm mb-2">{movie.genre}</p>
            <div className="flex items-center space-x-1 mb-5">
              <Rating value={movie.rating} />
            </div>
            <button
              className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
              onClick={handleAdd}
            >
              <span>${movie.price} | Add to Cart</span>
            </button>
          </figcaption>
        </div>
      </figure>
    </>
  );
}
