import type { ModuleConfig } from './../types'


export default async () => {
  const config: ModuleConfig[] = []
  let defaultRoute: ModuleConfig[] = []

  try {
    const list = import.meta.glob('../../modules/**/config.ts')

    for (const path in list) {
      await list[path]()
        .then((moduleConfig) => {
          const module = moduleConfig as { default: ModuleConfig }
          if (module?.default?.enabled) {
            module.default.path = path
            config.push(module.default)
          }
        })
        .catch((error) => {
        })
    }

    if (!config.length) {
      throw Error('\nNo modules enabled')
    }
    defaultRoute = config.filter((module) => module.defaultRoute)
    if (defaultRoute.length > 1) {
      throw Error('\nOnly one default route is allowed')
    }
  } catch (error) {
    throw Error(`\nSetup modules: ${getErrorMessage(error)}`)
  }
  return { config, defaultRoute: defaultRoute[0]?.defaultRoute }
}
