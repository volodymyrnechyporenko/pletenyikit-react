import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SliderCard from '../../src/components/Slider/SliderCard';

jest.mock('../../src/components/Slider/Slider.module.scss', () => ({
  'slider-card': 'slider-card',
}));

describe('SliderCard', () => {
  it('renders an image with correct src from image prop', () => {
    const { container } = render(<SliderCard image='product.jpg' />);
    const img = container.querySelector('.slider-card img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/img/product.jpg');
  });

  it('renders image with empty alt', () => {
    const { container } = render(<SliderCard image='photo.png' />);
    const img = container.querySelector('.slider-card img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', '');
  });

  it('applies slider-card class to container', () => {
    const { container } = render(<SliderCard image='x.jpg' />);
    const wrapper = container.querySelector('.slider-card');
    expect(wrapper).toBeInTheDocument();
  });

  it('handles image name with path-like segment', () => {
    const { container } = render(<SliderCard image='folder/image.jpg' />);
    const img = container.querySelector('.slider-card img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/img/folder/image.jpg');
  });
});
