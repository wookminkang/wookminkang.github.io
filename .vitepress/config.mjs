import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "mwkang blog",
  description: "A VitePress Site",  
  base: '/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '돌멩이집', link: '/' },
      { text: '눌러봐', link: '/pages/crp' }
    ],

    sidebar: [
      {
        text: '브라우저 랜더링',
        items: [          
          {
            items: [
              { text: '브라우저 렌더링 과정', link: '/pages/crp' },
              { text: '브라우저 렌더링 연계', link: '/pages/crp-2' },
              { text: 'CSR vs SSR', link: '/pages/crp-3' },
            ]
          }
        ]
      }
    ],

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})
