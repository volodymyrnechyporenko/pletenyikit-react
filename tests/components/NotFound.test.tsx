import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import NotFound from '../../src/pages/NotFound';

jest.mock('../../src/pages/NotFound.module.scss', () => ({
  wrapper: 'wrapper',
  content: 'content',
  code: 'code',
  title: 'title',
  text: 'text',
  link: 'link',
}));

describe('NotFound', () => {
  const renderNotFound = () => {
    return render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
  };

  it('renders 404 code', () => {
    renderNotFound();
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders title heading', () => {
    renderNotFound();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Сторінку не знайдено' }),
    ).toBeInTheDocument();
  });

  it('renders description text', () => {
    renderNotFound();
    expect(
      screen.getByText(
        /Запитана адреса не існує або сторінка була переміщена/,
      ),
    ).toBeInTheDocument();
  });

  it('renders link to home page', () => {
    renderNotFound();
    const link = screen.getByRole('link', { name: 'На головну' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('sets page title in title element', () => {
    renderNotFound();
    const titleEl = document.querySelector('title');
    expect(titleEl).toBeInTheDocument();
    expect(titleEl?.textContent).toBe('Сторінку не знайдено — Плетений КіТ');
  });

  it('sets meta description', () => {
    renderNotFound();
    const meta = document.querySelector('meta[name="description"]');
    expect(meta).toBeInTheDocument();
    expect(meta).toHaveAttribute(
      'content',
      'Запитана сторінка не існує або була переміщена. Поверніться на головну сторінку Плетений КіТ.',
    );
  });

  it('sets canonical link to /404', () => {
    renderNotFound();
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).toBeInTheDocument();
    expect(canonical).toHaveAttribute('href', 'https://pletenyikit.com/404');
  });
});
