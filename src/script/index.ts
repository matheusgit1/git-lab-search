import { GitlabApiMethods } from './main'

interface targetRepos{
  id: number | string
  name: string
  path_with_namespace: string
  web_url: string
}

interface subgrupsFormat{
  id: number | string,
  web_url: string
  name: string
}

// let targetRepos: Array<targetRepos> = []

export class FindInGitlab {
  subgroups: Array<subgrupsFormat> = []
  subgroupsIds: Array<string | number> = []
  private gitlabMethods: GitlabApiMethods
  targetRepos: Array<targetRepos[]> = []
  references: number = 0
  totalRepositories: number = 0

  public constructor(){
    this.gitlabMethods = new GitlabApiMethods()
  }

  public async consultSubGroups(parentGroup: number | string){
    
    try{
      const response = await this.gitlabMethods.findSubGroups(parentGroup)
      console.log("[consultSubGroups] subgrupos encontrados: ")
      for(const index in response.data){
        this.subgroups.push(response.data[index])
        this.subgroupsIds.push(response.data[index].id)
      }
      for(const index in this.subgroups){
        console.log("[subGroup] ", this.subgroups[index].name)
      }
      console.log("\n\n")
    }catch(error: any){
      console.log("[consultSubGroups] devolveu um erro: ",error)
    }

    // try{
    //   await this.findTotalRepostories()
    // }catch(error: any){
    //   console.log("[findTotalRepostories] devolveu um erro: ",error)
    // }
  }

  public async consultAllProjectInGroup(groupId: Array<string | number>, search: string){
    
    try{
      for(const position in groupId){
        const consult = await this.gitlabMethods.searchByGroupId(groupId[position])
        this.totalRepositories += consult.data?.projects.length
        console.log(`[consultAllProjectInGroup] - buscando por ${search} em ${consult.data.name || ''} - group_id: ${groupId[position]}`)
        for (const index in consult.data.projects){
          const res = await this.consultInAllProjectsOfGroup(consult.data.projects[index].id, consult.data.projects[index].name, search)
          if(res){
            this.targetRepos[position] = []
            this.targetRepos[position].push({
              id: consult.data.projects[index].id,
              name: consult.data.projects[index].name,
              path_with_namespace: consult.data.projects[index].path_with_namespace,
              web_url: consult.data.projects[index].web_url
            })
            this.references = this.references+1
          }
        }
        console.log("\n")
        // this.targetRepos.map((values,index)=>{
        //   console.log(values)
        // })
      }

    }catch(error: any){
      console.log("[consultAllProjectInGroup] devolveu um erro: ",error)
    }
  }

  public async consultInAllProjectsOfGroup(projectId: number | string, projectName: string, search: string){
    try{
      const consult = await new GitlabApiMethods().searchInProjectByFilter(projectId,`scope=blobs&search=${search}`)
      if(consult.data.length === 0){return false}
      console.log('[consultInAllProjectsOfGroup] projectName - ', projectName, "\tprojec id: ", projectId)
      // for(const index in consult.data){
      //   console.log("[consultInAllProjectsOfGroup] projectFile with reference - ", consult.data[index].basename, " start at line: ", consult.data[index].startline)
      // }
      // console.log("\n")
      return true
    }catch(error: any){
      console.log("[consultInAllProjectsOfGroup] devolveu um erro: ",error)
    }
  }



  public async findTotalRepostories(){
    try{
      for(const index in this.subgroupsIds){
        const response = await this.gitlabMethods.consultTotalReposiriesInSubGroup(this.subgroupsIds[index])
        this.totalRepositories += response.data.projects.length
      }
    }catch(error: any){
      console.log("[findTotalRepostories] devolveu um erro: ",error)
    }
  }
}