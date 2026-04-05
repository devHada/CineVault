import React from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../api/tmdb";
import { Star } from "lucide-react";

const MovieCard = ({
  id,
  title,
  poster,
  rating,
  year,
  description,
  mediaType = "movie",
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/details/${mediaType}/${id}`)}
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
      }}
      className="rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105"
    >
      <div className="relative overflow-hidden">
        <img
          src={`${IMAGE_BASE_URL}${poster}`}
          alt={title}
          className="w-full object-cover h-64"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <p
            style={{ color: "var(--text-primary)" }}
            className="text-xs font-raleway text-center px-4 line-clamp-3"
          >
            {description}
          </p>
        </div>
      </div>
      <div className="p-3 flex flex-col gap-1">
        <h3
          style={{ color: "var(--text-primary)" }}
          className="font-raleway font-bold text-sm line-clamp-1"
        >
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <span
            style={{ color: "var(--text-secondary)" }}
            className="font-raleway text-xs"
          >
            {year}
          </span>
          <div className="flex items-center gap-1">
            <Star
              size={12}
              style={{ color: "var(--accent)" }}
              fill="var(--accent)"
            />
            <span
              style={{ color: "var(--accent)" }}
              className="font-raleway text-xs font-bold"
            >
              {rating?.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
