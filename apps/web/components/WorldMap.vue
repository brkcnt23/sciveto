<template>
  <ClientOnly>
    <div ref="chartContainer" class="w-full" :style="{ height: height + 'px' }">
      <VChart v-if="mounted" :option="chartOptions" autoresize @click="handleClick" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { GlobeComponent } from 'echarts-gl/components'
import { Scatter3DChart } from 'echarts-gl/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { TooltipComponent } from 'echarts/components'

use([CanvasRenderer, GlobeComponent, Scatter3DChart, TooltipComponent])

const height = 500
const mounted = ref(false)
const chartContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  mounted.value = true
})

function handleClick(params: any) {
  if (params?.data?.link) {
    window.open(params.data.link, '_blank')
  }
}

const chartOptions = {
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => {
      const { name, project, image, link } = params.data
      return `
        <div style="text-align: center;">
          <strong>${name}</strong><br/>
          <em>${project}</em><br/>
          <img src="${image}" alt="preview" style="width: 160px; height: auto; margin-top: 5px; border-radius: 6px;" /><br/>
          <a href="${link}" target="_blank" style="color: #007bff; text-decoration: underline;">Projeyi Gör</a>
        </div>
      `
    }
  },
  globe: {
    baseTexture: '/texture/world.topo.bathy.200401.jpg',
    heightTexture: '/texture/bathymetry_bw_composite_4k.jpg',
    shading: 'lambert',
    light: {
      ambient: { intensity: 0.6 },
      main: { intensity: 0.8 }
    },
    viewControl: {
      autoRotate: false,
      rotateSensitivity: 2,
      zoomSensitivity: 1.5
    }
  },
  series: [
    {
      type: 'scatter3D',
      coordinateSystem: 'globe',
      symbolSize: 15,
      itemStyle: {
        color: '#FFA500' // doğal turuncu (portakal)
      },
      data: [
        {
          name: 'İstanbul',
          value: [28.9784, 41.0082],
          project: 'Kemerburgaz Dome',
          link: 'https://www.asma-germe.com/tr/projeler/mersin-stadyumu',
          image: '/projects/project1.jpg'
        },
        {
          name: 'Paris',
          value: [2.3522, 48.8566],
          project: 'Louvre Extension',
          link: 'https://site.com/paris',
          image: '/projects/project2.png'
        }
      ]
    }
  ]
}
</script>
