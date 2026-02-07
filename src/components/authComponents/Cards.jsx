import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { ThemeDataContext } from "../../context/ThemeContext";
import { useRef } from "react";
const Cards = () => {
  const movieCollection = [
    {
      name: "John Wick",
      genre: "Action",
      description:
        "An ex-hitman comes out of retirement to track down the gangsters who killed his dog and took everything from him. A relentless tale of vengeance with stunning choreography.",
      poster: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
      rating: { imdb: "7.4", rottenTomatoes: "86%" },
      colorKey: "#4a7c59",
    },
    {
      name: "Spirited Away",
      genre: "Anime",
      description:
        "A young girl enters a world of spirits and must work to free her parents who have been transformed into pigs. Studio Ghibli magic at its best.",
      poster: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
      rating: { imdb: "8.6", rottenTomatoes: "96%" },
      colorKey: "pink",
    },
    {
      name: "The Conjuring",
      genre: "Horror",
      description:
        "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse. Terrifying and atmospheric.",
      poster: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
      rating: { imdb: "7.5", rottenTomatoes: "86%" },
      colorKey: "brown",
    },
    {
      name: "Superbad",
      genre: "Comedy",
      description:
        "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry. Teen comedy gold.",
      poster: "https://image.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg",
      rating: { imdb: "7.6", rottenTomatoes: "88%" },
      colorKey: "#f4a261",
    },
    {
      name: "Inception",
      genre: "Sci-Fi",
      description:
        "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea. Mind-bending reality within dreams.",
      poster: "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
      rating: { imdb: "8.8", rottenTomatoes: "87%" },
      colorKey: "#3d5a80",
    },
    {
      name: "Demon Slayer: Mugen Train",
      genre: "Anime",
      description:
        "Tanjiro and friends board the Mugen Train to investigate mysterious disappearances. Breathtaking animation and emotional demon-slaying action.",
      poster: "https://image.tmdb.org/t/p/w500/h8Rb9gBr48ODIwYUttZNYeMWeUU.jpg",
      rating: { imdb: "8.2", rottenTomatoes: "98%" },
      colorKey: "#8b2635",
    },

    {
      name: "The Lord of the Rings: Fellowship of the Ring",
      genre: "Adventure",
      description:
        "A meek Hobbit and companions set out to destroy a powerful ring and save Middle-earth from the Dark Lord Sauron. Epic fantasy adventure begins.",
      poster: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
      rating: { imdb: "8.8", rottenTomatoes: "91%" },
      colorKey: "#5d4e37",
    },

    {
      name: "The Shawshank Redemption",
      genre: "Drama",
      description:
        "Two imprisoned men bond over years, finding solace and eventual redemption through acts of common decency. Timeless tale of hope and friendship.",
      poster: "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      rating: { imdb: "9.3", rottenTomatoes: "91%" },
      colorKey: "#666",
    },
    {
      name: "Mad Max: Fury Road",
      genre: "Action",
      description:
        "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search of her homeland with the aid of a drifter. Pure adrenaline-fueled chaos.",
      poster: "https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
      rating: { imdb: "8.1", rottenTomatoes: "97%" },
      colorKey: "#e85d04",
    },
    {
      name: "Your Name",
      genre: "Anime",
      description:
        "Two strangers find themselves linked in a bizarre way, swapping bodies across time and space. Beautiful romance with comedic moments and stunning visuals.",
      poster: "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg",
      rating: { imdb: "8.4", rottenTomatoes: "98%" },
      colorKey: "#ff6b9d",
    },
    {
      name: "Se7en",
      genre: "Thriller",
      description:
        "Two detectives hunt a serial killer who uses the seven deadly sins as his motives. Dark, gritty psychological thriller with an unforgettable ending.",
      poster: "https://image.tmdb.org/t/p/w500/6yoghtyTpznpBik8EngEmJskVUO.jpg",
      rating: { imdb: "8.6", rottenTomatoes: "81%" },
      colorKey: "darkgray",
    },

    {
      name: "Princess Mononoke",
      genre: "Anime",
      description:
        "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between forest gods and humans.",
      poster: "https://image.tmdb.org/t/p/w500/cMYCDADoLKLbB83g4WnJegaZimC.jpg",
      rating: { imdb: "8.3", rottenTomatoes: "93%" },
      colorKey: "#2d5016",
    },
    {
      name: "Blade Runner 2049",
      genre: "Sci-Fi",
      description:
        "A young blade runner's discovery of a secret leads him to track down former blade runner Rick Deckard. Stunning visuals in a dystopian future.",
      poster: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
      rating: { imdb: "8.0", rottenTomatoes: "88%" },
      colorKey: "#ff6f00",
    },

    {
      name: "Indiana Jones: Raiders of the Lost Ark",
      genre: "Adventure",
      description:
        "Archaeologist Indiana Jones races against Nazis to find the mythical Ark of the Covenant. Classic adventure with whips, snakes, and ancient mysteries.",
      poster: "https://image.tmdb.org/t/p/w500/ceG9VzoRAVGwivFU403Wc3AHRys.jpg",
      rating: { imdb: "8.4", rottenTomatoes: "93%" },
      colorKey: "#8b6914",
    },

    {
      name: "Shutter Island",
      genre: "Mystery",
      description:
        "Two US marshals investigate the disappearance of a patient from a hospital for the criminally insane. Dark psychological mystery with shocking revelations.",
      poster: "https://image.tmdb.org/t/p/w500/4GDy0PHYX3VRXUtwK5ysFbg3kEx.jpg",
      rating: { imdb: "8.2", rottenTomatoes: "68%" },
      colorKey: "#37474f",
    },
    {
      name: "The Notebook",
      genre: "Romance",
      description:
        "An elderly man reads to a woman with dementia the story of two young lovers whose romance was threatened by social differences. Classic tearjerker.",
      poster: "https://image.tmdb.org/t/p/w500/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg",
      rating: { imdb: "7.8", rottenTomatoes: "54%" },
      colorKey: "#8e6c88",
    },

    {
      name: "Harry Potter and the Prisoner of Azkaban",
      genre: "Fantasy",
      description:
        "Harry's third year at Hogwarts is threatened by an escaped prisoner who appears to be connected to his past. Darkest and most atmospheric Potter film.",
      poster: "https://image.tmdb.org/t/p/w500/aWxwnYoe8p2d2fcxOqtvAtJ72Rw.jpg",
      rating: { imdb: "7.9", rottenTomatoes: "90%" },
      colorKey: "#424242",
    },

    {
      name: "Eternal Sunshine of the Spotless Mind",
      genre: "Romance",
      description:
        "A couple undergo a procedure to erase each other from their memories, but it doesn't quite work as planned. Inventive, emotional sci-fi romance.",
      poster: "https://image.tmdb.org/t/p/w500/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg",
      rating: { imdb: "8.3", rottenTomatoes: "93%" },
      colorKey: "#64b5f6",
    },
    {
      name: "Spider-Man: Into the Spider-Verse",
      genre: "Animation",
      description:
        "Teen Miles Morales becomes Spider-Man and must team up with counterparts from other dimensions. Revolutionary animation style and heartfelt story.",
      poster: "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
      rating: { imdb: "8.4", rottenTomatoes: "97%" },
      colorKey: "#e53935",
    },

    {
      name: "The Godfather",
      genre: "Crime",
      description:
        "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son. The ultimate crime saga.",
      poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      rating: { imdb: "9.2", rottenTomatoes: "97%" },
      colorKey: "#3e2723",
    },
    {
      name: "Coco",
      genre: "Animation",
      description:
        "A young musician seeks to unlock the mystery behind his family's ban on music by entering the Land of the Dead. Vibrant celebration of Mexican culture.",
      poster: "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
      rating: { imdb: "8.4", rottenTomatoes: "97%" },
      colorKey: "#ff6f00",
    },
    {
      name: "Weathering With You",
      genre: "Anime",
      description:
        "A boy runs away to Tokyo and befriends a girl who can manipulate the weather. Stunning visuals and emotional romance from the creator of Your Name.",
      poster: "https://image.tmdb.org/t/p/w500/qgrk7r1fV4IjuoeiGS5HOhXNdLJ.jpg",
      rating: { imdb: "7.5", rottenTomatoes: "92%" },
      colorKey: "#29b6f6",
    },

    {
      name: "My Hero Academia: World Heroes' Mission",
      genre: "Anime",
      description:
        "Deku and his friends must stop a terrorist organization from destroying the world with Quirk-destroying gas. High-stakes superhero action.",
      poster: "https://image.tmdb.org/t/p/w500/4NUzcKtYPKkfTwKsLjwNt8nRIXV.jpg",
      rating: { imdb: "7.2", rottenTomatoes: "93%" },
      colorKey: "#43a047",
    },

    {
      name: "La La Land",
      genre: "Musical",
      description:
        "An aspiring actress and a jazz musician fall in love while pursuing their dreams in Los Angeles. Modern musical with old Hollywood charm.",
      poster: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
      rating: { imdb: "8.0", rottenTomatoes: "91%" },
      colorKey: "#6a1b9a",
    },

    {
      name: "Jujutsu Kaisen 0",
      genre: "Anime",
      description:
        "A high school student haunted by his childhood friend's cursed spirit learns to control his powers at a school for jujutsu sorcerers. Dark supernatural action.",
      poster: "https://image.tmdb.org/t/p/w500/3pTwMUEavTzVOh6yLN0aEwR7uSy.jpg",
      rating: { imdb: "7.8", rottenTomatoes: "98%" },
      colorKey: "#1a237e",
    },

    {
      name: "The Dark Knight",
      genre: "Superhero",
      description:
        "Batman must accept one of the greatest psychological tests to fight injustice when the Joker wreaks havoc on Gotham. Heath Ledger's iconic performance.",
      poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      rating: { imdb: "9.0", rottenTomatoes: "94%" },
      colorKey: "#1c1c1c",
    },

    {
      name: "Avengers: Endgame",
      genre: "Superhero",
      description:
        "The Avengers assemble once more to reverse Thanos' actions and restore balance to the universe. Epic conclusion to the Infinity Saga.",
      poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
      rating: { imdb: "8.4", rottenTomatoes: "94%" },
      colorKey: "#0d47a1",
    },
    {
      name: "Interstellar",
      genre: "Sci-Fi",
      description:
        "A team of explorers travel through a wormhole in space to ensure humanity's survival as Earth faces environmental disaster. Nolan's space epic.",
      poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      rating: { imdb: "8.7", rottenTomatoes: "73%" },
      colorKey: "#263238",
    },
  ];
  const rotationRef = useRef(0);
  const { color, setColor, rotate, setRotate } = useContext(ThemeDataContext);

  return (
    <div className="h-full ml-4 w-[90%] bg-transparent rounded-4xl z-100">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        allowTouchMove={true}
        modules={[Autoplay]}
        className="mySwiper h-full w-full"
        onSlideChange={(swiper) => {
          const currentMovie = movieCollection[swiper.realIndex];
          setColor(currentMovie.colorKey);
          rotationRef.current += 360;
          setRotate(rotationRef.current);
        }}
        onSwiper={(swiper) => {
          // Set initial color when swiper loads
          setColor(movieCollection[swiper.realIndex].colorKey);
        }}
      >
        {movieCollection.map((movie, index) => {
          return (
            <SwiperSlide
              style={{
                backdropFilter: "blur(40px) saturate(150%)",
                background: "rgba(0, 0, 0, 0.6)", // Dark for readability
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              key={index}
              className="relative rounded-4xl "
            >
              <img
                src={movie.poster}
                alt={movie.name}
                className="h-full w-full object-fill rounded-4xl opacity-70 bg-blend-overlay bg-black "
              />
              <div className="absolute bottom-0 flex flex-col  font-roboto w-full h-50 border-2 border-white bg-black opacity-70 rounded-4xl ">
                <h1 className="px-2 text-[1.5rem] text-center font-black text-white whitespace-nowrap ">
                  {movie.name}
                </h1>
                <p className="py-2 text-xl px-2 text-white font-semibold ">
                  {movie.description}
                </p>
                <h2 className=" px-2 text-white">Ratings:</h2>
                <div className="flex flex-row gap-10  ">
                  <h2 className="px-2 text-[1.5rem] text-center font-black text-white whitespace-nowrap ">
                    IMDB: {movie.rating.imdb}
                  </h2>
                  <h2 className="px-2 text-[1.5rem] text-center font-black text-white whitespace-nowrap ">
                    RT: {movie.rating.rottenTomatoes}
                  </h2>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Cards;
