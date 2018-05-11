import { shallow } from '@vue/test-utils'
import tree from '@/components/tree.vue'

describe('HelloWorld.vue', () => {
  test('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallow(tree, {
      propsData: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })

  test('add', () => {
    expect(tree.methods.add(1, 2)).toBe(3)
  })

  test('reduce', () => {
    expect(tree.methods.reduce(2, 1)).toBe(1)
  })
})
