import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import {
  leftNavigation,
  rightNavigation,
} from '../../src/constants/navigation';
import Header from '../../src/components/Header/Header';

const renderStyles = (menuButton: HTMLElement, sidebar: HTMLElement | null) => {
  fireEvent.click(menuButton);
  expect(sidebar).toHaveClass('active');
  expect(menuButton).toHaveAttribute('aria-expanded', 'true');

  fireEvent.click(menuButton);
  expect(sidebar).not.toHaveClass('active');
  expect(menuButton).toHaveAttribute('aria-expanded', 'false');
};

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({
    icon,
    size,
    onClick,
  }: {
    icon: unknown;
    size: string;
    onClick: () => void;
  }) => (
    <div
      data-testid='font-awesome-icon'
      data-icon={JSON.stringify(icon)}
      data-size={size}
      onClick={onClick}
      role='button'
      tabIndex={0}
    />
  ),
}));

jest.mock('@fortawesome/free-solid-svg-icons', () => ({
  faBars: { iconName: 'bars', prefix: 'fas' },
  faTimes: { iconName: 'times', prefix: 'fas' },
}));

jest.mock('../../src/components/Header/Header.module.scss', () => ({
  nav: 'nav',
  'nav-left': 'nav-left',
  'nav-logo': 'nav-logo',
  'nav-right': 'nav-right',
  'menu-link': 'menu-link',
  'menu-icon': 'menu-icon',
  sidebar: 'sidebar',
  active: 'active',
  side: 'side',
}));

jest.mock('../../src/constants/navigation', () => ({
  leftNavigation: [
    { path: '/toys', name: 'Іграшки' },
    { path: '/accessories', name: 'Одяг' },
    { path: '/pillows', name: 'Подушки' },
  ],
  rightNavigation: [
    { path: '/kitchen', name: 'Для кухні' },
    { path: '/about-pletenyi-kit', name: 'Про нас' },
    { path: '/care-conditions', name: 'Умови догляду' },
  ],
}));

const RouterWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <BrowserRouter>{children}</BrowserRouter>;

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders header element', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>,
      );

      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('renders logo with correct attributes', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>,
      );

      const logo = screen.getByAltText('pletenyikit');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/img/PletenyiKit_logo_round.png');
    });

    it('renders logo link to home page', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>,
      );

      const logoLink = screen.getByRole('link', { name: /pletenyikit/i });
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it('renders FontAwesome icon with correct initial state', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>,
      );

      const menuButton = screen.getByRole('button', { name: /відкрити меню/i });
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      const icon = screen.getByTestId('font-awesome-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('data-size', '2x');
      expect(icon).toHaveAttribute(
        'data-icon',
        JSON.stringify({ iconName: 'bars', prefix: 'fas' }),
      );
    });
  });

  describe('Navigation Links', () => {
    it('renders all left navigation links', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>,
      );

      leftNavigation.forEach(item => {
        const link = screen.getAllByRole('link', { name: item.name });
        expect(link.length).toBeGreaterThan(0);
        expect(link[0]).toHaveAttribute('href', item.path);
      });
    });

    it('renders all right navigation links', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>,
      );

      rightNavigation.forEach(item => {
        const link = screen.getAllByRole('link', { name: item.name });
        expect(link.length).toBeGreaterThan(0);
        expect(link[0]).toHaveAttribute('href', item.path);
      });
    });

    it('renders navigation links with correct CSS classes', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>,
      );

      const menuLinks = screen
        .getAllByRole('link')
        .filter(link => link.getAttribute('href') !== '/');

      const desktopMenuLinks = menuLinks.slice(
        0,
        leftNavigation.length + rightNavigation.length,
      );
      desktopMenuLinks.forEach(link => {
        expect(link).toHaveClass('menu-link');
      });
    });
  });

  describe('Burger Menu Functionality', () => {
    it('initializes with burger menu closed', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>,
      );

      const sidebar = screen.getByRole('list').parentElement;
      expect(sidebar).toHaveClass('sidebar');
      expect(sidebar).not.toHaveClass('active');
    });

    it('toggles burger menu when icon is clicked', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>,
      );

      const menuButton = screen.getByRole('button', { name: /відкрити меню/i });
      const sidebar = screen.getByRole('list').parentElement;

      expect(sidebar).not.toHaveClass('active');
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');

      renderStyles(menuButton, sidebar);
    });

    it('closes burger menu when sidebar is clicked', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>,
      );

      const menuButton = screen.getByRole('button', { name: /відкрити меню/i });
      const sidebar = screen.getByRole('list').parentElement;

      fireEvent.click(menuButton);
      expect(sidebar).toHaveClass('active');

      fireEvent.click(sidebar!);
      expect(sidebar).not.toHaveClass('active');
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Sidebar Navigation', () => {
    it('renders all navigation items in sidebar', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>,
      );

      const sidebarItems = screen.getByRole('list').querySelectorAll('li');
      const expectedItemsCount = leftNavigation.length + rightNavigation.length;

      expect(sidebarItems).toHaveLength(expectedItemsCount);
    });

    it('renders sidebar items with correct links and classes', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>,
      );

      const sidebarItems = screen.getByRole('list').querySelectorAll('li');
      const allNavItems = [...leftNavigation, ...rightNavigation];

      sidebarItems.forEach((item, index) => {
        expect(item).toHaveClass('side');

        const link = item.querySelector('a');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', allNavItems[index].path);
        expect(link).toHaveTextContent(allNavItems[index].name);
      });
    });

    it('maintains correct order of navigation items in sidebar', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>,
      );

      const sidebarLinks = screen.getByRole('list').querySelectorAll('a');
      const expectedOrder = [...leftNavigation, ...rightNavigation];

      sidebarLinks.forEach((link, index) => {
        expect(link).toHaveTextContent(expectedOrder[index].name);
        expect(link).toHaveAttribute('href', expectedOrder[index].path);
      });
    });

    it('closes burger menu when a sidebar link is clicked without toggling back open', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>,
      );

      const menuButton = screen.getByRole('button', { name: /відкрити меню/i });
      const sidebar = screen.getByRole('dialog', { name: 'Меню навігації' });

      fireEvent.click(menuButton);
      expect(sidebar).toHaveClass('active');

      const sidebarToysLink = within(sidebar).getByRole('link', { name: 'Іграшки' });
      fireEvent.click(sidebarToysLink);

      expect(sidebar).not.toHaveClass('active');
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('CSS Classes and Styling', () => {
    it('applies correct CSS classes to navigation sections', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>,
      );

      const navElement = screen.getByRole('banner').querySelector('.nav');
      expect(navElement).toBeInTheDocument();

      const navLeft = navElement!.querySelector('.nav-left');
      const navLogo = navElement!.querySelector('.nav-logo');
      const navRight = navElement!.querySelector('.nav-right');
      const menuIcon = navElement!.querySelector('.menu-icon');

      expect(navLeft).toBeInTheDocument();
      expect(navLogo).toBeInTheDocument();
      expect(navRight).toBeInTheDocument();
      expect(menuIcon).toBeInTheDocument();
    });

    it('applies active class to sidebar when burger menu is open', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>,
      );

      const menuButton = screen.getByRole('button', { name: /відкрити меню/i });
      const sidebar = screen.getByRole('list').parentElement;

      expect(sidebar).toHaveClass('sidebar');
      expect(sidebar?.className).not.toContain('active');

      fireEvent.click(menuButton);
      expect(sidebar?.className).toContain('sidebar');
      expect(sidebar?.className).toContain('active');
    });
  });

  describe('Accessibility', () => {
    it('provides proper semantic structure', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>,
      );

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getAllByRole('link')).toHaveLength(
        leftNavigation.length +
          rightNavigation.length +
          1 +
          leftNavigation.length +
          rightNavigation.length,
      );
    });

    it('burger menu button is keyboard accessible', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>,
      );

      const menuButton = screen.getByRole('button', { name: /відкрити меню/i });
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      expect(menuButton).toHaveAttribute('aria-controls', 'sidebar-menu');
    });
  });

  describe('Component State Management', () => {
    it('maintains correct state throughout multiple toggles', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>,
      );

      const menuButton = screen.getByRole('button', { name: /відкрити меню/i });
      const sidebar = screen.getByRole('list').parentElement;

      for (let i = 0; i < 3; i++) {
        renderStyles(menuButton, sidebar);
      }
    });
  });

  describe('Error Handling', () => {
    it('handles empty navigation arrays gracefully', () => {
      jest.doMock('../../src/constants/navigation', () => ({
        leftNavigation: [],
        rightNavigation: [],
      }));

      expect(() => {
        render(
          <RouterWrapper>
            <Header />
          </RouterWrapper>,
        );
      }).not.toThrow();
    });
  });
});
