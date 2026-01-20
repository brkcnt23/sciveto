<template>
  <div class="canvas-container h-full w-full relative">
    <div class="canvas-toolbar absolute top-4 left-4 z-10 flex gap-2">
      <UButton size="sm" variant="soft" icon="i-lucide-plus" @click="addNode">
        Add Node
      </UButton>
      <UButton size="sm" variant="soft" icon="i-lucide-trash-2" @click="deleteSelected">
        Delete
      </UButton>
      <UButton size="sm" variant="soft" icon="i-lucide-save" @click="saveCanvas">
        Save
      </UButton>
    </div>
    
    <div ref="cyContainer" class="w-full h-full bg-neutral-50 dark:bg-neutral-900"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import cytoscape from 'cytoscape'

const props = defineProps<{
  canvasId?: string
  projectId: string
  initialNodes?: any[]
  initialEdges?: any[]
}>()

const emit = defineEmits<{
  save: [data: { nodes: any[], edges: any[] }]
  nodeAdded: [node: any]
  nodeUpdated: [node: any]
  edgeAdded: [edge: any]
}>()

const cyContainer = ref<HTMLElement | null>(null)
let cy: any = null

onMounted(() => {
  if (!cyContainer.value) return

  // Initialize Cytoscape
  cy = cytoscape({
    container: cyContainer.value,
    
    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#3B82F6',
          'label': 'data(label)',
          'text-valign': 'center',
          'text-halign': 'center',
          'color': '#fff',
          'text-outline-color': '#3B82F6',
          'text-outline-width': 2,
          'width': 60,
          'height': 60,
          'font-size': 12
        }
      },
      {
        selector: 'node:selected',
        style: {
          'background-color': '#2563EB',
          'border-width': 3,
          'border-color': '#1E40AF'
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 2,
          'line-color': '#94A3B8',
          'target-arrow-color': '#94A3B8',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier',
          'label': 'data(label)',
          'font-size': 10,
          'text-rotation': 'autorotate'
        }
      },
      {
        selector: 'edge:selected',
        style: {
          'line-color': '#3B82F6',
          'target-arrow-color': '#3B82F6',
          'width': 3
        }
      }
    ],

    layout: {
      name: 'preset'
    },

    wheelSensitivity: 0.2,
    minZoom: 0.3,
    maxZoom: 3
  })

  // Load initial data
  if (props.initialNodes && props.initialNodes.length > 0) {
    const elements = [
      ...props.initialNodes.map(node => ({
        data: {
          id: node.id,
          label: node.data.label || 'Node',
          ...node.data
        },
        position: {
          x: node.positionX,
          y: node.positionY
        }
      })),
      ...(props.initialEdges || []).map(edge => ({
        data: {
          id: edge.id,
          source: edge.sourceId,
          target: edge.targetId,
          label: edge.label || ''
        }
      }))
    ]
    
    cy.add(elements)
  }

  // Enable node dragging
  cy.on('dragfreeon', 'node', (evt: any) => {
    const node = evt.target
    const position = node.position()
    
    emit('nodeUpdated', {
      id: node.id(),
      positionX: position.x,
      positionY: position.y
    })
  })

  // Handle edge creation
  let sourceNode: any = null
  
  cy.on('tap', 'node', (evt: any) => {
    if (evt.originalEvent.shiftKey) {
      if (!sourceNode) {
        sourceNode = evt.target
        sourceNode.style('border-width', 3)
        sourceNode.style('border-color', '#10B981')
      } else {
        const targetNode = evt.target
        
        if (sourceNode.id() !== targetNode.id()) {
          const edge = {
            data: {
              id: `edge-${Date.now()}`,
              source: sourceNode.id(),
              target: targetNode.id()
            }
          }
          
          cy.add(edge)
          
          emit('edgeAdded', {
            sourceId: sourceNode.id(),
            targetId: targetNode.id(),
            canvasId: props.canvasId
          })
        }
        
        sourceNode.style('border-width', 0)
        sourceNode = null
      }
    }
  })

  // Handle background tap to deselect
  cy.on('tap', (evt: any) => {
    if (evt.target === cy) {
      if (sourceNode) {
        sourceNode.style('border-width', 0)
        sourceNode = null
      }
    }
  })
})

const addNode = () => {
  if (!cy) return

  const viewport = cy.extent()
  const centerX = (viewport.x1 + viewport.x2) / 2
  const centerY = (viewport.y1 + viewport.y2) / 2

  const nodeId = `node-${Date.now()}`
  const node = {
    data: {
      id: nodeId,
      label: 'New Node'
    },
    position: {
      x: centerX,
      y: centerY
    }
  }

  cy.add(node)

  emit('nodeAdded', {
    id: nodeId,
    type: 'note',
    positionX: centerX,
    positionY: centerY,
    data: { label: 'New Node' },
    canvasId: props.canvasId
  })
}

const deleteSelected = () => {
  if (!cy) return
  
  const selected = cy.$(':selected')
  if (selected.length > 0) {
    selected.remove()
  }
}

const saveCanvas = () => {
  if (!cy) return

  const nodes = cy.nodes().map((node: any) => ({
    id: node.id(),
    positionX: node.position().x,
    positionY: node.position().y,
    data: node.data()
  }))

  const edges = cy.edges().map((edge: any) => ({
    id: edge.id(),
    sourceId: edge.source().id(),
    targetId: edge.target().id(),
    data: edge.data()
  }))

  emit('save', { nodes, edges })
}

onBeforeUnmount(() => {
  if (cy) {
    cy.destroy()
  }
})
</script>

<style scoped>
.canvas-container {
  position: relative;
}

.canvas-toolbar {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:deep(.dark) .canvas-toolbar {
  background: rgba(23, 23, 23, 0.9);
}
</style>
