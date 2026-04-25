import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import '@testing-library/jest-dom';

import ProductDetails from '../../src/components/ProductDetails/ProductDetails';
import useDetectDataType from '../../src/hooks/useDetectDataType';
import { ItemDetails } from '../../src/interfaces/interfaces';

jest.mock('../../src/hooks/useDetectDataType');

jest.mock('../../src/components/Slider/Slider', () => {
  return function MockSlider() {
    return <div data-testid="mock-slider" />;
  };
});

jest.mock('../../src/components/SimilarItem/SimilarItem', () => {
  return function MockSimilarItem() {
    return <div data-testid="mock-similar-item" />;
  };
});

jest.mock(
  '../../src/components/ProductDetails/ProductDetails.module.scss',
  () => ({
    'product-details-skeleton': 'product-details-skeleton',
    'skeleton-heading': 'skeleton-heading',
    'skeleton-slider': 'skeleton-slider',
    'skeleton-title': 'skeleton-title',
    'skeleton-text': 'skeleton-text',
    'skeleton-price': 'skeleton-price',
    'product-similar': 'product-similar',
    'edge-nav': 'edge-nav',
    'edge-nav-button': 'edge-nav-button',
    'edge-nav-button-left': 'edge-nav-button-left',
    'edge-nav-button-right': 'edge-nav-button-right',
  }),
);

const mockUseDetectDataType = useDetectDataType as jest.MockedFunction<
  typeof useDetectDataType
>;

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};

const renderWithRouter = (initialEntry: string) => {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/:category/:link" element={<ProductDetails />} />
        <Route path="*" element={<LocationDisplay />} />
      </Routes>
      <LocationDisplay />
    </MemoryRouter>,
  );
};

describe('ProductDetails prev/next navigation', () => {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      link: 'product-1',
      images: ['image1.jpg'],
      description: ['Desc 1'],
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      link: 'product-2',
      images: ['image2.jpg'],
      description: ['Desc 2'],
    },
    {
      id: 3,
      name: 'Product 3',
      price: 300,
      link: 'product-3',
      images: ['image3.jpg'],
      description: ['Desc 3'],
    },
  ] as ItemDetails[];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDetectDataType.mockReturnValue({
      category: 'toys',
      heading: 'Іграшки',
      products,
      setProducts: jest.fn(),
    });
  });

  it('navigates to next product within category', async () => {
    const user = userEvent.setup();
    renderWithRouter('/toys/product-1');

    expect(screen.getByTestId('location-display')).toHaveTextContent(
      '/toys/product-1',
    );

    await user.click(screen.getByTestId('product-details-next'));

    expect(screen.getByTestId('location-display')).toHaveTextContent(
      '/toys/product-2',
    );
  });

  it('navigates to previous product with wrap-around (first -> last)', async () => {
    const user = userEvent.setup();
    renderWithRouter('/toys/product-1');

    await user.click(screen.getByTestId('product-details-prev'));

    expect(screen.getByTestId('location-display')).toHaveTextContent(
      '/toys/product-3',
    );
  });

  it('navigates to next product with wrap-around (last -> first)', async () => {
    const user = userEvent.setup();
    renderWithRouter('/toys/product-3');

    await user.click(screen.getByTestId('product-details-next'));

    expect(screen.getByTestId('location-display')).toHaveTextContent(
      '/toys/product-1',
    );
  });
});

