import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import { RouteGuard } from '../../src/router/RouteGuard';

jest.mock('../../src/data/valid-routes.json', () => ({
  __esModule: true,
  default: ['/', '/toys'],
}));

const HomeContent = () => <div data-testid="home-content">Home</div>;
const NotFoundContent = () => <div data-testid="404-content">Not found</div>;
const ToysContent = () => <div data-testid="toys-content">Toys</div>;

const renderWithRouter = (initialEntry: string) => {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route element={<RouteGuard />}>
          <Route index element={<HomeContent />} />
          <Route path="toys" element={<ToysContent />} />
          <Route path="404" element={<NotFoundContent />} />
          <Route path="*" element={null} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
};

describe('RouteGuard', () => {
  it('renders outlet for valid route /', () => {
    renderWithRouter('/');
    expect(screen.getByTestId('home-content')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders outlet for valid route /toys', () => {
    renderWithRouter('/toys');
    expect(screen.getByTestId('toys-content')).toBeInTheDocument();
    expect(screen.getByText('Toys')).toBeInTheDocument();
  });

  it('renders outlet for /404 without redirecting', () => {
    renderWithRouter('/404');
    expect(screen.getByTestId('404-content')).toBeInTheDocument();
    expect(screen.getByText('Not found')).toBeInTheDocument();
  });

  it('redirects invalid route to /404', () => {
    renderWithRouter('/invalid-route-xyz');
    expect(screen.getByTestId('404-content')).toBeInTheDocument();
    expect(screen.getByText('Not found')).toBeInTheDocument();
  });

  it('redirects path with trailing slash to /404 when normalized path is invalid', () => {
    renderWithRouter('/nonexistent/');
    expect(screen.getByTestId('404-content')).toBeInTheDocument();
  });
});
