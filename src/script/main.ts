import { GitlabApi } from '../axios'
import { AxiosPromise } from 'axios'

export class GitlabApiMethods {
  private readonly baseGitlabApi: GitlabApi
  private AUTH_TOKEN: string = "glpat-_yuHfmTVk5pTYGoVtAWM"
  constructor(){
    this.baseGitlabApi = new GitlabApi()
  }

  public async findSubGroups(parentGroup: string | number){
    const response = await this.baseGitlabApi.httpCliente.get(`/groups/${parentGroup}/subgroups`,{
      headers:{
        'authorization': `Bearer ${this.AUTH_TOKEN}`,
        "PRIVATE-TOKEN": `${this.AUTH_TOKEN}`
      }
    })
    return response
  }

  public async searchByGroupId(groupId: number | string): Promise<AxiosPromise>{
    const response = await this.baseGitlabApi.httpCliente.get(`/groups/${groupId}`,{
      headers:{
        'authorization': `Bearer ${this.AUTH_TOKEN}`,
        "PRIVATE-TOKEN": `${this.AUTH_TOKEN}`
      }
    })
    return response
  }

  public async searchInProjectByFilter(projectId: number | string,filter: any): Promise<AxiosPromise>{
    const response = await this.baseGitlabApi.httpCliente.get(`/projects/${projectId}/search?${filter}`,{
      headers:{
        'authorization': `Bearer ${this.AUTH_TOKEN}`,
        "PRIVATE-TOKEN":`${this.AUTH_TOKEN}`
      }
    })
    return response
  }

  public async consultTotalReposiriesInSubGroup(subgroupId: number | string){
    const response = await this.baseGitlabApi.httpCliente.get(`/projects/groups/${subgroupId}`,{
      headers:{
        'authorization': `Bearer ${this.AUTH_TOKEN}`,
        "PRIVATE-TOKEN": `${this.AUTH_TOKEN}`
      }
    })
    return response
  }
}