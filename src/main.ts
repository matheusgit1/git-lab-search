import { FindInGitlab } from './script'

const bootstrap = async () => {
  const search_by = 'sns'
  const findInGitlab = new FindInGitlab()
  await findInGitlab.consultSubGroups(7496492)
  await findInGitlab.consultAllProjectInGroup(findInGitlab.subgroupsIds, search_by)
  console.log(`referencias a ${search_by} encontrada em ${findInGitlab.targetRepos.length} grupos`)
  console.log(`referencias a ${search_by} encontrada em ${findInGitlab.references} em um  total de ${findInGitlab.totalRepositories} repositorios`)
}

bootstrap()
