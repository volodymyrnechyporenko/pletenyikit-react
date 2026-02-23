import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '../../src/components/Layout/Layout';

jest.mock('../../src/components/Header/Header', () => ({
  __esModule: true,
  default: () => <header data-testid="header">Header</header>,
}));
jest.mock('../../src/components/ScrollToTop/ScrollToTop', () => ({
  __esModule: true,
  default: () => <div data-testid="scroll-to-top">ScrollToTop</div>,
}));
jest.mock('../../src/components/Footer/Footer', () => ({
  __esModule: true,
  default: () => <footer data-testid="footer">Footer</footer>,
}));

describe('Layout', () => {
  it('renders skip link to main content', () => {
    render(<Layout><div>Page</div></Layout>);
    const skipLink = screen.getByRole('link', {
      name: 'Перейти до основного контенту',
    });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
    expect(skipLink).toHaveClass('skip-link');
  });

  it('renders Header', () => {
    render(<Layout><div>Page</div></Layout>);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders ScrollToTop', () => {
    render(<Layout><div>Page</div></Layout>);
    expect(screen.getByTestId('scroll-to-top')).toBeInTheDocument();
  });

  it('renders main with id main-content', () => {
    render(<Layout><div>Page</div></Layout>);
    const main = screen.getByRole('main', { name: '' });
    expect(main).toBeInTheDocument();
    expect(main).toHaveAttribute('id', 'main-content');
  });

  it('renders children inside main', () => {
    render(
      <Layout>
        <div data-testid="page-content">Page content</div>
      </Layout>,
    );
    const main = screen.getByRole('main', { name: '' });
    const content = screen.getByTestId('page-content');
    expect(main).toContainElement(content);
    expect(content).toHaveTextContent('Page content');
  });

  it('renders Footer', () => {
    render(<Layout><div>Page</div></Layout>);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
