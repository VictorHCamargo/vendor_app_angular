import { FakePipe } from './fake-pipe';

describe('FakePipe', () => {
  it('create an instance', () => {
    const pipe = new FakePipe();
    expect(pipe).toBeTruthy();
  });
});
