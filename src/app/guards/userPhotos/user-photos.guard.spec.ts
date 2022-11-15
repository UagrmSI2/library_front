import { TestBed } from '@angular/core/testing';

import { UserPhotosGuard } from './user-photos.guard';

describe('UserPhotosGuard', () => {
  let guard: UserPhotosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserPhotosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
