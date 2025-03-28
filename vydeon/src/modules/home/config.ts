import type { ModuleConfig } from '../../base/types'
import routes from './routes'

const config: ModuleConfig = {
  enabled: true,
  name: 'Home',
  routes: routes,
  defaultRoute: '/',
}

export default config
