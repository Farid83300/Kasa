interface RatingProps {
  value: number;
  max?: number;
}

/** Affichage de note sous forme d'étoiles — role="img" requis pour qu'aria-label soit valide sur un div */
export default function Rating({ value, max = 5 }: RatingProps) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`Note : ${value} sur ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={i < Math.round(value) ? "text-kasa-primary" : "text-gray-300"}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}
