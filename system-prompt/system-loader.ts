import fs from 'fs'
import path from 'path'

export function loadSystemPrompt(): string {
  const dir = path.join(__dirname)
  const files = [
    'core.xml',
    'tech_stack.xml',
    'dev_environment.xml',
    'ai_integration.xml',
    'developer_profiles.xml',
    'security.xml',
    'version.xml'
  ]
  return files.map(file => fs.readFileSync(path.join(dir, file), 'utf-8')).join('\n')
}
