import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['propertyA'],
  propertyA: 'layout-wrapper',
  lastSelectedElement: {},
  current: {},
  didInsertElement() {
    this._super(...arguments);
    var mainview = $(".layout-wrapper .main-view").first();
    var lastSel = $(this.get('lastSelectedElement'));
    console.log(mainview);
    mainview.click((e) => {
      let target = $(e.target);
      console.log('Tıklandı');
     
      this.toggleAppereance(target);      
      console.log(target.children().find('.added-component').length);
      this.set('lastSelectedElement', target);
    });
  },
  toggleAppereance(target) {
    console.log('AppUpdate');
    console.log(target);
    $(target).toggleClass('selectedUi');
  },
  actions: {
    addToView() {
      let sel = $(this.get('lastSelectedElement'));
      let cur = this.get('current');
      
      console.log(sel.length);      
      sel.append('<div class="col-sm-' + cur.size + ' added-component"><div>')
    }
  }
});
