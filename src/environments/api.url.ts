const heroku = 'https://api-contacts1.herokuapp.com'
const local = 'http://localhost:9000'

export const baseUrl: string = heroku;

const url: string = `${baseUrl}/v1`;

export const api = {
  signup: `${url}/signup`,
  signin: `${url}/signin`,
  contacts: {
    create: `${url}/admin/contacts`,
    findAll: `${url}/admin/contacts`,
    findOne: (id: string) => `${url}/admin/contacts/${id}`,
    delete: (id: string) => `${url}/admin/contacts/${id}`,
    update: (id: string) => `${url}/admin/contacts/${id}`
  }
}
