// https://developer.chrome.com/docs/extensions/mv3/manifest/
// https://www.bookstack.cn/read/chrome-plugin-develop/spilt.1.spilt.4.8bdb1aac68bbdc44.md

export type ConfigIconSize = '16' | '24' | '32' | '48' | '128' | string
export interface ConfigIcons {
  [size: ConfigIconSize]: string
}

export interface ConfigRequired {
  manifest_version?: 3 | number // 清单文件的版本 这里是3的配置
  name: string // 插件的名称
  version?: string // 插件的版本
}

export interface ConfigRecommendedAction {
  default_icon?: ConfigIcons
  default_title?: string // 图标悬停时的标题，可选
  default_popup?: 'popup.html' | string
}

export interface ConfigRecommended {
  default_locale?: 'en' | 'zh_CN' | string // 默认语言
  description?: string // 插件描述
  icons?: ConfigIcons // 图标，一般偷懒全部用一个尺寸的也没问题
  action?: ConfigRecommendedAction
}
export interface ConfigOptionalBackground {
  // Required
  service_worker: 'background.js' | string
  // Optional
  type?: 'module' | string
  persistent?: boolean
}

export interface ConfigChromeSettingsOverridesSearchProvider {
  name?: string // eg: 'name.__MSG_url_domain__'
  keyword?: string // eg: 'keyword.__MSG_url_domain__'
  search_url: string // eg: 'https://www.foo.__MSG_url_domain__/s?q={searchTerms}'
  favicon_url?: string // eg: 'https://www.foo.__MSG_url_domain__/favicon.ico'
  suggest_url?: string // eg:  'https://www.foo.__MSG_url_domain__/suggest?q={searchTerms}'
  instant_url?: string // eg: 'https://www.foo.__MSG_url_domain__/instant?q={searchTerms}'
  image_url?: string // eg: 'https://www.foo.__MSG_url_domain__/image?q={searchTerms}'
  search_url_post_params?: string // eg: 'search_lang=__MSG_url_domain__'
  suggest_url_post_params?: string // eg: 'suggest_lang=__MSG_url_domain__'
  instant_url_post_params?: string // eg: 'instant_lang=__MSG_url_domain__'
  image_url_post_params?: string // eg: 'image_lang=__MSG_url_domain__'
  alternate_urls?: string[]
  encoding?: 'UTF-8' | string
  is_default: boolean
}

export interface ConfigChromeSettingsOverrides {
  homepage?: string
  search_provider?: ConfigChromeSettingsOverridesSearchProvider
  startup_pages?: string[]
}

export interface ConfigOptionalChromeUrlOverrides {
  newtab?: string //eg: "newtab.html"
  history?: string //eg: "history.html"
}

export interface ConfigOptionalCommandsInfo {
  suggested_key: {
    default: string //
    mac?: string
    windows?: string
    chromeos?: string
    linux?: string
  }
  description: string
}

export interface ConfigOptionalCommands {
  [commandKey: string]: ConfigOptionalCommandsInfo
}

// https://developer.chrome.com/docs/extensions/mv3/content_scripts/
export interface ConfigOptionalContentScript {
  matches: ['<all_urls>'] | string[] // ["http://*/*", "https://*/*"] // 表示匹配所有地址
  js: ['content.js'] | string[] //  ["content.js"] // 多个JS按顺序注入
  css?: string[] //  ["content.css"] // JS的注入可以随便一点，但是CSS的注意就要千万小心了，因为一不小心就可能影响全局样式
  all_frames?: boolean
  match_about_blank?: boolean
  match_origin_as_fallback?: boolean
  run_at?: 'document_idle' | 'document_start' | 'document_end'
  exclude_matches?: string[]
  include_globs?: string[]
  exclude_globs?: string[]
}

export interface ConfigOptionalContentSecurityPolicy {
  extension_pages: string
  sandbox: 'self' | 'none' | string
}

