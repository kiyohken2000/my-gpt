import store from '../src/utils/store'
import { authenticate, saveMe } from '../src/slices/app.slice'

// Redux Toolkit 2 への移行確認を兼ねたストアのスモークテスト
describe('store', () => {
  it('starts unauthenticated', () => {
    expect(store.getState().app).toEqual({ checked: false, loggedIn: false, me: {} })
  })

  it('handles authenticate / saveMe', () => {
    store.dispatch(authenticate({ loggedIn: true, checked: true }))
    store.dispatch(saveMe({ me: { id: 'u1' } }))
    expect(store.getState().app).toEqual({ checked: true, loggedIn: true, me: { id: 'u1' } })
  })
})
