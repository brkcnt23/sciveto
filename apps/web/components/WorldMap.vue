<template>
  <ClientOnly>
    <div 
      ref="chartContainer" 
      :name="name"
      class="w-full h-full" 
      :style="height ? { height: height + 'px' } : { minHeight: '400px' }"
    >
      <VChart 
        v-if="mounted" 
        :option="chartOptions" 
        autoresize 
        class="w-full h-full"
        @click="handleClick" 
      />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { GlobeComponent } from 'echarts-gl/components'
import { Scatter3DChart } from 'echarts-gl/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { TooltipComponent } from 'echarts/components'

// Required props for Nuxt UI v3
const props = defineProps({
  // NAME PROP NOW REQUIRED for Nuxt UI v3 form integration
  name: {
    type: String,
    required: true
  },
  height: {
    type: Number,
    default: null // null = container'ın height'ını kullan
  },
  autoRotate: {
    type: Boolean,
    default: false
  },
  projects: {
    type: Array,
    default: () => [
      {
        name: 'İstanbul',
        coordinates: [28.9784, 41.0082],
        project: 'Kemerburgaz Dome',
        link: 'https://www.asma-germe.com/tr/projeler/mersin-stadyumu',
        image: '/projects/project1.jpg',
        color: '#FFA500'
      },
      {
        name: 'Paris',
        coordinates: [2.3522, 48.8566],
        project: 'Louvre Extension',
        link: 'https://site.com/paris',
        image: '/projects/project2.png',
        color: '#00C16A'
      },
      {
        name: 'New York',
        coordinates: [-74.0059, 40.7128],
        project: 'Manhattan Bridge',
        link: 'https://site.com/newyork',
        image: '/projects/project3.jpg',
        color: '#007BFF'
      },
      {
        name: 'London',
        coordinates: [-0.1276, 51.5074],
        project: 'Tower Bridge Renovation',
        link: 'https://site.com/london',
        image: '/projects/project4.jpg',
        color: '#6F42C1'
      }
    ]
  },
  globeTexture: {
    type: String,
    default: '/texture/world.topo.bathy.200401.jpg'
  },
  heightTexture: {
    type: String,
    default: '/texture/bathymetry_bw_composite_4k.jpg'
  }
})

const emit = defineEmits(['project-click', 'globe-ready'])

// Register ECharts components
use([CanvasRenderer, GlobeComponent, Scatter3DChart, TooltipComponent])

// Reactive state
const mounted = ref(false)
const chartContainer = ref<HTMLElement | null>(null)

// Mount lifecycle
onMounted(() => {
  mounted.value = true
  emit('globe-ready')
})

// Event handlers
function handleClick(params: any) {
  if (params?.data?.link) {
    emit('project-click', params.data)
    window.open(params.data.link, '_blank')
  }
}

// Chart configuration
const chartOptions = computed(() => ({
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    textStyle: {
      color: '#fff',
      fontSize: 12
    },
    formatter: (params: any) => {
      const { name, project, image, link } = params.data
      return `
        <div style="text-align: center; max-width: 200px;">
          <div style="font-weight: bold; font-size: 14px; margin-bottom: 4px; color: #00C16A;">
            ${name}
          </div>
          <div style="font-style: italic; margin-bottom: 8px; color: #ccc;">
            ${project}
          </div>
          ${image ? `
            <img 
              src="${image}" 
              alt="preview" 
              style="
                width: 160px; 
                height: auto; 
                margin: 8px 0; 
                border-radius: 6px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              " 
            />
          ` : ''}
          <div style="margin-top: 8px;">
            <a 
              href="${link}" 
              target="_blank" 
              style="
                color: #00C16A; 
                text-decoration: underline;
                font-size: 12px;
              "
            >
              🔗 Projeyi Gör
            </a>
          </div>
        </div>
      `
    }
  },
  globe: {
    baseTexture: props.globeTexture,
    heightTexture: props.heightTexture,
    displacementScale: 0.05,
    shading: 'lambert',
    environment: 'auto',
    realisticMaterial: {
      roughness: 0.8,
      metalness: 0
    },
    light: {
      ambient: {
        intensity: 0.4
      },
      main: {
        intensity: 1.0,
        shadow: true,
        shadowQuality: 'medium',
        alpha: 40,
        beta: 40
      }
    },
    atmosphere: {
      show: true,
      offset: 5,
      color: '#ffffff',
      glowPower: 2,
      innerGlowPower: 2
    },
    viewControl: {
      autoRotate: props.autoRotate,
      autoRotateDirection: 'cw',
      autoRotateSpeed: 10,
      rotateSensitivity: 2,
      zoomSensitivity: 1.5,
      panSensitivity: 1,
      panMouseButton: 'left',
      rotateMouseButton: 'left',
      distance: 180,
      minDistance: 50,
      maxDistance: 500,
      orthographicSize: 150,
      maxOrthographicSize: 400,
      minOrthographicSize: 20,
      alpha: 20,
      beta: 40,
      center: [0, 0, 0],
      animation: true,
      animationDurationUpdate: 1000,
      animationEasingUpdate: 'cubicInOut'
    },
    layers: [
      {
        type: 'blend',
        blendTo: 'emission',
        texture: '/texture/night.jpg',
        intensity: 0.3
      }
    ]
  },
  series: [
    {
      type: 'scatter3D',
      coordinateSystem: 'globe',
      blendMode: 'lighter',
      symbolSize: (data: any) => {
        // Different sizes based on project importance
        return data.importance || 12
      },
      symbol: 'pin',
      itemStyle: {
        color: (params: any) => {
          return params.data.color || '#FFA500'
        },
        opacity: 0.8,
        borderWidth: 2,
        borderColor: '#fff'
      },
      emphasis: {
        itemStyle: {
          color: '#FFD700',
          opacity: 1,
          borderWidth: 3,
          borderColor: '#fff'
        },
        label: {
          show: true,
          formatter: '{b}',
          position: 'top',
          textStyle: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold'
          }
        }
      },
      data: props.projects.map((project: any) => ({
        name: project.name,
        value: project.coordinates,
        project: project.project,
        link: project.link,
        image: project.image,
        color: project.color,
        importance: project.importance || 12
      }))
    },
    // Add glow effect series
    {
      type: 'scatter3D',
      coordinateSystem: 'globe',
      blendMode: 'lighter',
      symbolSize: 20,
      symbol: 'circle',
      itemStyle: {
        color: 'rgba(255, 255, 255, 0.1)',
        opacity: 0.3
      },
      data: props.projects.map((project: any) => ({
        name: project.name,
        value: project.coordinates
      }))
    }
  ]
}))
</script>

<style scoped>
/* Add custom styles for better visual appearance */
.echarts {
  background: transparent;
}

/* Loading indicator */
.chart-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #666;
  font-size: 14px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .chart-container {
    height: 350px !important;
  }
}

@media (max-width: 480px) {
  .chart-container {
    height: 300px !important;
  }
}
</style>