


export class TodoService {
    private httpClient = new HttpClient();


    async getTodoItems() {
        const { data } = await this.httpClient.get('https://jsonplaceholder.typicode.com/todos/');
        return data;
    }
    
}


export class PostService {
    private httpClient = new HttpClient();
    async getPosts() {
        const { data } = await this.httpClient.get('https://jsonplaceholder.typicode.com/posts');
        return data;
    }
}


export class PhotosService {
    private httpClient = new HttpClient();
    async getPhotos() {
        const { data } = await  this.httpClient.get('https://jsonplaceholder.typicode.com/photos');
        return data;
    }

}

export class HttpClient {

    async get(url: string) {
        const resp = await fetch(url)
        const data = resp.json();
        return { data: data, status: 500 }
    }
}