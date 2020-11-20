const heroku = 'https://api-contacts1.herokuapp.com'
const local = 'http://localhost:9000'

export const baseUrl: string = heroku;

const url: string = `${baseUrl}/v1`;

export const api = {
  signup: `${url}/signup`,
  signin: `${url}/signin`,
  session: `${url}/session`,
  categories: `${url}/categories`,
  groups: {
    create: `${url}/admin/groups`,
    findAll: `${url}/admin/groups`,
    findOne: (id: string) => `${url}/admin/groups/${id}`,
    delete: (id: string) => `${url}/admin/groups/${id}`,
    update: (id: string) => `${url}/admin/groups/${id}`
  }
}
