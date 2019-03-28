import { NumberToStringPipe } from './number-to-string.pipe';

describe('NumberToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberToStringPipe();
    expect(pipe).toBeTruthy();
  });
});
