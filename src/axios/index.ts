import axios, {AxiosInstance} from 'axios'

export class GitlabApi {
  public httpCliente: AxiosInstance
  private millis: number = 1000
  constructor(){
    this.httpCliente = axios.create({
      baseURL: 'https://gitlab.com/api/v4',
      timeout: 15*this.millis
    })
  }
}