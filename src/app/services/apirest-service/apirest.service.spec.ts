import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApirestService } from './apirest.service';

describe('ApirestService', () => {
  let service: ApirestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApirestService]
    });
    service = TestBed.inject(ApirestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get posts', () => {
    const dummyPosts = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];

    service.getPosts().subscribe((posts) => {
      expect(posts).toEqual(dummyPosts);
    });

    const req = httpMock.expectOne(service.apiUrl + '/posts/');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });

  it('should get a post by id', () => {
    const dummyPost = { id: 1, title: 'Post 1' };
    const postId = 1;

    service.getPost(postId).subscribe((post) => {
      expect(post).toEqual(dummyPost);
    });

    const req = httpMock.expectOne(service.apiUrl + '/posts/' + postId);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPost);
  });

  it('should create a post', () => {
    const dummyPost = { title: 'New Post' };

    service.createPost(dummyPost).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(service.apiUrl + '/posts');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyPost);
    req.flush({});
  });

  it('should update a post', () => {
    const dummyPost = { id: 1, title: 'Updated Post' };
    const postId = 1;

    service.updatePost(postId, dummyPost).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(service.apiUrl + '/posts/' + postId);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(dummyPost);
    req.flush({});
  });

  it('should delete a post', () => {
    const postId = 1;

    service.deletePost(postId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(service.apiUrl + '/posts/' + postId);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
