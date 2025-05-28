---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
# hero:
#   name: "mwkang blog"
#   text: "내 닉네음은 돌멩이떼굴 🪨"
#   tagline: 끄적... 끄적
#   # actions:
#   #   - theme: brand
#   #     text: Markdown Examples
#   #     link: /markdown-examples
#   #   - theme: alt
#   #     text: API Examples
#   #     link: /api-examples


# # features:
# #   - title: Feature A
# #     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
# #   - title: Feature B
# #     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
# #   - title: Feature C
# #     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---


<h1 class="mw_h1">팀을 소개합니다.</h1>
<VPTeamMembers size="small" :members />

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: '/images/team/user_01.png',
    name: '변민욱',
    title: 'Frontend Developer',
    desc: '돌멩이떼굴'
  },{
    avatar: '/images/team/user_02.png',
    name: '변지나',
    title: 'Product Designer',
    desc: '보키토리엄마'
  },{
    avatar: '/images/team/user_03.png',
    name: '변가희',
    title: 'Lead Frontend Developer',
    desc: '인생은가성비'
  },{
    avatar: '/images/team/user_04.png',
    name: '변희진',
    title: 'DevOps Engineer',
    desc: '회오리감자'
  },
]
</script>
