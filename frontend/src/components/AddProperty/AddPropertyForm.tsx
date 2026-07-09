'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

const EQUIPMENTS = [
  'Micro-Ondes',
  'Clic-clac',
  'Douche italienne',
  'Four',
  'Frigo',
  'Rangements',
  'WIFI',
  'Lit',
  'Parking',
  'Bouilloire',
  'Sèche Cheveux',
  'SDB',
  'Machine à laver',
  'Toilettes sèches',
  'Cuisine équipée',
  'Cintres',
  'Télévision',
  'Baie vitrée',
  'Chambre Séparée',
  'Hotte',
  'Climatisation',
  'Baignoire',
  'Frigo Américain',
  'Vue Parc',
];

const DEFAULT_TAGS = ['Parc', 'Night Life', 'Culture', 'Nature', 'Touristique'];

/**
 * Envoie un fichier au proxy d'upload et retourne l'URL absolue de l'image.
 * Le backend renvoie une URL relative (/uploads/xxx.jpg) — on la préfixe
 * avec l'origine du backend, sinon le navigateur la cherche sur localhost:3002
 * (frontend) au lieu de localhost:3000 (backend).
 */
async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/uploads', { method: 'POST', body: formData });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Erreur lors de l'upload de l'image");
  }

  const backendOrigin = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '');
  return data.url.startsWith('http') ? data.url : `${backendOrigin}${data.url}`;
}

/** Formulaire d'ajout de propriété — Client Component, gère l'état complexe (uploads, listes dynamiques) */
export default function AddPropertyForm() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [localisation, setLocalisation] = useState('');
  // Absent de la maquette mais requis par l'API — sans prix, le backend refuse la création
  const [pricePerNight, setPricePerNight] = useState('');

  const [cover, setCover] = useState('');
  const [pictures, setPictures] = useState<string[]>([]);

  const [hostName, setHostName] = useState('');
  const [hostPicture, setHostPicture] = useState('');

  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleEquipment = (equipment: string) => {
    setSelectedEquipments((prev) =>
      prev.includes(equipment) ? prev.filter((item) => item !== equipment) : [...prev, equipment]
    );
  };

  const toggleTag = (tag: string) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]));
  };

  const addCustomTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setNewTag('');
  };

  const handleCoverUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setCover(await uploadImage(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'upload.");
    }
  };

  const handlePictureUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      setPictures((prev) => [...prev, url]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'upload.");
    }
  };

  const handleHostPictureUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setHostPicture(await uploadImage(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'upload.");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          cover,
          // Code postal et localisation sont deux champs distincts dans la maquette,
          // combinés ici car l'API n'expose qu'un seul champ "location"
          location: postalCode ? `${localisation} - ${postalCode}` : localisation,
          price_per_night: Number(pricePerNight),
          // Le backend ignore host.name et host.picture à l'enregistrement : il affiche
          // systématiquement le nom/photo du compte connecté (lié via host_id), pas les
          // valeurs saisies ici. On envoie quand même ces champs pour rester cohérent
          // avec le schéma de l'API, mais ils sont sans effet visible côté affichage.
          host: { name: hostName, picture: hostPicture },
          pictures,
          equipments: selectedEquipments,
          tags,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Erreur lors de la création du logement.');
      }

      router.push(`/logement/${data.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ajouter une propriété</h1>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-kasa-primary px-6 py-3 text-sm text-white hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? 'Ajout...' : 'Ajouter'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-6 flex flex-col gap-4">
            <div>
              <label htmlFor="title" className="block text-sm mb-1">
                Titre de la propriété
              </label>
              <input
                id="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex : Appartement cosy au coeur de paris"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm mb-1">
                Description
              </label>
              <textarea
                id="description"
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez votre propriété en détail..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm resize-none"
              />
            </div>

            <div>
              <label htmlFor="postalCode" className="block text-sm mb-1">
                Code postal
              </label>
              <input
                id="postalCode"
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
              />
            </div>

            <div>
              <label htmlFor="localisation" className="block text-sm mb-1">
                Localisation
              </label>
              <input
                id="localisation"
                type="text"
                required
                value={localisation}
                onChange={(e) => setLocalisation(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm mb-1">
                Prix par nuit (€)
              </label>
              <input
                id="price"
                type="number"
                required
                min={0}
                value={pricePerNight}
                onChange={(e) => setPricePerNight(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-semibold mb-4">Équipements</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {EQUIPMENTS.map((equipment) => (
                <label key={equipment} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedEquipments.includes(equipment)}
                    onChange={() => toggleEquipment(equipment)}
                  />
                  {equipment}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-6 flex flex-col gap-4">
            <div>
              <label htmlFor="cover" className="block text-sm mb-1">
                Image de couverture
              </label>
              <div className="flex gap-2">
                <input
                  id="cover"
                  type="text"
                  readOnly
                  value={cover}
                  placeholder="Aucune image sélectionnée"
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm bg-gray-50"
                />
                <label className="flex items-center justify-center rounded-lg bg-kasa-primary px-4 cursor-pointer text-white">
                  +
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <span className="block text-sm mb-1">Image du logement</span>
              {pictures.map((picture, index) => (
                <input
                  key={index}
                  type="text"
                  readOnly
                  value={picture}
                  className="w-full mb-2 rounded-lg border border-gray-300 px-4 py-2 text-sm bg-gray-50"
                />
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value=""
                  placeholder="Aucune image sélectionnée"
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm bg-gray-50"
                />
                <label className="flex items-center justify-center rounded-lg bg-kasa-primary px-4 cursor-pointer text-white">
                  +
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePictureUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/*
            Ces deux champs (Nom de l'hôte / Photo de profil) sont présents pour
            rester fidèle à la maquette Figma, mais l'API backend les ignore à la
            création : elle affiche toujours le nom/photo du compte owner connecté
            (lié via host_id), pas les valeurs saisies dans ce formulaire.
            */}

          <div className="bg-white rounded-2xl p-6 flex flex-col gap-4">
            <div>
              <label htmlFor="hostName" className="block text-sm mb-1">
                Nom de l&apos;hôte
              </label>
              <input
                id="hostName"
                type="text"
                required
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
              />
            </div>

            <div>
              <span className="block text-sm mb-1">Photo de profil</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={hostPicture}
                  placeholder="Aucune image sélectionnée"
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm bg-gray-50"
                />
                <label className="flex items-center justify-center rounded-lg bg-kasa-primary px-4 cursor-pointer text-white">
                  +
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleHostPictureUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-semibold mb-4">Catégories</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {DEFAULT_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`rounded-lg border px-4 py-2 text-sm ${
                    tags.includes(tag)
                      ? 'bg-kasa-primary text-white border-kasa-primary'
                      : 'border-gray-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
              {tags
                .filter((tag) => !DEFAULT_TAGS.includes(tag))
                .map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className="rounded-lg border px-4 py-2 text-sm bg-kasa-primary text-white border-kasa-primary"
                  >
                    {tag}
                  </button>
                ))}
            </div>

            <label htmlFor="newTag" className="block text-sm mb-1">
              Ajouter une catégorie personnalisée
            </label>
            <div className="flex gap-2">
              <input
                id="newTag"
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Nouveau tag"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm"
              />
              <button
                type="button"
                onClick={addCustomTag}
                className="rounded-lg bg-kasa-primary px-4 text-white"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
