class Api {
    static headers() {
      return {
        'Content-Type': 'application/json',
        
      };
    }
  
    static get(route) {
      return this.xhr(route, null, 'GET');
    }
  
    static put(route, params) {
      return this.xhr(route, params, 'PUT');
    }
  
    static post(route, params) {
      return this.xhr(route, params, 'POST');
    }
  
    static delete(route, params) {
      return this.xhr(route, params, 'DELETE');
    }
  
    static xhr(route, params, verb) {
      const host = 'http://146.20.3.64:8080/pall_itv/';
      //const host = 'http://172.20.20.105:8080/'
      const url = `${host}${route}`;
      const options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null);
      options.headers = Api.headers();
      return fetch(url, options).then(resp => {
        const json = resp.json();
        if (resp.ok) {
          return json;
        }
        return json.then(err => { throw err; });
      }).then(json => json);
    }
  }
  export default Api;