export interface ConfigOptionalCrossOriginPolicy {
  value: 'require-corp' | 'same-origin'
}

export interface ConfigOptionalEventRuleAction {
  type: string // "declarativeContent.ShowPageAction"
}

export interface ConfigOptionalEventRuleCondition {
  type: string // "declarativeContent.ShowPageAction"
  css: string[] // ["video"]
}

export interface ConfigOptionalEventRule {
  event: string // eg: "declarativeContent.onPageChanged"
  actions: ConfigOptionalEventRuleAction[]
  conditions: ConfigOptionalEventRuleCondition[]
}

// https://developer.chrome.com/docs/extensions/mv3/manifest/externally_connectable/
export interface ConfigOptionalExternallyConnectable {
  ids?: string[]
  matches?: string[]
  accepts_tls_channel_id?: boolean
}

// https://developer.chrome.com/docs/extensions/reference/fileBrowserHandler/
export interface ConfigOptionalFileBrowserHandler {
  id: string
  default_title: string
  file_filters: string[]
}

export interface ConfigOptionalFileSystemProviderCapabilities {
  configurable?: boolean
  multiple_mounts?: boolean
  watchable?: boolean
  source: 'network' | 'device' | 'file'
}

// https://developer.chrome.com/docs/extensions/mv2/declare_permissions/#manifest
// https://developer.chrome.com/docs/extensions/mv2/permission_warnings/
export type Permission =
  | '*://*/*'
  | '<all_urls>'
  | 'activeTab'
  | 'alarms'
  | 'bookmarks'
  | 'clipboardRead'
  | 'clipboardWrite'
  | 'contentSettings'
  | 'contextMenus' // 右键菜单
  | 'debugger'
  | 'declarativeNetRequest'
  | 'devtools'
  | 'desktopCapture'
  | 'downloads'
  | 'experimental'
  | 'geolocation'
  | 'history'
  | 'mdns'
  | 'management'
  | 'nativeMessaging'
  | 'notifications' // 通知
  | 'pageCapture'
  | 'privacy'
  | 'proxy'
  | 'system.storage'
  | 'storage' // 插件本地存储
  | 'tabCapture'
  | 'tabs' // 标签
  | 'topSites'
  | 'tts'
  | 'ttsEngine'
  | 'wallpaper'
  | 'webNavigation'
  | 'webRequest' // web请求
  | 'webRequestBlocking' //
  | string

export interface ConfigPermission {
  permissions?: Permission[]
  host_permissions?: Permission[]
  optional_permissions?: Permission[]
  optional_host_permissions?: Permission[]
}

// https://developer.chrome.com/docs/extensions/mv3/manifest/nacl_modules/
export interface ConfigOptionalNaclModule {
  path: string
  mime_type: string
}
// https://developer.chrome.com/docs/extensions/reference/omnibox/
export interface ConfigOptionalOmnibox {
  keyword: string
}

export interface ConfigOptionalOptionsUi {
  page: 'options.html' | string
  open_in_tab?: boolean
  chrome_style?: boolean
}

export interface ConfigOptionalSandbox {
  pages: string[]
  content_security_policy?:
    | "sandbox allow-scripts allow-forms allow-popups allow-modals; script-src 'self' 'unsafe-inline' 'unsafe-eval'; child-src 'self';"
    | "sandbox allow-scripts; script-src 'self'"
    | string
}

// https://developer.chrome.com/docs/extensions/mv3/manifest/storage/
export interface ConfigOptionalStorage {
  managed_schema: 'schema.json' | string
}

// https://developer.chrome.com/docs/extensions/reference/ttsEngine/
//  text-to-speech

export type ConfigOptionalTtsEngineVoiceEventTypes =
  | 'start'
  | 'word'
  | 'sentence'
  | 'error'
  | 'marker'
  | 'end'
  | string
