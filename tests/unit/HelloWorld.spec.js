import { shallow } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  test('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallow(HelloWorld, {
      propsData: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })

  test('add', () => {
    expect(HelloWorld.methods.add(1, 2)).toBe(3)
  })

  test('reduce', () => {
    expect(HelloWorld.methods.reduce(2, 1)).toBe(1)
  })
})
