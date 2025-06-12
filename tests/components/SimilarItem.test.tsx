import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SimilarItem } from '../../src/interfaces/interfaces';
import ItemComponent from '../../src/components/SimilarItem/SimilarItem';

describe('ItemComponent', () => {
  const mockItem: SimilarItem = {
    price: 29.99,
    img: 'test-product.jpg',
    link: 'https://example.com/product/123',
  };

  beforeEach(() => {
    render(<ItemComponent item={mockItem} />);
  });

  describe('Rendering', () => {
    it('renders the product container', () => {
      const container = screen.getByTestId('product-container');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('product');
    });

    it('renders the product price', () => {
      const priceElement = screen.getByTestId('product-price');
      expect(priceElement).toBeInTheDocument();
      expect(priceElement).toHaveClass('product-price');
      expect(priceElement).toHaveTextContent('29.99');
    });

    it('renders the product image', () => {
      const imageElement = screen.getByTestId('product-image');
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveClass('product-image');
    });
  });

  describe('Image attributes', () => {
    it('sets the correct image source path', () => {
      const imageElement = screen.getByTestId('product-image');
      expect(imageElement).toHaveAttribute('src', '/img/test-product.jpg');
    });

    it('sets lazy loading attribute', () => {
      const imageElement = screen.getByTestId('product-image');
      expect(imageElement).toHaveAttribute('loading', 'lazy');
    });

    it('has empty alt attribute', () => {
      const imageElement = screen.getByTestId('product-image');
      expect(imageElement).toHaveAttribute('alt', '');
    });
  });

  describe('Price formatting', () => {
    it('displays integer prices correctly', () => {
      const itemWithIntegerPrice: SimilarItem = {
        price: 50,
        img: 'product.jpg',
        link: 'https://example.com',
      };

      render(<ItemComponent item={itemWithIntegerPrice} />);
      const priceElement = screen.getAllByTestId('product-price')[1];
      expect(priceElement).toHaveTextContent('50');
    });

    it('displays decimal prices correctly', () => {
      const itemWithDecimalPrice: SimilarItem = {
        price: 19.95,
        img: 'product.jpg',
        link: 'https://example.com',
      };

      render(<ItemComponent item={itemWithDecimalPrice} />);
      const priceElement = screen.getAllByTestId('product-price')[1];
      expect(priceElement).toHaveTextContent('19.95');
    });

    it('displays zero price correctly', () => {
      const itemWithZeroPrice: SimilarItem = {
        price: 0,
        img: 'product.jpg',
        link: 'https://example.com',
      };

      render(<ItemComponent item={itemWithZeroPrice} />);
      const priceElement = screen.getAllByTestId('product-price')[1];
      expect(priceElement).toHaveTextContent('0');
    });
  });

  describe('Image path construction', () => {
    it('constructs correct image path with different file extensions', () => {
      const testCases = [
        { img: 'product.png', expected: '/img/product.png' },
        { img: 'item.webp', expected: '/img/item.webp' },
        { img: 'photo.gif', expected: '/img/photo.gif' },
      ];

      testCases.forEach(({ img, expected }) => {
        const testItem: SimilarItem = {
          price: 10,
          img,
          link: 'https://example.com',
        };

        render(<ItemComponent item={testItem} />);
        const images = screen.getAllByTestId('product-image');
        const currentImage = images[images.length - 1];
        expect(currentImage).toHaveAttribute('src', expected);
      });
    });

    it('handles image names with special characters', () => {
      const itemWithSpecialChars: SimilarItem = {
        price: 25,
        img: 'product-name_with-special123.jpg',
        link: 'https://example.com',
      };

      render(<ItemComponent item={itemWithSpecialChars} />);
      const images = screen.getAllByTestId('product-image');
      const currentImage = images[images.length - 1];
      expect(currentImage).toHaveAttribute(
        'src',
        '/img/product-name_with-special123.jpg',
      );
    });
  });

  describe('Props validation', () => {
    it('handles all required props correctly', () => {
      const completeItem: SimilarItem = {
        price: 99.99,
        img: 'complete-product.jpg',
        link: 'https://example.com/complete',
      };

      render(<ItemComponent item={completeItem} />);

      expect(screen.getAllByTestId('product-container')[1]).toBeInTheDocument();
      expect(screen.getAllByTestId('product-price')[1]).toHaveTextContent(
        '99.99',
      );
      expect(screen.getAllByTestId('product-image')[1]).toHaveAttribute(
        'src',
        '/img/complete-product.jpg',
      );
    });
  });

  describe('Component structure', () => {
    it('maintains correct DOM structure', () => {
      const container = screen.getByTestId('product-container');
      const price = screen.getByTestId('product-price');
      const image = screen.getByTestId('product-image');

      expect(container).toContainElement(price);
      expect(container).toContainElement(image);
    });
  });
});