export interface ConfigOptionalTtsEngineVoice {
  voice_name: string
  lang: 'en-US' | string
  event_types: ConfigOptionalTtsEngineVoiceEventTypes[]
}
export interface ConfigOptionalTtsEngine {
  voices: ConfigOptionalTtsEngineVoice[]
}

// https://developer.chrome.com/docs/extensions/mv3/manifest/web_accessible_resources/
export interface ConfigOptionalWebAccessibleResource {
  resources: string[]
  matches: string[]
  use_dynamic_url?: boolean
  extension_ids?: string[]
}

export interface ConfigOptional {
  author?: string

  background?: ConfigOptionalBackground // 会一直常驻的后台JS或后台页面
  chrome_settings_overrides?: ConfigChromeSettingsOverrides
  chrome_url_overrides?: ConfigOptionalChromeUrlOverrides // 覆盖浏览器默认页面
  commands?: ConfigOptionalCommands

  content_scripts?: ConfigOptionalContentScript[] // 需要直接注入页面的JS
  content_security_policy?: ConfigOptionalContentSecurityPolicy

  cross_origin_embedder_policy?: ConfigOptionalCrossOriginPolicy
  cross_origin_opener_policy?: ConfigOptionalCrossOriginPolicy

  devtools_page?: 'devtools.html' | string // devtools页面入口，注意只能指向一个HTML文件，不能是JS文件

  event_rules?: ConfigOptionalEventRule[]
  externally_connectable?: ConfigOptionalExternallyConnectable
  file_browser_handlers?: ConfigOptionalFileBrowserHandler[]
  file_system_provider_capabilities?: ConfigOptionalFileSystemProviderCapabilities
  homepage_url?: string // 'https://path/to/homepage', // 插件主页，这个很重要，不要浪费了这个免费广告位

  incognito?: 'spanning' | 'split' | 'not_allowed'

  key?: string
  minimum_chrome_version?: string
  nacl_modules?: ConfigOptionalNaclModule[]

  offline_enabled?: boolean
  omnibox?: ConfigOptionalOmnibox // 向地址栏注册一个关键字以提供搜索建议，只能设置一个关键字
  options_page?: 'options.html' | string // Chrome40以前的插件配置页写法
  options_ui?: ConfigOptionalOptionsUi // Chrome40以后的插件配置页写法，如果2个都写，新版Chrome只认后面这一个

  requirements?: any // https://developer.chrome.com/docs/extensions/mv3/manifest/requirements/
  sandbox?: ConfigOptionalSandbox
  short_name?: string
  storage?: ConfigOptionalStorage
  system_indicator?: string
  tts_engine?: ConfigOptionalTtsEngine
  update_url?: string
  version_name?: string
  web_accessible_resources?: ConfigOptionalWebAccessibleResource[] // 普通页面能够直接访问的插件资源列表，如果不设置是无法直接访问的

  // 还没有弄懂用来干嘛的
  content_capabilities?: string
  converted_from_user_script?: string
  current_locale?: string
  declarative_net_request?: string
  differential_fingerprint?: string
  input_components?: string
  natively_connectable?: string
  oauth2?: string
  platforms?: string
  replacement_web_app?: string
  // automation: {}
  // import: [{ id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' }]
}

export interface ManifestConfig3
  extends ConfigRequired,
    ConfigRecommended,
    ConfigOptional,
    ConfigPermission {}

export const getConfigRequired = ({
  name,
  version = '0.0.0'
}: ConfigRequired) => {
  return {
    manifest_version: 3,
    name,
    version
  }
}

export const getConfigOptionalBackground = (
  backgroundConfig?: ConfigOptionalBackground
) => {
  const { service_worker = 'background.js', type } = backgroundConfig || {}
  return {
    service_worker,
    type
  }
}

export const getManifestConfig = (config: ManifestConfig3): ManifestConfig3 => {
  return {
    ...getConfigRequired(config),
    background: getConfigOptionalBackground(config.background),
    ...config
  }
}
