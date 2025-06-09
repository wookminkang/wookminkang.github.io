import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "돌멩이떼굴떼굴",
  description: "A VitePress Site",  
  base: '/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '집', link: '/' },
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
        ],        
      },
      {
        text: '브라우저 저장소',
        items: [          
          {
            items: [
              { text: '로컬스토리지', link: '/pages/localStorage' },
              { text: '세션스토리지', link: '/pages/sessionStorage' },
              { text: '쿠키', link: '/pages/cookie' },
            ]
          }
        ],        
      },
      {
        text: 'CI/CD',
        items: [          
          {
            items: [
              { text: 'CI/CD', link: '/pages/ci-cd' },
              { text: 'AWS S3', link: '/pages/aws-s3' }
            ]
          }
        ],  
      }
    ],

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})
