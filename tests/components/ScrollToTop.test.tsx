import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScrollToTop from '../../src/components/ScrollToTop/ScrollToTop';
import useArrowToScrollToTop from '../../src/hooks/useArrowToScrollToTop';

jest.mock('../../src/hooks/useArrowToScrollToTop');
jest.mock('../../src/components/ScrollToTop/ScrollToTop.module.scss', () => ({
  'scroll-to-top': 'scroll-to-top',
}));

const mockScrollTop = jest.fn();

describe('ScrollToTop', () => {
  beforeEach(() => {
    jest.mocked(useArrowToScrollToTop).mockReturnValue({
      isVisible: false,
      scrollTop: mockScrollTop,
    });
  });

  it('hides button when isVisible is false', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button', {
      name: 'Прокрутити вгору',
      hidden: true,
    });
    expect(button.parentElement).toHaveStyle({ display: 'none' });
  });

  it('shows button when isVisible is true', () => {
    jest.mocked(useArrowToScrollToTop).mockReturnValue({
      isVisible: true,
      scrollTop: mockScrollTop,
    });
    render(<ScrollToTop />);
    const wrapper = screen.getByRole('button', {
      name: 'Прокрутити вгору',
    }).parentElement;
    expect(wrapper).toHaveStyle({ display: 'block' });
  });

  it('calls scrollTop when button is clicked', () => {
    jest.mocked(useArrowToScrollToTop).mockReturnValue({
      isVisible: true,
      scrollTop: mockScrollTop,
    });
    render(<ScrollToTop />);
    fireEvent.click(screen.getByRole('button', { name: 'Прокрутити вгору' }));
    expect(mockScrollTop).toHaveBeenCalledTimes(1);
  });

  it('renders button with accessible label', () => {
    jest.mocked(useArrowToScrollToTop).mockReturnValue({
      isVisible: true,
      scrollTop: mockScrollTop,
    });
    render(<ScrollToTop />);
    expect(
      screen.getByRole('button', { name: 'Прокрутити вгору' }),
    ).toBeInTheDocument();
  });
});
