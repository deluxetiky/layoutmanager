import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['propertyA'],
  propertyA: 'layout-wrapper',
  lastSelectedElement: {},
  current: {},
  didInsertElement() {
    this._super(...arguments);
    var mainview = $(".layout-wrapper .main-view").first();
    this.set('lastSelectedElement',mainview);
    var lastSel = $(this.get('lastSelectedElement'));
    console.log(mainview);
    mainview.click((e) => {
      let target = $(e.target);
      $('.layout-wrapper .added-component').removeClass('selectedUi');//clear other selectedUi class
      this.toggleAppereance(target);      
      console.log(target.find('.added-component').length);
      this.set('lastSelectedElement', target);
    });
  },
  toggleAppereance(target) {   
    $(target).toggleClass('selectedUi');
  },
  actions: {
    addToView() {
      let sel = $(this.get('lastSelectedElement'));
      let cur = this.get('current');
      sel.append('<div class="col-sm-' + cur.size + ' panel panel-default added-component"><div>')
    }
  }
});
