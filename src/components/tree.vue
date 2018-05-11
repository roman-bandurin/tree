<template functional/>

<script>
class Tree {
  constructor(a) {
    this.a = a
  }
  // prepareVm(key, index) {}
  // prepareVms(props, slots) {}
  // prepareNode(props, slots, view) {}
  // init() {}
  live() { this.a = 2 }
}

export default {
  name: 'Tree',
  functional: true,
  props: {
    common: Object,
    parent: Object,
    level: Number,
    key: String,
    index: Number,
    value: Object,
    childs: Object,
    getchilds: String,
    getslots: String,
  },
  render(create, context) {
    const { props, scopedSlots: slots, parent } = context
    let { common } = props
    if (!common) {
      common = {
        root: parent,
        getchilds: parent[props.getchilds],
        getslots: parent[props.getslots],
        prepareVm(key, index) {
          const value = this.props.childs.value[key]
          const childs = this.common.getchilds(value)

          const currentProps = {
            common: this.common,
            parent: this.props,
            level: +this.props.level + 1,
            key,
            index,
            value,
            childs: null,
          }

          const childsProps = {
            common: this.common,
            parent: currentProps,
            value: childs,
            childs: null,
          }

          currentProps.childs = childsProps
          return create('tree', {
            props: currentProps,
            scopedSlots: this.slots,
          })
        },
        prepareVms(props2, slots2) {
          return Object.keys(props2.childs.value).map(this.prepareVm, {
            common: this,
            props: props2,
            slots: slots2,
          })
        },
        prepareNode(props2, slots2, view) {
          if (props.childs.value) {
            const vms = this.prepareVms(props2, slots2)
            if (vms) {
              const slot = this.getslots(view)
              if (slot) {
                slot.children = vms
              }
            }
          }
        },
        init() {
          const childs = this.getchilds(props.value)
          const target = props
          target.childs = {
            common,
            parent: props,
            value: childs,
            childs: null,
          }
          const tree = new Tree(1)
          tree.live()
        },
        live() {
          if (props.parent && props.parent.childs) {
            const target = props.parent.childs
            target.childs = target.childs || []
            target.childs[props.key] = props
          }

          const view = slots.default(props)[0]
          common.prepareNode(props, slots, view)
          return view
        },
      }

      common.init()
    }

    return common.live()
  },
}
</script>
