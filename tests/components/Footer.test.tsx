import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../../src/components/Footer/Footer';

jest.mock('../../src/components/Footer/Footer.module.scss', () => ({
  'foot-all': 'foot-all',
  'foot-left': 'foot-left',
  'foot-right': 'foot-right',
}));

describe('Footer', () => {
  it('renders footer element', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders brand heading Плетений КіТ', () => {
    render(<Footer />);
    expect(
      screen.getByRole('heading', { level: 3, name: 'Плетений КіТ' }),
    ).toBeInTheDocument();
  });

  it('renders tagline heading', () => {
    render(<Footer />);
    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'Найгарніша реінкарнація пряжі',
      }),
    ).toBeInTheDocument();
  });

  it('renders phone link with correct href and aria-label', () => {
    render(<Footer />);
    const phoneLink = screen.getByRole('link', {
      name: 'Подзвонити Плетений КіТ',
    });
    expect(phoneLink).toHaveAttribute('href', 'tel:+380630546382');
    expect(phoneLink).toHaveTextContent('+38 063 054 63 82');
  });

  it('renders Facebook link with correct href and aria-label', () => {
    render(<Footer />);
    const fbLink = screen.getByRole('link', {
      name: 'Плетений КіТ у Facebook',
    });
    expect(fbLink).toHaveAttribute('href', 'https://www.facebook.com/PletenyiKiT');
    expect(fbLink).toHaveAttribute('target', '_blank');
    expect(fbLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders Instagram link with correct href and aria-label', () => {
    render(<Footer />);
    const igLink = screen.getByRole('link', {
      name: 'Плетений КіТ в Instagram',
    });
    expect(igLink).toHaveAttribute(
      'href',
      'https://www.instagram.com/pletenyi_kit/',
    );
    expect(igLink).toHaveAttribute('target', '_blank');
    expect(igLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders contact section heading', () => {
    render(<Footer />);
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Маєте питання чи пропозиції?',
      }),
    ).toBeInTheDocument();
  });

  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText('© PletenyiKit.')).toBeInTheDocument();
  });
});
