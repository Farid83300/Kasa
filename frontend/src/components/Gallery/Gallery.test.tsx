import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Gallery from './Gallery';

vi.mock('next/image', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  default: ({ fill, priority, sizes, ...props }: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('Gallery', () => {
  const images = ['/image-1.jpg', '/image-2.jpg', '/image-3.jpg'];

  it('affiche la première image au montage', () => {
    render(<Gallery images={images} alt="Appartement cosy" />);
    expect(screen.getByAltText(/photo 1 sur 3/i)).toBeInTheDocument();
  });

  it("n'affiche aucune flèche de navigation s'il n'y a qu'une seule image", () => {
    render(<Gallery images={['/image-1.jpg']} alt="Studio" />);
    expect(screen.queryByLabelText('Image suivante')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Image précédente')).not.toBeInTheDocument();
  });

  it("affiche les flèches de navigation s'il y a plusieurs images", () => {
    render(<Gallery images={images} alt="Appartement cosy" />);
    expect(screen.getByLabelText('Image suivante')).toBeInTheDocument();
    expect(screen.getByLabelText('Image précédente')).toBeInTheDocument();
  });

  it("passe à l'image suivante au clic sur la flèche droite", async () => {
    const user = userEvent.setup();
    render(<Gallery images={images} alt="Appartement cosy" />);
    await user.click(screen.getByLabelText('Image suivante'));
    expect(screen.getByAltText(/photo 2 sur 3/i)).toBeInTheDocument();
  });

  it('boucle sur la dernière image en cliquant précédent depuis la première', async () => {
    const user = userEvent.setup();
    render(<Gallery images={images} alt="Appartement cosy" />);
    await user.click(screen.getByLabelText('Image précédente'));
    expect(screen.getByAltText(/photo 3 sur 3/i)).toBeInTheDocument();
  });

  it('boucle sur la première image en cliquant suivant depuis la dernière', async () => {
    const user = userEvent.setup();
    render(<Gallery images={images} alt="Appartement cosy" />);
    await user.click(screen.getByLabelText('Image suivante'));
    await user.click(screen.getByLabelText('Image suivante'));
    await user.click(screen.getByLabelText('Image suivante'));
    expect(screen.getByAltText(/photo 1 sur 3/i)).toBeInTheDocument();
  });

  it('navigue avec les flèches du clavier', async () => {
    const user = userEvent.setup();
    render(<Gallery images={images} alt="Appartement cosy" />);
    screen.getByRole('region').focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByAltText(/photo 2 sur 3/i)).toBeInTheDocument();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByAltText(/photo 1 sur 3/i)).toBeInTheDocument();
  });
});
