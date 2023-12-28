import { SortByPriceDescPipe } from './sort-by-price-desc.pipe';

describe('SortByPriceDescPipe', () => {
  it('create an instance', () => {
    const pipe = new SortByPriceDescPipe();
    expect(pipe).toBeTruthy();
  });
});
