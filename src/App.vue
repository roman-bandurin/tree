<template>
  <div id="app">
    <tree msg="Welcome to Your Vue.js App" />
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<script>
import HelloWorld from './components/tree.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      arr: {
        name: '1',
        children: [
          { name: '1.1' },
          { name: '1.2' },
          {
            name: '1.3',
            children: [
              {
                name: '1.3.1',
                children: [
                  { name: '1.3.1.1' },
                  { name: '1.3.1.2' },
                ],
              },
              { name: '1.3.2' },
              { name: '1.3.3' },
              {
                name: '1.3.4',
                children: [
                  { name: '1.3.4.1' },
                  { name: '1.3.4.2' },
                ],
              },
            ],
          },
        ],
      },
    }
  },
  methods: {
    toggle() {},
    getchilds(value) {
      return value.children
    },
    getslots(view) {
      return view.data.scopedSlots
        ? view.data.scopedSlots.expand()
          .componentOptions.children[0].componentOptions
        : null
    },
    getslots2(view) {
      return view
    },
    changeColumn(props) {
      this.$set(props.value, 'isColumn', !props.value.isColumn)
    },
    isFolder(props) {
      return !!props.childs.value
    },
    changeType(props) {
      if (this.isFolder(props)) {
        props.childs.value.splice(0, props.childs.value.length)
        this.$set(props.value, 'children', null)
      } else {
        this.$set(props.value, 'children', [])
        this.addChild(props)
      }
    },
    addChild(props) {
      props.childs.value.push({ name: `default ${props.childs.value.length}` })
    },
    removeChild(props) {
      if (props.parent) {
        this.$delete(props.parent.childs.value, props.key)
      }
    },
    moveSelf(props, offset) {
      if (props.parent) {
        const removed = props.parent.childs.value.splice(props.index, 1)
        props.parent.childs.value.splice(props.index + offset, 0, removed[0])
      }
    },
    moveLevelUp(props, offset) {
      if (props.parent && props.parent.parent) {
        const removed = props.parent.childs.value.splice(props.index, 1)
        props.parent.parent.childs.value.splice(props.parent.index + offset, 0, removed[0])
      }
    },
    moveToSibling(props, offset) {
      if (props.parent) {
        const sibling = props.parent.childs.childs[props.index + offset]
        if (sibling) {
          const removed = props.parent.childs.value.splice(props.index, 1)
          sibling.childs.value.push(removed[0])
        }
      }
    },
  },
}
</script>
