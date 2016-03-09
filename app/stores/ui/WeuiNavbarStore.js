import Reflux from 'reflux';
import WeuiNavbarActions from '../../actions/ui/WeuiNavbarActions';

let WeuiNavbarStore = Reflux.createStore({
  items: {

  },
  listenables: [WeuiNavbarActions],
  init(props) {
    console.log('[WeuiNavbarActions]', this.props);
    console.log('[WeuiNavbarActions]', props);
  },
  onSetOn(tabId) {
    // 清空所有状态(转为false)
    for(let i in this.items) {
      if(this.items.hasOwnProperty(i)){
        this.items[i] = false;
      }
    }
    // 设置选中tab为true
    this.items[tabId] = !this.items[tabId];
    this.trigger(this.items);
  }
});
export { WeuiNavbarStore as default };