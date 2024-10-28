module.exports = {
  apps: [
    {
      name: 'onebet-staging',
      script: 'node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      node_args: ['--max-semi-space-size=256', '--max-old-space-size=1024'],
      exec_mode: 'cluster',
      instances: '1',
      merge_logs: true,
      max_memory_restart: '400M',
      env: {
        PORT: 3000,
        HOST: '0.0.0.0',
        NODE_ENV: 'staging'
      },
      ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no']
    },
    {
      name: 'onebet-production',
      script: 'node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      node_args: ['--max-semi-space-size=256', '--max-old-space-size=1024'],
      exec_mode: 'cluster',
      instances: 'max',
      merge_logs: true,
      max_memory_restart: '500M',
      env: {
        PORT: 3001,
        HOST: '0.0.0.0',
        NODE_ENV: 'production'
      },
      ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no']
    }
  ],
  deploy: {
    staging: {
      user: 'tangquan',
      host: '3.78.255.79',
      ref: 'origin/develop',
      repo: 'git@codeup.aliyun.com:eagle_mobi/project-admin/Nuxt2-onebet.git',
      path: '/data/www/onebet-ssr',
      // 初始化安装之前
      'pre-setup': 'rm -rf /data/www/onebet-ssr',
      // 初始化安装之后
      'post-setup':
        "git pull && yarn && yarn build:staging && git add . && git commit -m 'build:staging' && git push",
      // "git pull && yarn && yarn build && git add . && git commit -m 'build' && git push",
      // 更新/部署之前
      'pre-deploy': 'git pull',
      // 更新/部署之后
      'post-deploy':
        "yarn && yarn build:staging && git add . && git commit -m 'build:staging' && git push"
      // "yarn && yarn build && git add . && git commit -m 'build' && git push"
    },
    production: {
      user: 'tangquan',
      host: '3.78.255.79',
      ref: 'origin/main',
      repo: 'git@codeup.aliyun.com:eagle_mobi/project-admin/Nuxt2-onebet.git',
      path: '/data/www/onebet-ssr-pro',
      'pre-setup': 'rm -rf /data/www/onebet-ssr-pro',
      'post-setup':
        "git pull && yarn && yarn build && git add . && git commit -m 'build:prod' && git push",
      'pre-deploy': 'git pull',
      'post-deploy':
        "yarn && yarn build && git add . && git commit -m 'build:prod' && git push"
    }
  }
}
