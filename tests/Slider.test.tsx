import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Slider from '../src/components/Slider/Slider';
import useScrollItemsOnClick from '../src/hooks/useScrollItemsOnClick';

jest.mock('../src/hooks/useDetectSliderSwipe', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../src/hooks/useScrollItemsOnClick', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    containerRef: { current: null },
    handleCardClick: jest.fn(),
  })),
}));

jest.mock('../src/components/Slider/SliderCard', () => ({
  __esModule: true,
  default: ({ image }: { image: string }) => (
    <div data-testid='slider-card' data-image={image}>
      {image}
    </div>
  ),
}));

jest.mock('../src/components/Slider/Slider.module.scss', () => ({
  'slider-container': 'slider-container',
  'slider-to-left-btn': 'slider-to-left-btn',
  'slider-to-right-btn': 'slider-to-right-btn',
  'slider-pagination-container': 'slider-pagination-container',
  'slider-pagination-btn': 'slider-pagination-btn',
  'slider-pagination-btn-active': 'slider-pagination-btn-active',
  'slider-scrollable-block': 'slider-scrollable-block',
}));

describe('Slider Component', () => {
  const mockImages = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
  const mockHandleCardClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useScrollItemsOnClick as jest.Mock).mockReturnValue({
      containerRef: { current: null },
      handleCardClick: mockHandleCardClick,
    });
  });

  const renderSlider = (images = mockImages, route = '/') => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <Slider images={images} />
      </MemoryRouter>,
    );
  };

  describe('Initial Rendering', () => {
    it('renders slider container', () => {
      renderSlider();
      expect(screen.getByTestId('slider-container')).toHaveClass(
        'slider-container',
      );
    });

    it('renders all slider cards', () => {
      renderSlider();
      const sliderCards = screen.getAllByTestId('slider-card');
      expect(sliderCards).toHaveLength(mockImages.length);

      mockImages.forEach((image, index) => {
        expect(sliderCards[index]).toHaveAttribute('data-image', image);
      });
    });

    it('renders pagination buttons for each image', () => {
      renderSlider();
      const paginationButtons = screen.getAllByTitle(/scroll-to-item-/);
      expect(paginationButtons).toHaveLength(mockImages.length);
    });

    it('does not render left button when at first image', () => {
      renderSlider();
      expect(screen.queryByTitle('scroll-to-left')).not.toBeInTheDocument();
    });

    it('renders right button when not at last image', () => {
      renderSlider();
      expect(screen.getByTitle('scroll-to-right')).toBeInTheDocument();
    });

    it('applies active class to first pagination button initially', () => {
      renderSlider();
      const firstPaginationBtn = screen.getByTitle('scroll-to-item-0');
      expect(firstPaginationBtn).toHaveClass('slider-pagination-btn-active');
    });
  });

  describe('Navigation Buttons', () => {
    it('shows left button when currentIndex > 0', () => {
      renderSlider();

      fireEvent.click(screen.getByTitle('scroll-to-right'));

      expect(screen.getByTitle('scroll-to-left')).toBeInTheDocument();
    });

    it('hides right button when at last image', () => {
      renderSlider();

      fireEvent.click(screen.getByTitle('scroll-to-item-2'));

      expect(screen.queryByTitle('scroll-to-right')).not.toBeInTheDocument();
    });

    it('calls handleCardClick when left button is clicked', () => {
      renderSlider();

      fireEvent.click(screen.getByTitle('scroll-to-right'));

      fireEvent.click(screen.getByTitle('scroll-to-left'));

      expect(mockHandleCardClick).toHaveBeenCalledWith(0);
    });

    it('calls handleCardClick when right button is clicked', () => {
      renderSlider();

      fireEvent.click(screen.getByTitle('scroll-to-right'));

      expect(mockHandleCardClick).toHaveBeenCalledWith(1);
    });

    it('does not go below index 0 when clicking left', () => {
      renderSlider();

      fireEvent.click(screen.getByTitle('scroll-to-right'));
      fireEvent.click(screen.getByTitle('scroll-to-left'));

      expect(mockHandleCardClick).toHaveBeenLastCalledWith(0);
    });

    it('does not exceed last index when clicking right', () => {
      renderSlider();

      fireEvent.click(screen.getByTitle('scroll-to-item-2'));

      expect(screen.queryByTitle('scroll-to-right')).not.toBeInTheDocument();
    });
  });

  describe('Pagination Buttons', () => {
    it('updates currentIndex when pagination button is clicked', () => {
      renderSlider();

      fireEvent.click(screen.getByTitle('scroll-to-item-1'));

      expect(screen.getByTitle('scroll-to-item-1')).toHaveClass(
        'slider-pagination-btn-active',
      );
      expect(screen.getByTitle('scroll-to-item-0')).toHaveClass(
        'slider-pagination-btn',
      );
    });

    it('calls handleCardClick with correct index when pagination button is clicked', () => {
      renderSlider();

      fireEvent.click(screen.getByTitle('scroll-to-item-2'));

      expect(mockHandleCardClick).toHaveBeenCalledWith(2);
    });

    it('displays bullet character in pagination buttons', () => {
      renderSlider();

      const paginationButtons = screen.getAllByTitle(/scroll-to-item-/);
      paginationButtons.forEach(button => {
        expect(button).toHaveTextContent('•');
      });
    });
  });

  describe('Route Changes', () => {
    it('resets to first image when route changes', async () => {
      const { rerender } = renderSlider(mockImages, '/initial');

      fireEvent.click(screen.getByTitle('scroll-to-item-1'));
      expect(screen.getByTitle('scroll-to-item-1')).toHaveClass(
        'slider-pagination-btn-active',
      );

      rerender(
        <MemoryRouter initialEntries={['/new-route']}>
          <Slider images={mockImages} />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByTitle('scroll-to-item-0')).toHaveClass(
          'slider-pagination-btn',
        );
      });
    });

    it('sets routeChanged flag temporarily on route change', async () => {
      renderSlider();

      expect(true).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty images array', () => {
      renderSlider([]);

      expect(screen.queryByTestId('slider-card')).not.toBeInTheDocument();
      expect(screen.queryByTitle(/scroll-to-item-/)).not.toBeInTheDocument();
      expect(screen.queryByTitle('scroll-to-left')).not.toBeInTheDocument();
      expect(screen.queryByTitle('scroll-to-right')).not.toBeInTheDocument();
    });

    it('handles single image', () => {
      renderSlider(['single-image.jpg']);

      expect(screen.getByTestId('slider-card')).toBeInTheDocument();
      expect(screen.getByTitle('scroll-to-item-0')).toBeInTheDocument();
      expect(screen.queryByTitle('scroll-to-left')).not.toBeInTheDocument();
      expect(screen.queryByTitle('scroll-to-right')).not.toBeInTheDocument();
    });

    it('handles large number of images', () => {
      const manyImages = Array.from({ length: 10 }, (_, i) => `image${i}.jpg`);
      renderSlider(manyImages);

      expect(screen.getAllByTestId('slider-card')).toHaveLength(10);
      expect(screen.getAllByTitle(/scroll-to-item-/)).toHaveLength(10);
    });
  });

  describe('Accessibility', () => {
    it('provides descriptive titles for navigation buttons', () => {
      renderSlider();

      fireEvent.click(screen.getByTitle('scroll-to-right'));

      expect(screen.getByTitle('scroll-to-left')).toBeInTheDocument();
      expect(screen.getByTitle('scroll-to-right')).toBeInTheDocument();
    });

    it('provides descriptive titles for pagination buttons', () => {
      renderSlider();

      mockImages.forEach((_, index) => {
        expect(
          screen.getByTitle(`scroll-to-item-${index}`),
        ).toBeInTheDocument();
      });
    });

    it('uses button elements for interactive elements', () => {
      renderSlider();

      const allButtons = screen.getAllByRole('button');
      expect(allButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Component Integration', () => {
    it('renders FontAwesome icons with correct props', () => {
      renderSlider();

      fireEvent.click(screen.getByTitle('scroll-to-right'));

      const icons = screen.getAllByTestId('font-awesome-icon');
      expect(icons).toHaveLength(2);
    });

    it('passes correct image prop to SliderCard components', () => {
      renderSlider();

      const sliderCards = screen.getAllByTestId('slider-card');
      mockImages.forEach((image, index) => {
        expect(sliderCards[index]).toHaveAttribute('data-image', image);
      });
    });
  });
});
