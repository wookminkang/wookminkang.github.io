---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
---


<hr>
<br>
<h1 class="mw_h1">팀을 소개합니다.</h1>
<VPTeamMembers size="small" :members />


<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: '/images/team/user_01.png',
    name: '변민욱',
    title: 'Frontend Developer',
    desc: '🪨 돌멩이떼굴',
    org: '주인장',

    sponsor:'/pages/profile/user-01.html',
    actionText: 'Click!'
  },{
    avatar: '/images/team/user_02.png',
    name: '변지나',
    title: 'Product Designer',
    desc: '🐱 보키토리엄마'
  },{
    avatar: '/images/team/user_03.png',
    name: '변가희',
    title: 'Lead Frontend Developer',
    desc: '🐶 치와와견주'
  },{
    avatar: '/images/team/user_04.png',
    name: '변희진',
    title: 'DevOps Engineer',
    desc: '🥔 회오리감자'
  },
]
</script>
